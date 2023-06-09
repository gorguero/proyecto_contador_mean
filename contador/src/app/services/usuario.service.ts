import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Registro } from '../interfaces/registro.interface';
import { Login } from '../interfaces/login.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuarios } from '../models/usuarios.model';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: any;

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

  almacenarLocalStorage(token:string){
    localStorage.setItem('token', token);
  }

  crearUsuario( data: Registro ){
    return this.http.post(`${url}/usuarios`, data)
      .pipe(
        tap( (resp:any) => {
          this.almacenarLocalStorage(resp.token);
        } )
      );
  }

  login( data: Login ){
    return this.http.post(`${url}/login`, data)
      .pipe(
        tap( (resp:any) => {
          this.almacenarLocalStorage(resp.token);
        } )
      );
  }

  logout(){
    localStorage.removeItem('token');
  }

  renovarToken():Observable<boolean>{
    return this.http.get(`${url}/login/renovartoken`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp:any) => {
        const { nombre, email, curp, telefono, password, password2, role, uid } = resp.usuario;
        this.almacenarLocalStorage( resp.token );
        this.usuario = new Usuarios( nombre, email, curp, telefono, '', '', role, uid );
        return true
      }),
      catchError(error => of(false))
    )
  }

}
