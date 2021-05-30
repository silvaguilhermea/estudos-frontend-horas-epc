import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstadoService } from 'src/app/estado.service';
import { Estado } from '../estado';

@Component({
  selector: 'app-estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.css']
})
export class EstadoFormComponent implements OnInit {

  estado: Estado;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.estado = new Estado();
   }

  ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getEstadoById( this.id )
      .subscribe(
        response => this.estado = response,
        errorResponse => this.estado = new Estado()
      )
    }
  }

  voltarParaListagem() {
    this.router.navigate(['estados/lista']);
  }

  onSubmit(){
    if( this.id ) {

      this.service
      .atualizar( this.estado )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o status.']
      })

    } else {

      this.service.salvar(this.estado)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.estado = response;
        console.log(response);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

}
