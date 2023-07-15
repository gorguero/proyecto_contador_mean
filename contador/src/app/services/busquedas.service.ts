import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Usuarios from '../models/usuarios.model';
import { Documentos } from '../models/documentos.models';

const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private buscarUsuarios(resultados: any[]): Usuarios[] {
    return resultados.map(
      (user) =>
        new Usuarios(
          user.nombre,
          user.email,
          user.curp,
          user.telefono,
          '',
          '',
          user.rol,
          user.uid
        )
    );
  }
  private buscarDocumentos(resultados: any[]): Documentos[] {
    return resultados.map(
      (doc) =>
        new Documentos(doc.nombre, doc.fecha, doc.usuario, doc.pdf, doc._id)
    );
  }

  buscar(tipo: 'usuarios' | 'documentos', termino: string) {
    const urlBuscar = `${url}/busqueda/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(urlBuscar, this.headers)
      .pipe(
        map((resp: any): any => {
          switch (tipo) {
            case 'usuarios':
              return this.buscarUsuarios(resp.resultado);
            case 'documentos':
              return this.buscarDocumentos(resp.resultado);
            default:
              return [];
          }
        })
      );
  }
}
