import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SetoresService } from 'src/app/setores.service';
import { Setor } from '../setor';

@Component({
  selector: 'app-setores-form',
  templateUrl: './setores-form.component.html',
  styleUrls: ['./setores-form.component.css']
})
export class SetoresFormComponent implements OnInit {

  setor: Setor;
  success: boolean;
  errors: String[];
  id: number;

  constructor(
    private service: SetoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.setor = new Setor();
  }

  ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getSetorById( this.id )
      .subscribe(
        response => this.setor = response,
        errorResponse => this.setor = new Setor()
      )
    }
  }

  voltarParaListagem() {
    this.router.navigate(['setores/lista']);
  }

  onSubmit(){
    if( this.id ) {

      this.service
      .atualizar( this.setor )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o setor.']
      })

    } else {
      this.service
      .salvar(this.setor)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.setor = response;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

}
