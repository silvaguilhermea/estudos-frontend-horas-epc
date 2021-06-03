import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoService } from 'src/app/estado.service';
import { Estado } from '../estado';

@Component({
  selector: 'app-estado-lista',
  templateUrl: './estado-lista.component.html',
  styleUrls: ['./estado-lista.component.css']
})
export class EstadoListaComponent implements OnInit {

  mensagemSucesso: string;
  mensagemErro: string;
  estados: Estado[] = [];
  estadoSelecionado: Estado;
  
  constructor(
    private router: Router,
    private service: EstadoService
  ) { }

  ngOnInit(): void {
    this.service
      .getEstados()
      .subscribe( resposta => {this.estados = resposta, console.log(resposta)} );
  }

  novoCadastro(){
    this.router.navigate(['/estados/form']);
  }

  preparaDelecao(estado: Estado){
    this.estadoSelecionado = estado;
  }

  deletarEstado(){
    this.service
    .deletar( this.estadoSelecionado )
    .subscribe(
      response => {
        this.mensagemSucesso = 'Status deletado com sucesso!';
        this.mensagemErro = '';
        this.ngOnInit();
      },
      erro => {
        this.mensagemErro = 'Ocorreu um erro ao deletar o status.';
        this.mensagemSucesso = '';
      }
    )
  }

}
