import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AreaProjetoBusca } from "./areaProjetoBusca";
import { AreaProjetoService } from "../../area-projeto.service";
import { Area } from 'src/app/areas/area';
import { AreasService } from "../../areas.service";
import { AreaProjeto } from "../area-projeto";

@Component({
  selector: 'app-area-projeto-lista',
  templateUrl: './area-projeto-lista.component.html',
  styleUrls: ['./area-projeto-lista.component.css']
})
export class AreaProjetoListaComponent implements OnInit {

  area: string;
  areaSelecionada: Area;
  areas: Area[] = [];
  lista: AreaProjetoBusca[];
  message: string;

  constructor(
    private router: Router,
    private service: AreaProjetoService,
    private serviceAreas: AreasService
  ) { 
    this.serviceAreas.getAreas().subscribe( response => {
      this.areas = response;
    });
   }

  ngOnInit(): void {
  }

  novoCadastro(){
    this.router.navigate(['/area-projeto/form']);
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

  preparaDelecao(areaProjeto: AreaProjetoBusca){

  }

  deletarAreaProjeto(){
    
  }

}
