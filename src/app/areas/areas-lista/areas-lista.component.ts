import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreasService } from 'src/app/areas.service';
import { Area } from '../area';

@Component({
  selector: 'app-areas-lista',
  templateUrl: './areas-lista.component.html',
  styleUrls: ['./areas-lista.component.css']
})
export class AreasListaComponent implements OnInit {

  mensagemSucesso: string;
  mensagemErro: string;
  areas: Area[] = [];
  areaSelecionada: Area;

  constructor(
    private router: Router,
    private areaService: AreasService
  ) { }

  ngOnInit(): void {
    this.areaService
      .getAreas()
      .subscribe( resposta => {this.areas = resposta, console.log(resposta)} );
  }

  novoCadastro(){
    this.router.navigate(['/areas/form']);
  }

  preparaDelecao(area: Area){
    this.areaSelecionada = area;
  }

  deletarArea(){
    this.areaService
    .deletar( this.areaSelecionada )
    .subscribe(
      response => {
        this.mensagemSucesso = 'Área deletada com sucesso!',
        this.mensagemErro = '';
        this.ngOnInit();
      },
      erro => {
        this.mensagemErro = 'Ocorreu um erro ao deletar a área.',
        this.mensagemSucesso = ""
      }
    )
  }

}
