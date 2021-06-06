import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AtividadeFormComponent } from "./atividade-form/atividade-form.component";
import { AtividadeListaComponent } from "./atividade-lista/atividade-lista.component";

const routes: Routes = [
  { path: 'atividades', component: LayoutComponent, children: [

    { path: 'form', component: AtividadeFormComponent },
    { path: 'form/:id', component: AtividadeFormComponent },
    { path: 'lista', component: AtividadeListaComponent },
    { path: '', redirectTo: '/atividades/lista', pathMatch: 'full' }
  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadeRoutingModule { }
