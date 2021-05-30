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
    private estadoService: EstadoService
  ) { }

  ngOnInit(): void {
    this.estadoService
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

  }

}
