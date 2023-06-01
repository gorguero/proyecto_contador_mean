import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const endpoint_url = environment.endpoint_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }
}
