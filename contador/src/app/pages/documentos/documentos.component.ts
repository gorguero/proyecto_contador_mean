import { Component, OnInit } from '@angular/core';
import { Documentos } from 'src/app/models/documentos.models';
import Usuarios from 'src/app/models/usuarios.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit{

  public cargando: boolean = false;
  public usuarios!: Usuarios[];
  public usuariosTemp: Usuarios[] = [];
  public documentos!: Documentos[];
  public documentosTemp: Documentos[] = [];
  public p: any = 1;

  constructor(private busquedasServices: BusquedasService, private documentosService: DocumentosService) {
    this.cargarDocumentos();
  }

  ngOnInit(): void {
    this.documentosService.cargarDocumentos().subscribe( documentos => {
      this.documentos = documentos;
    })
  }

  cargarDocumentos(){
    this.cargando = true;
    this.documentosService.cargarDocumentos()
      .subscribe( (documentos) => {
        this.documentos = documentos;
        this.documentosTemp = documentos;
        this.cargando = false;
      });
  }
  
  buscar(termino:string): any{
    if(termino.length === 0){
      return this.documentos = this.documentosTemp;
    }

    this.busquedasServices.buscar('documentos', termino).subscribe( 
        (resp:any) => {
        this.documentos = resp;
      });
  }

  editarDocumento(_id:string){

  }

  eliminarDocumento(){}

  campoNoValido(campo:string){}

  actualizarDocumento(){}

}
