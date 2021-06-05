import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreasService } from 'src/app/areas.service';
import { DocAutomacaoService } from 'src/app/doc-automacao.service';
import { ProjetosService } from 'src/app/projetos.service';
import { DocAutomacao } from '../doc-automacao';
import { Area } from '../../areas/area'
import { Projeto } from 'src/app/projetos/projeto';

@Component({
  selector: 'app-doc-automacao-lista',
  templateUrl: './doc-automacao-lista.component.html',
  styleUrls: ['./doc-automacao-lista.component.css']
})
export class DocAutomacaoListaComponent implements OnInit {

  mensagemSucesso: string;
  mensagemErro: string;
  message: string;
  docsAutomacao: DocAutomacao[] = [];
  lista: DocAutomacao[] = [];
  areas: Area[] = [];
  projeto: string;
  projetos: Projeto[] = [];
  projetoSelecionado: Projeto;
  docAutomacaoSelecionado: DocAutomacao;

  constructor(
    private router: Router,
    private service: DocAutomacaoService,
    private serviceAreas: AreasService,
    private serviceProjetos: ProjetosService
  ) { }

  ngOnInit(): void {
    this.service
      .getDocsAutomacao()
      .subscribe( resposta => { this.docsAutomacao = resposta } );
    this.serviceAreas
      .getAreas()
      .subscribe( resposta => { this.areas = resposta } );
    this.serviceProjetos
      .getProjetos()
      .subscribe( resposta => { this.projetos = resposta } );
  }

  novoCadastro(){
    this.router.navigate(['/doc-automacao/form']);
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

  preparaDelecao(docAutomacao: DocAutomacao){
    this.docAutomacaoSelecionado = docAutomacao;
  }

  deletarDocAutomacao(){
    this.service
    .deletar( this.docAutomacaoSelecionado )
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
