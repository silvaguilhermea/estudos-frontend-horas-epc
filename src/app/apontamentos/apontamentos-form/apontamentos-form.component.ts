import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApontamentosService } from 'src/app/apontamentos.service';
import { AreasService } from 'src/app/areas.service';
import { Area } from 'src/app/areas/area';
import { AtividadesService } from 'src/app/atividades.service';
import { Atividade } from 'src/app/atividades/atividade';
import { Usuario } from 'src/app/usuarios/usuario';
import { ProjetosService } from 'src/app/projetos.service';
import { Projeto } from 'src/app/projetos/projeto';
import { SetoresService } from 'src/app/setores.service';
import { Setor } from 'src/app/setores/setor';
import { UsuariosService } from 'src/app/usuarios.service';
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

  projeto?: Projeto;
  projetos?: Projeto[] = [];
  projetosFiltrados?: Projeto[] = [];

  setores?: Setor[]= [];
  setor?: Setor;

  atividade: Atividade;
  atividades?: Atividade[] = [];
  atividadesFiltradas?: Atividade[] = [];

  usuario?: Usuario;
  usuarios?: Usuario[] = [];
  nomeUsuario?: string;

  constructor(
    private serviceAreas: AreasService,
    private serviceProjetos: ProjetosService,
    private serviceSetores: SetoresService,
    private serviceAtividades: AtividadesService,
    private serviceUsuarios: UsuariosService,
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
      this.service
      .getApontamentoById( this.id )
      .subscribe(
        response => {this.apontamento = response, console.log("Apontamento: ", this.apontamento)},
        errorResponse => this.apontamento = new Apontamento()
      )
      
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
        .getAtividade()
        .subscribe( resposta => { this.atividades = resposta } ); 
      this.serviceUsuarios
        .getUsuarios()
        .subscribe( resposta => { this.usuarios = resposta } ); 
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
    let atvs = this.atividades?.filter((_atv) => {
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
      if (this.area && this.projeto?.name && this.setor?.name && this.atividade.name) {
        this.apontamento.area = this.area.name;
        this.apontamento.projeto = this.projeto?.name;
        this.apontamento.setor = this.setor?.name;
        this.apontamento.atividade = this.atividade.name;
        this.apontamento.responsavel = this.usuario?.name;
      }
      
      this.service.salvar(this.apontamento)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.apontamento = response;
        console.log("Apontamento: ", this.apontamento);
        console.log("Resposta: ", response);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
        console.log(this.apontamento);
      })

    }
  }

}
