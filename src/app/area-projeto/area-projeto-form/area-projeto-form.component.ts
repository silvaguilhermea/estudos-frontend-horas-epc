import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Area } from "../../areas/area";
import { AreasService } from "../../areas.service";
import { AreaProjeto } from "../area-projeto";
import { AreaProjetoService } from "../../area-projeto.service";

@Component({
  selector: 'app-area-projeto-form',
  templateUrl: './area-projeto-form.component.html',
  styleUrls: ['./area-projeto-form.component.css']
})
export class AreaProjetoFormComponent implements OnInit {

  areas: Area[] = [];
  areaProjeto: AreaProjeto;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private areaService: AreasService,
    private service: AreaProjetoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceAreas: AreasService
  ) {
    this.areaProjeto = new AreaProjeto();
    this.serviceAreas.getAreas().subscribe( response => {
      this.areas = response;
    });
   }

   ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      console.log(this.id);
      this.service
      .getAreaProjetoById( this.id )
      .subscribe(
        response => {
          this.areaProjeto = response,
          console.log("Nome" + this.areaProjeto.nmProjeto)
        },
        errorResponse => this.areaProjeto = new AreaProjeto()
      )
    }
  }

  voltarParaListagem() {
    this.router.navigate(['area-projeto/lista']);
  }

  onSubmit(){
    if( this.id ) {

      this.service
      .atualizar( this.areaProjeto )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o projeto.']
      })

    } else {

      this.service.salvar(this.areaProjeto)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.areaProjeto = response;
        console.log(response);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

}
