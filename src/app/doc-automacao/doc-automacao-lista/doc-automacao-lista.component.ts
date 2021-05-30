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
  docsAutomacao: DocAutomacao[] = [];
  areas: Area[] = [];
  projetos: Projeto[] = [];
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

  preparaDelecao(docAutomacao: DocAutomacao){
    this.docAutomacaoSelecionado = docAutomacao;
  }

  deletarDocAutomacao(){

  }

}
