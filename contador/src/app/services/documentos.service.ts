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

  cargarDocumentoByID(id: string){
    const url = `${base_url}/documentos/editar-documentos`;
    return this.http.get(`${url}/${id}`, this.headers)
      .pipe( 
        map( (id:any) => id.documentos ) 
      )
  }


  crearDocumento( dataForm:NuevoDocumento ){
    const url = `${base_url}/documentos`;
    return this.http.post(url, dataForm, this.headers)
      .pipe(
        map( (dataForm: any) => dataForm.documento )
      );
  }

  actualizarDatosDelDocumento(documento:Documentos){
    const url = `${base_url}/documentos/editar-documento/${documento._id}`;
    return this.http.put(url, documento, this.headers)
      .pipe(
        map( (documento:any) => documento.documento )
      )
  }


  eliminarDocumento(documento:Documentos){
    const url = `${base_url}/documentos/${documento._id}`;
    return this.http.delete(url, this.headers);
  }

}
