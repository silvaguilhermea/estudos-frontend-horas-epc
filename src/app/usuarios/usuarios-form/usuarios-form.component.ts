import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Usuario } from '../usuario';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {

  usuario: Usuario;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor( 
    private service: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    let params : Params = this.activatedRoute.params
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getUsuarioById( this.id )
      .subscribe(
        response => {
          this.usuario = response
        },
        errorResponse => {
          this.usuario = new Usuario()
        }
      )
    }
    
  }

  voltarParaListagem() {
    this.router.navigate(['usuarios/lista']);
  }

  onSubmit(){
    if( this.id ) {

      this.service
      .atualizar( this.usuario )
      .subscribe( response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o usuário.']
      })

    } else {

      this.service.salvar(this.usuario)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.usuario = response;
        console.log(response);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
    
  }

}
