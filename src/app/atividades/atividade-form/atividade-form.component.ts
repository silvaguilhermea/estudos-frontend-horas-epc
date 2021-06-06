import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AreasService } from 'src/app/areas.service';
import { Area } from 'src/app/areas/area';
import { AtividadesService } from 'src/app/atividades.service';
import { EstadoService } from 'src/app/estado.service';
import { Estado } from 'src/app/estado/estado';
import { Usuario } from 'src/app/usuarios/usuario';
import { ProjetosService } from 'src/app/projetos.service';
import { Projeto } from 'src/app/projetos/projeto';
import { SetoresService } from 'src/app/setores.service';
import { Setor } from 'src/app/setores/setor';
import { UsuariosService } from 'src/app/usuarios.service';
import { Atividade } from "../atividade";

@Component({
  selector: 'app-atividade-form',
  templateUrl: './atividade-form.component.html',
  styleUrls: ['./atividade-form.component.css']
})
export class AtividadeFormComponent implements OnInit {

  atividade: Atividade;
  atividades?: Atividade[] = [];
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
    private service: AtividadesService,
    private serviceAreas: AreasService,
    private serviceProjetos: ProjetosService,
    private serviceSetores: SetoresService,
    private serviceUsuarios: UsuariosService,
    private serviceEstados: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.atividade = new Atividade();
   }

  ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getAtividadeById( this.id )
      .subscribe(
        response => { 
          this.atividade = response,
          this.nomeArea = this.atividade.projeto?.area?.name, 
          this.nomeProjeto = this.atividade.projeto?.name,
          this.nomeSetor = this.atividade.setor?.name;
        },
        errorResponse => this.atividade = new Atividade()
      );
      this.serviceEstados
        .getEstados()
        .subscribe( resposta => { this.estados = resposta } );
        this.serviceUsuarios
        .getUsuarios()
        .subscribe( resposta => { this.usuarios = resposta } );
    } else {
      this.service
        .getAtividade()
        .subscribe( resposta => { this.atividades = resposta } );
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
    this.router.navigate(['atividade/lista']);
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
      .atualizar( this.atividade )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar a atividade.']
      })

    } else {

      this.service.salvar(this.atividade)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.atividade = response;
        console.log(this.atividade);
        console.log(response);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

}
