import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

import { AreaProjetoFormComponent } from "./area-projeto-form/area-projeto-form.component";
import { AreaProjetoListaComponent } from "./area-projeto-lista/area-projeto-lista.component";

const routes: Routes = [
  { path: 'area-projeto', component: LayoutComponent, children: [

    { path: 'form', component: AreaProjetoFormComponent },
    { path: 'form/:id', component: AreaProjetoFormComponent },
    { path: 'lista', component: AreaProjetoListaComponent },
    { path: '', redirectTo: '/area-projeto/lista', pathMatch: 'full'}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaProjetoRoutingModule { }
