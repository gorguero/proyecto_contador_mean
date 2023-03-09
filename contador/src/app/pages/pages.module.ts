import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; //Permite navegación entre componentes
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    PagesComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PagesComponent,
    PerfilComponent
  ]
})
export class PagesModule { }
