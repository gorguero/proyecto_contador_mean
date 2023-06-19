import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public usuario: any;

  menu: any[] = [
    {
      titulo: 'Mi Perfil',
      icono: 'mdi mdi-folder-lock-open',
      url: '/dashboard/perfil'
    },
    {
      titulo: 'Usuarios',
      icono: 'mdi mdi-folder-lock-open',
      url: '/dashboard/usuarios'
    },
    {
      titulo: 'Nuevo Documento',
      icono: 'mdi mdi-folder-lock-open',
      url: '/dashboard/nuevo-documento'
    },
    {
      titulo: 'Documentos Generales',
      icono: 'mdi mdi-folder-lock-open',
      url: '/dashboard/documentos'
    },
  ];

  constructor( private router:Router, private usuarioService:UsuarioService) {    
    this.usuario = usuarioService.usuario;
    console.log(this.usuario);
  }

  ngOnInit() {

  }

  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

}
