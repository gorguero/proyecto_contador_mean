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
  
  get uid():string{
    return this.usuario.uid || '';
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
        const { nombre, email, curp, telefono, password, password2, rol, uid } = resp.usuario;
        this.almacenarLocalStorage( resp.token );
        this.usuario = new Usuarios( nombre, email, curp, telefono, '', '', rol, uid );
        return true
      }),
      catchError(error => of(false))
    )
  }

  actualizarPerfil( data: { email:string, nombre:string, curp:string, telefono:string, rol:string } ){

    data = {
      ...data,
      rol: 'USER_ROL'
    }
    
    return this.http.put( `${url}/usuarios/${this.uid}`, data, this.headers );
  }

}
