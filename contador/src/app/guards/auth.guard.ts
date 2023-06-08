import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private usuarioService:UsuarioService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.usuarioService.renovarToken();
  }
  
}
