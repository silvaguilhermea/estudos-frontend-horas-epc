import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ProjetosFormComponent } from './projetos-form/projetos-form.component'

const routes: Routes = [
  { path: 'projetos', component: LayoutComponent, children: [

    { path: 'form', component: ProjetosFormComponent },
    { path: 'form/:id', component: ProjetosFormComponent },
    { path: '', redirectTo: '/projetos/form', pathMatch: 'full' }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetosRoutingModule { }
