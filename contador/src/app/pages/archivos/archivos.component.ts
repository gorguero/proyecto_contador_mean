import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit{

  public id!:string;
  public pdfSubir: File | undefined;

  constructor(private activateRoute:ActivatedRoute, private router:Router){}

  ngOnInit(): void {

    this.activateRoute.params.subscribe( params => {
      this.id = params['id'];
      console.log(this.id)
    })

    $(document).ready(function() {
      // Basic
      $('.dropify').dropify();

      // Translated
      $('.dropify-fr').dropify({
          messages: {
              default: 'Glissez-déposez un fichier ici ou cliquez',
              replace: 'Glissez-déposez un fichier ou cliquez pour remplacer',
              remove: 'Supprimer',
              error: 'Désolé, le fichier trop volumineux'
          }
      });

      // Used events
      var drEvent = $('#input-file-events').dropify();

      drEvent.on('dropify.beforeClear', function(event: any, element: any) {
          return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
      });

      drEvent.on('dropify.afterClear', function(event: any, element: any) {
          alert('File deleted');
      });

      drEvent.on('dropify.errors', function(event: any, element: any) {
          console.log('Has Errors');
      });

      var drDestroy = $('#input-file-to-destroy').dropify();
      drDestroy = drDestroy.data('dropify')
      $('#toggleDropify').on('click', function(e: any) {
          e.preventDefault();
          if (drDestroy.isDropified()) {
              drDestroy.destroy();
          } else {
              drDestroy.init();
          }
      })
  });
  }

  cambiarPDF(e: any){
    this.pdfSubir = e.files[0];
    console.log(this.pdfSubir)
  }

  subirPDF(){}

  regresarADocumentos(){
    this.router.navigateByUrl('/dashboard/documentos');
  }
}
