import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Registro } from '../interfaces/registro.interface';
import { Login } from '../interfaces/login.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuarios } from '../models/usuarios.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

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

  almacenarLocalStorage(token:string, menu:any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  crearUsuario( data: Registro ){
    return this.http.post(`${url}/usuarios`, data)
      .pipe(
        tap( (resp:any) => {
          this.almacenarLocalStorage(resp.token, resp.menu);
        } )
      );
  }

  login( data: Login ){
    return this.http.post(`${url}/login`, data)
      .pipe(
        tap( (resp:any) => {
          this.almacenarLocalStorage(resp.token, resp.menu);
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
        this.almacenarLocalStorage( resp.token, resp.menu );
        this.usuario = new Usuarios( nombre, email, curp, telefono, '', '', rol, uid );
        return true
      }),
      catchError(error => of(false))
    )
  }

  actualizarPerfil( data: { email:string, nombre:string, curp:string, telefono:string, rol:any } ){

    data = {
      ...data,
      rol: this.usuario.rol
    }
    
    return this.http.put( `${url}/usuarios/${this.uid}`, data, this.headers );
  }

  cargarUsuarios(){
    return this.http.get<CargarUsuarios>(`${url}/usuarios`, this.headers)
    .pipe(
      map(  resp => {
        const documentos = resp.usuarios.map(
          user => new Usuarios( user.nombre, user.email, user.curp, user.telefono, '', '', user.rol, user.uid ))
        return documentos;
      })
    )
  }

  //Guarda el usuario con su nuevo rol
  guardarUsuario( usuario:Usuarios ){
    return this.http.put(`${url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

}
