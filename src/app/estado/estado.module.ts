import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstadoRoutingModule } from './estado-routing.module';
import { EstadoListaComponent } from './estado-lista/estado-lista.component';
import { EstadoFormComponent } from './estado-form/estado-form.component';


@NgModule({
  declarations: [EstadoListaComponent, EstadoFormComponent],
  imports: [
    CommonModule,
    EstadoRoutingModule,
    FormsModule
  ],
  exports: [
    EstadoFormComponent,
    EstadoListaComponent
  ]
})
export class EstadoModule { }
