import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

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
      .subscribe(resp => {
        console.log(resp);
      })
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
