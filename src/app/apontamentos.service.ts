import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
