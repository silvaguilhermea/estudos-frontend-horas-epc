import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'

import { ProjetosRoutingModule } from './projetos-routing.module';
import { ProjetosFormComponent } from './projetos-form/projetos-form.component';
import { ProjetosListaComponent } from './projetos-lista/projetos-lista.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ProjetosFormComponent, ProjetosListaComponent],
  imports: [
    CommonModule,
    ProjetosRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ProjetosFormComponent,
    ProjetosListaComponent
  ]
})
export class ProjetosModule { }
