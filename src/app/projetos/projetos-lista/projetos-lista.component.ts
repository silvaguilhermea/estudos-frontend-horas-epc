import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjetosService } from "../../projetos.service";
import { Area } from 'src/app/areas/area';
import { AreasService } from "../../areas.service";
import { Projeto } from "../projeto";

@Component({
  selector: 'app-projetos-lista',
  templateUrl: './projetos-lista.component.html',
  styleUrls: ['./projetos-lista.component.css']
})
export class ProjetosListaComponent implements OnInit {

  area: string;
  areas: Area[] = [];
  areaSelecionada: Area;
  projetos: Projeto[] = [];
  lista: Projeto[] = [];
  message: string;

  constructor(
    private router: Router,
    private service: ProjetosService,
    private serviceAreas: AreasService
  ) { 
    this.serviceAreas.getAreas().subscribe( response => {
      
    });
   }

  ngOnInit(): void {
    this.service
      .getProjetos()
      .subscribe( resposta => { this.projetos = resposta } );
    this.serviceAreas
      .getAreas()
      .subscribe( resposta => { this.areas = resposta } );
  }

  novoCadastro(){
    this.router.navigate(['/projetos/form']);
  }

  consultar() {
    console.log(this.area);
    this.service
      .buscar( this.area )
      .subscribe( response => {
        this.lista = response;
        if( this.lista.length <= 0 ){
          this.message = "Nenhum registro encontrado.";
        } else {
          this.message = 'Registro(s) encontrado(s)';
        }
      });
  }

  preparaDelecao(){

  }

  deletarProjeto(){
    
  }

}
