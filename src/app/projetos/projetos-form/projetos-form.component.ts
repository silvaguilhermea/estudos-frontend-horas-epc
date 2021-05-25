import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Area } from "../../areas/area";
import { AreasService } from "../../areas.service";
import { Projeto } from "../projeto";
import { ProjetosService } from "../../projetos.service";

@Component({
  selector: 'app-projetos-form',
  templateUrl: './projetos-form.component.html',
  styleUrls: ['./projetos-form.component.css']
})
export class ProjetosFormComponent implements OnInit {

  areas: Area[] = [];
  projeto: Projeto;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private areaService: AreasService,
    private service: ProjetosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceAreas: AreasService
  ) {
    this.projeto = new Projeto();
    this.serviceAreas.getAreas().subscribe( response => {
      this.areas = response;
    });
   }

   ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getProjetoById( this.id )
      .subscribe(
        response => {
          this.projeto = response
        },
        errorResponse => this.projeto = new Projeto()
      )
    }
  }

  voltarParaListagem() {
    this.router.navigate(['projetos/lista']);
  }

  onSubmit(){
    if( this.id ) {

      this.service
      .atualizar( this.projeto )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o projeto.']
      })

    } else {

      this.service.salvar(this.projeto)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.projeto = response;
        console.log(response);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

}
