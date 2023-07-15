import { Component, OnInit } from '@angular/core';
import { Documentos } from 'src/app/models/documentos.models';
import Usuarios from 'src/app/models/usuarios.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit{

  public usuarios!: Usuarios[];
  public usuariosTemp: Usuarios[] = [];
  public p: any = 1;

  constructor(private busquedasServices: BusquedasService) {
    
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  buscar(termino:string): any{
    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasServices.buscar('usuarios', termino).subscribe( 
        (resp:any) => {
        this.usuarios = resp;
      });
  }

  editarDocumento(_id:string){

  }

  eliminarDocumento(){}

  campoNoValido(campo:string){}

  actualizarDocumento(){}

}
