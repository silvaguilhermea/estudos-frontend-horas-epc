import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetoresService } from 'src/app/setores.service';
import { Setor } from '../setor';

@Component({
  selector: 'app-setores-lista',
  templateUrl: './setores-lista.component.html',
  styleUrls: ['./setores-lista.component.css']
})
export class SetoresListaComponent implements OnInit {

  mensagemSucesso: string;
  mensagemErro: string;
  setores: Setor[] = [];
  setorSelecionado: Setor;

  constructor(
    private router: Router,
    private service: SetoresService
  ) { }

  ngOnInit(): void {
    this.service
      .getSetores()
      .subscribe( resposta => {this.setores = resposta, console.log(resposta)} );
    
  }

  novoCadastro(){
    this.router.navigate(['/setores/form']);
  }

  preparaDelecao(setor: Setor){
    this.setorSelecionado = setor;
  }

  deletarSetor(){
    this.service
    .deletar( this.setorSelecionado )
    .subscribe(
      response => {
        this.mensagemSucesso = 'Setor deletado com sucesso!';
        this.mensagemErro = '';
        this.ngOnInit();
      },
      erro => {
        this.mensagemErro = 'Ocorreu um erro ao deletar o setor.';
        this.mensagemSucesso = '';
      }
    )
  }
}
