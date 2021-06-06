import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreasService } from 'src/app/areas.service';
import { AtividadesService as AtividadeService } from 'src/app/atividades.service';
import { ProjetosService } from 'src/app/projetos.service';
import { Atividade } from '../atividade';
import { Area } from '../../areas/area'
import { Projeto } from 'src/app/projetos/projeto';

@Component({
  selector: 'app-atividade-lista',
  templateUrl: './atividade-lista.component.html',
  styleUrls: ['./atividade-lista.component.css']
})
export class AtividadeListaComponent implements OnInit {

  mensagemSucesso: string;
  mensagemErro: string;
  message: string;
  atividade: Atividade[] = [];
  lista: Atividade[] = [];
  areas: Area[] = [];
  projeto: string;
  projetos: Projeto[] = [];
  projetoSelecionado: Projeto;
  atividadeSelecionada: Atividade;

  constructor(
    private router: Router,
    private service: AtividadeService,
    private serviceAreas: AreasService,
    private serviceProjetos: ProjetosService
  ) { }

  ngOnInit(): void {
    this.service
      .getAtividade()
      .subscribe( resposta => { this.atividade = resposta } );
    this.serviceAreas
      .getAreas()
      .subscribe( resposta => { this.areas = resposta } );
    this.serviceProjetos
      .getProjetos()
      .subscribe( resposta => { this.projetos = resposta } );
  }

  novoCadastro(){
    this.router.navigate(['/atividade/form']);
  }

  consultar() {
    if ( this.projetoSelecionado.name ) {
      this.projeto = this.projetoSelecionado.name;
    }
    this.service
      .buscar( this.projeto )
      .subscribe( response => {
        this.lista = response;
        if( this.lista.length <= 0 ){
          this.message = "Nenhum registro encontrado.";
        } else {
          this.message = 'Registro(s) encontrado(s)';
        }
      });
  }

  preparaDelecao(atividade: Atividade){
    this.atividadeSelecionada = atividade;
  }

  deletarAtividade(){
    this.service
    .deletar( this.atividadeSelecionada )
    .subscribe(
      response => {
        this.mensagemSucesso = 'Atividade deletada com sucesso!',
        this.mensagemErro = '';
        this.consultar();
      },
      erro => {
        this.mensagemErro = 'Ocorreu um erro ao deletar a atividade.',
        this.mensagemSucesso = '';
      }
    )
  }

}
