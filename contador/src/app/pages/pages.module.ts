import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; //Permite navegación entre componentes
import { NgxPaginationModule } from 'ngx-pagination';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NuevoDocumentoComponent } from './nuevo-documento/nuevo-documento.component';
import { EditarDocumentoComponent } from './editar-documento/editar-documento.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { MisDocumentosComponent } from './mis-documentos/mis-documentos.component';

@NgModule({
  declarations: [
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    NuevoDocumentoComponent,
    EditarDocumentoComponent,
    DocumentosComponent,
    ArchivosComponent,
    MisDocumentosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  exports: [
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    NuevoDocumentoComponent,
    EditarDocumentoComponent,
    DocumentosComponent,
    ArchivosComponent,
    MisDocumentosComponent,
  ]
})
export class PagesModule { }
