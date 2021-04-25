import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor( 
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getClienteById( this.id )
      .subscribe(
        response => {
          this.cliente = response,
          console.log("Cliente OK: " + this.cliente.dtInclusao)
        },
        errorResponse => {
          this.cliente = new Cliente(),
          console.log("Cliente Não OK: " + errorResponse)
        }
      )
    }
    
  }

  voltarParaListagem() {
    this.router.navigate(['clientes/lista']);
  }

  onSubmit(){
    if( this.id ) {

      this.service
      .atualizar( this.cliente )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o usuário.']
      })

    } else {

      this.service.salvar(this.cliente)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.cliente = response;
        console.log(response);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
    
  }

}
