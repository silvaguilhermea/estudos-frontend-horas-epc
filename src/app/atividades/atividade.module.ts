import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AtividadeRoutingModule } from './atividade-routing.module';
import { AtividadeFormComponent } from './atividade-form/atividade-form.component';
import { AtividadeListaComponent } from './atividade-lista/atividade-lista.component';


@NgModule({
  declarations: [AtividadeFormComponent, AtividadeListaComponent],
  imports: [
    CommonModule,
    AtividadeRoutingModule,
    FormsModule
  ],
  exports: [
    AtividadeFormComponent,
    AtividadeListaComponent
  ]
})
export class AtividadeModule { }
