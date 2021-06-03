import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Estado } from './estado/estado';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  apiURL: string = environment.apiURLBase + '/estados';
  
  constructor( private http: HttpClient ) { }

  salvar( estado: Estado ) : Observable<Estado> {
    return this.http.post<Estado>( `${this.apiURL}` , estado );
  }
 
  atualizar( estado: Estado ) : Observable<any> {
    return this.http.put<Estado>(`${this.apiURL}/${estado.id}`, estado);
  }
 
  getEstados() : Observable<Estado[]> {
    return this.http.get<Estado[]>( this.apiURL );
  }
 
  getEstadoById(id: number) : Observable<Estado> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar( estado: Estado ) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${estado.id}`);
  }
}
