import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApontamentosService } from 'src/app/apontamentos.service';
import { AreasService } from 'src/app/areas.service';
import { Area } from 'src/app/areas/area';
import { DocAutomacaoService } from 'src/app/doc-automacao.service';
import { DocAutomacao } from 'src/app/doc-automacao/doc-automacao';
import { ProjetosService } from 'src/app/projetos.service';
import { Projeto } from 'src/app/projetos/projeto';
import { SetoresService } from 'src/app/setores.service';
import { Setor } from 'src/app/setores/setor';
import { Apontamento } from '../apontamento';

@Component({
  selector: 'app-apontamentos-form',
  templateUrl: './apontamentos-form.component.html',
  styleUrls: ['./apontamentos-form.component.css']
})
export class ApontamentosFormComponent implements OnInit {

  success: boolean = false;
  errors: String[];
  id: number;
  apontamento: Apontamento;

  area?: Area;
  areas?: Area[] = [];
  nomeArea?: String;

  projeto?: Projeto;
  projetos?: Projeto[] = [];
  projetosFiltrados?: Projeto[] = [];
  nomeProjeto?: String;

  setores?: Setor[]= [];
  setor?: Setor;
  nomeSetor?: string;

  atividade: DocAutomacao;
  docsAutomacao?: DocAutomacao[] = [];
  atividadesFiltradas?: DocAutomacao[] = [];
  nomeDocumento?: string;

  constructor(
    private serviceAreas: AreasService,
    private serviceProjetos: ProjetosService,
    private serviceSetores: SetoresService,
    private serviceAtividades: DocAutomacaoService,
    private service: ApontamentosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.apontamento = new Apontamento();
  }

  ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      
    } else {
      this.serviceAreas
        .getAreas()
        .subscribe( resposta => { this.areas = resposta } );
      this.serviceProjetos
        .getProjetos()
        .subscribe( resposta => { this.projetos = resposta } );  
      this.serviceSetores
        .getSetores()
        .subscribe( resposta => { this.setores = resposta } );
      this.serviceAtividades
        .getDocsAutomacao()
        .subscribe( resposta => { this.docsAutomacao = resposta } );  
    }
  }

  voltarParaListagem() {
    this.router.navigate(['apontamentos/lista']);
  }

  listaProjetos(){
    let projs = this.projetos?.filter((_proj) => {
      return _proj.area?.id === this.area?.id;
    })
    this.projetosFiltrados = projs;
  }

  listaAtividades(){
    let atvs = this.docsAutomacao?.filter((_atv) => {
      return _atv.projeto?.id === this.projeto?.id && _atv.setor?.id === this.setor?.id;
    })
    this.atividadesFiltradas = atvs;
  }

  onSubmit(){
    if( this.id ) {

      this.service
      .atualizar( this.apontamento )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o apontamento.']
      })

    } else {

      this.service.salvar(this.apontamento)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.apontamento = response;
        console.log(response);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

}
