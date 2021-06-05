import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { Apontamento } from './apontamentos/apontamento';

@Injectable({
  providedIn: 'root'
})
export class ApontamentosService {

  apiURL: string = environment.apiURLBase + '/apontamentos';

  constructor( private http: HttpClient ) { }

  salvar( apontamento: Apontamento ) : Observable<Apontamento> {
    return this.http.post<Apontamento>( `${this.apiURL}` , apontamento );
  }

  buscar( usuario: string ) : Observable<[]>{
    const httpParams = new HttpParams().set("responsavel", usuario);

    // /apontamentos?responsavel=Guilherme
    const url = this.apiURL + "?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }
 
  atualizar( apontamento: Apontamento ) : Observable<any> {
    return this.http.put<Apontamento>(`${this.apiURL}/${apontamento.id}`, apontamento);
  }
 
  getApontamentos() : Observable<Apontamento[]> {
    return this.http.get<Apontamento[]>( this.apiURL );
  }
 
  getApontamentoById(id: number) : Observable<Apontamento> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar( apontamento: Apontamento ) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${apontamento.id}`);
  }
}
