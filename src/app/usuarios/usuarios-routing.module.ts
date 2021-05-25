import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';

const routes: Routes = [
  { path: 'usuarios', component: LayoutComponent, children: [

    { path: 'form', component: UsuariosFormComponent },
    { path: 'form/:id', component: UsuariosFormComponent },
    { path: 'lista', component: UsuariosListaComponent },
    { path: '', redirectTo: '/usuarios/lista', pathMatch: 'full' }

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
