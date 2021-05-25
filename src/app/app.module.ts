import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { UsuariosModule } from './usuarios/usuarios.module';
import { AreasModule } from './areas/areas.module';

import { UsuariosService } from './usuarios.service';
import { AreasService } from './areas.service';
import { SetoresService } from './setores.service'; 
import { EstadoService } from './estado.service';
import { DocAutomacaoService } from './doc-automacao.service';
import { ProjetosService } from './projetos.service';

import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { SetoresModule } from './setores/setores.module';
import { EstadoModule } from './estado/estado.module';
import { DocAutomacaoModule } from './doc-automacao/doc-automacao.module';
import { ProjetosModule } from './projetos/projetos.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    UsuariosModule,
    ProjetosModule,
    AreasModule,
    SetoresModule,
    EstadoModule,
    DocAutomacaoModule,
    ProjetosModule
  ],
  providers: [
    UsuariosService,
    AreasService,
    SetoresService,
    EstadoService,
    DocAutomacaoService,
    ProjetosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
