import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NuevoDocumentoComponent } from './nuevo-documento/nuevo-documento.component';
import { EditarDocumentoComponent } from './editar-documento/editar-documento.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { MisDocumentosComponent } from './mis-documentos/mis-documentos.component';

const routes: Routes = [
    { path: 'dashboard', component: PagesComponent, canActivate: [AuthGuard],
        children: [
          {  path: 'perfil', component: PerfilComponent },

          //Rutas admin
          {  path: 'usuarios', component: UsuariosComponent },
          {  path: 'documentos', component: DocumentosComponent },
          {  path: 'nuevo-documento', component: NuevoDocumentoComponent },
          {  path: 'documentos/editar-documento/:_id', component: EditarDocumentoComponent },
          {  path: 'documentos/:id', component: ArchivosComponent },
          {  path: 'documentos/mis-documentos/:id', component: MisDocumentosComponent },
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
