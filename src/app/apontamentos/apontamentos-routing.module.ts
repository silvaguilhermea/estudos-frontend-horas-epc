import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ApontamentosFormComponent } from '../apontamentos/apontamentos-form/apontamentos-form.component'
import { ApontamentosListaComponent } from '../apontamentos/apontamentos-lista/apontamentos-lista.component'

const routes: Routes = [
  { path: 'apontamentos', component: LayoutComponent, children: [

    { path: 'form', component: ApontamentosFormComponent },
    { path: 'form/:id', component: ApontamentosFormComponent },
    { path: 'lista', component: ApontamentosListaComponent },
    { path: '', redirectTo: '/apontamentos/lista', pathMatch: 'full' }
  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApontamentosRoutingModule { }
