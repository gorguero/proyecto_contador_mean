import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    { path: 'dashboard', component: PagesComponent,
        children: [
            {  path: 'perfil', component: PerfilComponent}
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