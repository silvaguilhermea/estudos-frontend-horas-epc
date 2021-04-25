import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { DocAutomacaoFormComponent } from "./doc-automacao-form/doc-automacao-form.component";
import { DocAutomacaoListaComponent } from "./doc-automacao-lista/doc-automacao-lista.component";

const routes: Routes = [
  { path: 'doc-automacao', component: LayoutComponent, children: [

    { path: 'form', component: DocAutomacaoFormComponent },
    { path: 'form/:id', component: DocAutomacaoFormComponent },
    { path: 'lista', component: DocAutomacaoListaComponent },
    { path: '', redirectTo: '/doc-automacao/lista', pathMatch: 'full' }
  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocAutomacaoRoutingModule { }
