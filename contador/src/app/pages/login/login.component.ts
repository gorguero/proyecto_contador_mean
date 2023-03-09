import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb:FormBuilder, private router:Router){}

  login(){
    this.formSubmit = true;

    if(this.loginForm.invalid){
      return;
    }

    console.log(this.loginForm.value)
    this.router.navigateByUrl('/dashboard/perfil');
  }

  campoNoValido( campo:string ): boolean {

    if( this.loginForm.get(campo)?.invalid && this.formSubmit ){
      return true;
    }else{
      return false;
    }

  }
  
}
