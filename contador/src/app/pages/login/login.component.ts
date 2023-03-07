import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  })

  constructor(private fb:FormBuilder){}

  login(){
    this.formSubmit = true;

    if(this.loginForm.invalid){
      return;
    }

    console.log(this.loginForm.value)
  }
  
}
