import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Desea actualizar los datos?',
      text: "¿Esta seguro de realizar estos cambios?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.perfilForm.value)
        this.usuarioService.actualizarPerfil( this.perfilForm.value )
            .subscribe( resp => {
              swalWithBootstrapButtons.fire(
                'Actualizado!',
                'Se actualizó exitosamente!',
                'success'
              )
              
              const {nombre, email, curp, telefono} = this.perfilForm.value;
              this.usuario.nombre = nombre;
              this.usuario.email = email;
              this.usuario.curp = curp;
              this.usuario.telefono = telefono;

            } )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La operación fue cancelada',
          'error'
        )
      }
    })

  }

  camposNoValidos( campo:string ): boolean{
    
    if( this.perfilForm.get(campo)?.invalid && this.formSubmit ){
      return true;
    }else{
      return false;
    }

  }

}
