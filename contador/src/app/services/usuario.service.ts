import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Registro } from '../interfaces/registro.interface';
import { Login } from '../interfaces/login.interface';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  crearUsuario( data: Registro ){
    return this.http.post(`${url}/usuarios`, data);
  }

  login( data: Login ){
    return this.http.post(`${url}/login`, data);
  }

}
