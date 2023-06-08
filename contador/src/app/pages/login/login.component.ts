import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

//declare var JQuery: any;
//declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formSubmit: boolean = false;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private fb:FormBuilder, private router:Router, private usuarioService:UsuarioService){}

  login(){
    this.formSubmit = true;

    if(this.loginForm.invalid){
      return;
    }

    this.usuarioService.login(this.loginForm.value)
      .subscribe(
        {
          next: resp => {
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido!',
              timer: 3000,
            });
            this.router.navigateByUrl('/dashboard/perfil');
            console.log(resp)
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

  campoNoValido( campo:string ): boolean {

    if( this.loginForm.get(campo)?.invalid && this.formSubmit ){
      return true;
    }else{
      return false;
    }

  }
  
}
