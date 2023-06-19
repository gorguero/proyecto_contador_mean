import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public usuario: any;
  public menu: any[] = [];

  constructor( private router:Router, private usuarioService:UsuarioService, public menuService:MenuService) {    
    this.usuario = usuarioService.usuario;
    console.log(this.usuario);
  }

  ngOnInit() {
    this.menuService.cargarMenu();
  }

  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

}
