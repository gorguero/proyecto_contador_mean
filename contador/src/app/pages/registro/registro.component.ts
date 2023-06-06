import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  public registroForm = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]]
  },
  {
    validators: this.passwordsIguales('password', 'repeatPassword')
  });

  formSubmit: boolean = false;
 
  constructor(private fb:FormBuilder, private usuarioService: UsuarioService){}

  crearUsuario(){
    this.formSubmit = true;

    if(this.registroForm.invalid){
      return;
    }

    console.log(this.registroForm.value);
    this.usuarioService.crearUsuario(this.registroForm.value)
      .subscribe(
        {
          next: resp => {
            Swal.fire(
              {
                icon: 'success',
                title: 'Registrado correctamente!',
                text: 'Ahora puede iniciar sesion',
                timer: 3000
              }
            )

          },
          error: err => {
            Swal.fire(
              {
                icon: 'error',
                title: 'Error',
                text: err.error.msg,
                timer: 3000
              }
            )

          }
        },
      );

  }

  camposNoValidos( campo:string ): boolean{
    
    if( this.registroForm.get(campo)?.invalid && this.formSubmit ){
      return true;
    }else{
      return false;
    }

  }

  contrasenasNoValidas(){
    
    const pass1 = this.registroForm.get('password')?.value;
    const pass2 = this.registroForm.get('repeatPassword')?.value;

    if( pass1 !== pass2 && this.formSubmit ){
      return true;
    }else{
      return false;
    }

  }

  passwordsIguales( dataPass1:string, dataPass2:string ){
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get( dataPass1 );
      const pass2Control = formGroup.get( dataPass2 );

      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors( { noEsIgual:true} );
      }

    }
  }

}
