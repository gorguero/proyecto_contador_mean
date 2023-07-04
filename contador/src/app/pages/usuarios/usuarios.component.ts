import { Component, OnInit } from '@angular/core';
import Usuarios from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  public cargando:boolean = false;
  public usuarios!: Usuarios[];
  public usuariosTemp: Usuarios[] = [];

  constructor(private usuarioService: UsuarioService) {
    
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.usuarioService.cargarUsuarios().subscribe( (usuarios) => {
      this.usuarios = usuarios;
      console.log('Dentro de ngOnInit', this.usuarios )
    })
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios().subscribe( (usuarios) => {
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      console.log('Dentro de cargarUsuarios', this.usuarios )
      this.cargando = false;
    })
  }

}
