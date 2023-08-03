import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoDocumento } from 'src/app/models/nuevoDocumento.models';
import Usuarios from 'src/app/models/usuarios.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-documento',
  templateUrl: './nuevo-documento.component.html',
  styleUrls: ['./nuevo-documento.component.css']
})
export class NuevoDocumentoComponent implements OnInit {

  public cargando: boolean = false;
  public usuarios!: Usuarios[];
  public nuevoDocumentoForm!: FormGroup;
  public nuevoDocumento: NuevoDocumento[] = [];
  public formSubmitted = false;
  public docu: any = {};

  constructor(
    private fb:FormBuilder,
    private documentoService:DocumentosService,
    private usuarioService:UsuarioService,
    private router:Router){}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.nuevoDocumentoForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      fecha: ['', Validators.required],
    })
  }

  campoNoValido(campo:string): boolean{
    if(this.nuevoDocumentoForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  crearNuevoDocumento(){
    this.formSubmitted = true;
    if(this.nuevoDocumentoForm.invalid){
      return;
    }

    this.documentoService.crearDocumento( this.nuevoDocumentoForm.value )
      .subscribe( resp => {
        this.docu = resp;
        console.log(this.docu)
        Swal.fire({
          icon: 'success',
          title: 'Doucmento creado.',
          timer: 3000
        });
        this.router.navigateByUrl(`/dashboard/documentos/${this.docu._id}`);
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.msg
        });
      })
  }

  cargarUsuarios(){
    this.usuarioService.cargarUsuarios()
      .subscribe( resp => {
        this.usuarios = resp;
      } );
  }

}
