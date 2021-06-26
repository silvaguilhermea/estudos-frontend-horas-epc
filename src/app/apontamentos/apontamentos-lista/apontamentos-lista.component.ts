import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApontamentosService } from 'src/app/apontamentos.service';
import { UsuariosService } from 'src/app/usuarios.service';
import { Usuario } from 'src/app/usuarios/usuario';
import { Apontamento } from '../apontamento';

@Component({
  selector: 'app-apontamentos-lista',
  templateUrl: './apontamentos-lista.component.html',
  styleUrls: ['./apontamentos-lista.component.css']
})
export class ApontamentosListaComponent implements OnInit {

  mensagemSucesso: string;
  mensagemErro: string;
  message: string;
  lista: Apontamento[] = [];
  apontamentos: Apontamento[] = [];
  apontamentoSelecionado: Apontamento;
  usuarioSelecionado: Usuario;
  usuario: string;
  usuarios: Usuario[] = [];

  constructor(
    private router: Router,
    private service: ApontamentosService,
    private serviceUsuarios: UsuariosService
  ) { }

  ngOnInit(): void {
    this.service
      .getApontamentos()
      .subscribe( resposta => {this.apontamentos = resposta} );
    this.serviceUsuarios
      .getUsuarios()
      .subscribe( resposta => {this.usuarios = resposta} );
  }

  novoCadastro(){
    this.router.navigate(['/apontamentos/form']);
  }

  consultar() {
    if ( this.usuarioSelecionado.name ) {
      this.usuario = this.usuarioSelecionado.name;
    }
    this.service
      .getApontamentosOrdenadoPorUsuario( this.usuario )
      .subscribe( response => {
        this.lista = response;
        if( this.lista.length <= 0 ){
          this.message = "Nenhum apontamento encontrado.";
        } else {
          this.message = 'Apontamentos(s) encontrado(s)';
        }
      });
  }

  preparaDelecao(apontamento: Apontamento){
    this.apontamentoSelecionado = apontamento;
  }

  deletarApontamento(){
    this.service
    .deletar( this.apontamentoSelecionado )
    .subscribe(
      response => {
        this.mensagemSucesso = 'Apontamento deletado com sucesso!';
        this.mensagemErro = '';
        this.consultar();
      },
      erro => {
        this.mensagemErro = 'Ocorreu um erro ao deletar o apontamento.';
        this.mensagemSucesso = '';
      }
    )
  }

}
