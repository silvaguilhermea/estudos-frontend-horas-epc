import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AreasService } from 'src/app/areas.service';
import { Area } from 'src/app/areas/area';
import { DocAutomacaoService } from 'src/app/doc-automacao.service';
import { EstadoService } from 'src/app/estado.service';
import { Estado } from 'src/app/estado/estado';
import { Usuario } from 'src/app/usuarios/usuario';
import { ProjetosService } from 'src/app/projetos.service';
import { Projeto } from 'src/app/projetos/projeto';
import { SetoresService } from 'src/app/setores.service';
import { Setor } from 'src/app/setores/setor';
import { UsuariosService } from 'src/app/usuarios.service';
import { DocAutomacao } from "../doc-automacao";

@Component({
  selector: 'app-doc-automacao-form',
  templateUrl: './doc-automacao-form.component.html',
  styleUrls: ['./doc-automacao-form.component.css']
})
export class DocAutomacaoFormComponent implements OnInit {

  docAutomacao: DocAutomacao;
  docsAutomacao?: DocAutomacao[] = [];
  success: boolean = false;
  errors: String[];
  id: number;
  area?: Area;
  areas?: Area[] = [];
  projeto?: Projeto;
  nomeProjeto?: String;
  nomeArea?: String;
  nomeSetor?: String;
  projetosFiltrados?: Projeto[] = [];
  projetos?: Projeto[] = [];
  setores?: Setor[]= [];
  usuarios?: Usuario[] = [];
  estados?: Estado[] = [];

  constructor(
    private service: DocAutomacaoService,
    private serviceAreas: AreasService,
    private serviceProjetos: ProjetosService,
    private serviceSetores: SetoresService,
    private serviceUsuarios: UsuariosService,
    private serviceEstados: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.docAutomacao = new DocAutomacao();
   }

  ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getDocAutomacaoById( this.id )
      .subscribe(
        response => { 
          this.docAutomacao = response,
          this.nomeArea = this.docAutomacao.projeto?.area?.name, 
          this.nomeProjeto = this.docAutomacao.projeto?.name,
          this.nomeSetor = this.docAutomacao.setor?.name;
        },
        errorResponse => this.docAutomacao = new DocAutomacao()
      );
      this.serviceEstados
        .getEstados()
        .subscribe( resposta => { this.estados = resposta } );
        this.serviceUsuarios
        .getUsuarios()
        .subscribe( resposta => { this.usuarios = resposta } );
    } else {
      this.service
        .getDocsAutomacao()
        .subscribe( resposta => { this.docsAutomacao = resposta } );
      this.serviceAreas
        .getAreas()
        .subscribe( resposta => { this.areas = resposta } );
      this.serviceProjetos
        .getProjetos()
        .subscribe( resposta => { this.projetos = resposta } );  
      this.serviceSetores
        .getSetores()
        .subscribe( resposta => { this.setores = resposta } );
      this.serviceUsuarios
        .getUsuarios()
        .subscribe( resposta => { this.usuarios = resposta } );
      this.serviceEstados
        .getEstados()
        .subscribe( resposta => { this.estados = resposta } );
    }
  }

  voltarParaListagem() {
    this.router.navigate(['doc-automacao/lista']);
  }

  listaProjetos(){
    let projs = this.projetos?.filter((_proj) => {
      return _proj.area?.id === this.area?.id;
    })
    this.projetosFiltrados = projs;
  }

  onSubmit(){
    if( this.id ) {

      this.service
      .atualizar( this.docAutomacao )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o documento.']
      })

    } else {

      this.service.salvar(this.docAutomacao)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.docAutomacao = response;
        console.log(response);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

}
