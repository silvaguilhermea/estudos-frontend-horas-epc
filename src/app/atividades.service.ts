import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Atividade } from "./atividades/atividade";
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {

  apiURL: string = environment.apiURLBase + '/atividades';

  constructor( private http: HttpClient ) { }

  salvar( atividade: Atividade ) : Observable<Atividade> {
    return this.http.post<Atividade>( `${this.apiURL}` , atividade );
  }
 
  atualizar( atividade: Atividade ) : Observable<any> {
    return this.http.put<Atividade>(`${this.apiURL}/${atividade.id}`, atividade);
  }
 
  getAtividade() : Observable<Atividade[]> {
    return this.http.get<Atividade[]>( this.apiURL );
  }

  getAtividadesOrdenadasPorProjeto(attribute: string) : Observable<Atividade[]> {
    return this.http.get<Atividade[]>(`${this.apiURL}/projeto/${attribute}`);
  }
 
  getAtividadeById(id: number) : Observable<Atividade> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar( atividade: Atividade ) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${atividade.id}`);
  }
}
