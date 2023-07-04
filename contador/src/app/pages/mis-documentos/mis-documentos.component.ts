import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-mis-documentos',
  templateUrl: './mis-documentos.component.html',
  styleUrls: ['./mis-documentos.component.css']
})
export class MisDocumentosComponent implements OnInit{

  public cargando: boolean = false;
  public documentos!: any[];

  constructor(private activatedRoute: ActivatedRoute, private documentosService: DocumentosService){
    
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => {
      this.cargarDocumentosPersonalesID( id );
    } )
  }

  cargarDocumentosPersonalesID( id:string ){
    this.cargando = true;
    this.documentosService.cargarMisDocumentosPersonales(id)
      .subscribe( (documentos) => {
        this.documentos = documentos;
        console.log(this.documentos)
        this.cargando = false;
      } )
  }
  
}
