import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApontamentosRoutingModule } from './apontamentos-routing.module';
import { ApontamentosListaComponent } from './apontamentos-lista/apontamentos-lista.component';
import { ApontamentosFormComponent } from './apontamentos-form/apontamentos-form.component';



@NgModule({
  declarations: [ApontamentosListaComponent, ApontamentosFormComponent],
  imports: [
    CommonModule,
    ApontamentosRoutingModule,
    FormsModule
  ],
  exports: [
    ApontamentosFormComponent,
    ApontamentosListaComponent
  ]
})
export class ApontamentosModule { }
