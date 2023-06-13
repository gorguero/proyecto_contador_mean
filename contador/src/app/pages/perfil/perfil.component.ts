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
  public formSubmit: boolean = false;

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
    this.formSubmit = true;
    if(this.perfilForm.invalid){
      return;
    }
    console.log(this.perfilForm.value)
  }

  camposNoValidos( campo:string ): boolean{
    
    if( this.perfilForm.get(campo)?.invalid && this.formSubmit ){
      return true;
    }else{
      return false;
    }

  }

}
