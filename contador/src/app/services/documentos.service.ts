import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Documentos } from '../models/documentos.models';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs';
import { CargarDocumentos } from '../interfaces/cargar-documentos.interface';

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

}
