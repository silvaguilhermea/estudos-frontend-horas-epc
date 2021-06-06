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

  buscar( projeto: string ) : Observable<[]>{
    const httpParams = new HttpParams().set("projeto", projeto);

    // /atividades?projeto=CIP Clarificação
    const url = this.apiURL + "?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }
 
  atualizar( atividade: Atividade ) : Observable<any> {
    return this.http.put<Atividade>(`${this.apiURL}/${atividade.id}`, atividade);
  }
 
  getAtividade() : Observable<Atividade[]> {
    return this.http.get<Atividade[]>( this.apiURL );
  }
 
  getAtividadeById(id: number) : Observable<Atividade> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar( atividade: Atividade ) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${atividade.id}`);
  }
}
