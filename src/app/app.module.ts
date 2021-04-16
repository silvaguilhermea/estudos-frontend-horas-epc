import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { ClientesModule } from './clientes/clientes.module';
import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module';
import { ProjetosModule } from './projetos/projetos.module';
import { AreasModule } from './areas/areas.module';

import { ClientesService } from './clientes.service';
import { ClientesListaComponent } from './clientes/clientes-lista/clientes-lista.component';
import { ServicoPrestadoService } from './servico-prestado.service';
import { AreasService } from './areas.service';
 
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';
import { SetoresModule } from './setores/setores.module';
import { SetoresService } from './setores.service';
import { DocEngenhariaModule } from './doc-engenharia/doc-engenharia.module';
import { DocEngenhariaService } from './doc-engenharia.service';
import { DocAutomacaoModule } from './doc-automacao/doc-automacao.module';
import { DocAutomacaoService } from './doc-automacao.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClientesModule,
    ServicoPrestadoModule,
    ProjetosModule,
    AreasModule,
    SetoresModule,
    DocEngenhariaModule,
    DocAutomacaoModule
  ],
  providers: [
    ClientesService,
    ServicoPrestadoService,
    AuthService,
    AreasService,
    SetoresService,
    DocEngenhariaService,
    DocAutomacaoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
