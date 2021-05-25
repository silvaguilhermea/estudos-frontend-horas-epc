import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { EstadoFormComponent } from './estado-form/estado-form.component';
import { EstadoListaComponent } from './estado-lista/estado-lista.component';

const routes: Routes = [
  { path: 'estados', component: LayoutComponent, children: [

    { path: 'form', component: EstadoFormComponent },
    { path: 'form/:id', component: EstadoFormComponent },
    { path: 'lista', component: EstadoListaComponent },
    { path: '', redirectTo: '/estados/lista', pathMatch: 'full' }
  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoRoutingModule { }
