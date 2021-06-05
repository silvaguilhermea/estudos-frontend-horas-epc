import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AreasService } from 'src/app/areas.service';
import { Area } from '../area';

@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.css']
})
export class AreasFormComponent implements OnInit {

  area: Area;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: AreasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.area = new Area();
   }

  ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getAreaById( this.id )
      .subscribe(
        response => this.area = response,
        errorResponse => this.area = new Area()
      )
    }
  }

  voltarParaListagem() {
    this.router.navigate(['areas/lista']);
  }

  onSubmit(){
    
    if( this.id ) {

      this.service
      .atualizar( this.area )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar a área.']
      })

    } else {

      this.service.salvar(this.area)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.area = response;
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

}
