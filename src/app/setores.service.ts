import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Setor } from './setores/setor';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SetoresService {

  apiURL: string = environment.apiURLBase + '/setores';

  constructor( private http: HttpClient ) { }
  
  salvar( setor: Setor ) : Observable<Setor> {
    return this.http.post<Setor>( `${this.apiURL}`, setor );
  }
   
  atualizar( setor: Setor ) : Observable<any> {
    return this.http.put<Setor>(`${this.apiURL}/${setor.id}`, setor);
  }
   
  getSetores() : Observable<Setor[]> {
    return this.http.get<Setor[]>( this.apiURL );
  }
   
  getSetorById(id: number) : Observable<Setor> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
  
  deletar( setor: Setor ) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${setor.id}`);
  }
   
}
