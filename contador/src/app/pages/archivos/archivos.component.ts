import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileuploadService } from 'src/app/services/fileupload.service';
import Swal from 'sweetalert2';
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit{

  public id!:string;
  public pdfSubir!: File;

  constructor(private activateRoute:ActivatedRoute, private router:Router, private fileUploadServices:FileuploadService){}

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

  subirPDF(){
    this.fileUploadServices.actualizarPDF(this.pdfSubir, 'documentos', this.id)
      .then( pdf => {
        console.log(pdf);
        this.router.navigateByUrl(`/dashboard/documentos`);
      } ).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir el archivo', 'error');
      })
  }

  regresarADocumentos(){
    this.router.navigateByUrl('/dashboard/documentos');
  }
}
