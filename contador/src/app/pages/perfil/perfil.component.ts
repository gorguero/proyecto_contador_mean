import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  public perfilForm!: FormGroup;
  public usuario: any;

  constructor(private usuarioService:UsuarioService, private fb:FormBuilder){
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [Validators.required, Validators.email] ],
      curp: [ this.usuario.curp, Validators.required ],
      telefono: [ this.usuario.telefono, Validators.required ]
    })
  }

  actualizar(){
    console.log(this.perfilForm.value)
  }

}
