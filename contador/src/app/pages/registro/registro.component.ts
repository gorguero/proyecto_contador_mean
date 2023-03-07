import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  });

  formSubmit: boolean = false;

  constructor(private fb:FormBuilder){}

  crearUsuario(){
    this.formSubmit = true;

    if(this.registroForm.invalid){
      return;
    }

    console.log(this.registroForm.value);
  }

}
