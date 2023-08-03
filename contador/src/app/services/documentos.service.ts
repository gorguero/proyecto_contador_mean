import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Documentos } from '../models/documentos.models';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs';
import { CargarDocumentos } from '../interfaces/cargar-documentos.interface';
import { NuevoDocumento } from '../models/nuevoDocumento.models';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  public documento!: Documentos;

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  get _id():string{
    return this.documento._id || '';
  }

  cargarDocumentos(){
    return this.http.get<CargarDocumentos>(`${base_url}/documentos`, this.headers)
      .pipe(
        map( resp => {
          const documentos = resp.documentos.map(
            user => new Documentos(user.nombre, user.fecha, user.usuario, user.pdf, user._id)
          );
          return documentos;
        })
      );
  }

  cargarMisDocumentosPersonales( id:string ){

    const url = `${base_url}/documentos/mis-documentos`;

    return this.http.get<CargarDocumentos>(`${url}/${id}`, this.headers)
      .pipe(
        map( res => {
          const documentos = res.documentos.map(
            user => new Documentos( user.nombre, user.fecha, user.usuario, user.pdf, user._id ))
            return documentos;
        } )
      )
  }

  //Crear un nuevo documento
  crearDocumento( dataForm:NuevoDocumento ){
    const url = `${base_url}/documentos`;
    return this.http.post(url, dataForm, this.headers)
      .pipe(
        map( (dataForm: any) => dataForm.documento )
      );
  }

  //Eliminar documento
  eliminarDocumento(documento:Documentos){
    const url = `${base_url}/documentos/${documento._id}`;
    return this.http.delete(url, this.headers);
  }

}
