import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Projeto } from "./projetos/projeto";
import { Area } from './areas/area';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  apiURL: string = environment.apiURLBase + "/projetos"

  constructor( private http: HttpClient ) { }

  salvar(projeto: Projeto) : Observable<Projeto> {
    return this.http.post<Projeto>(this.apiURL, projeto);
  }

  getProjetos() : Observable<Projeto[]> {
    return this.http.get<Projeto[]>( this.apiURL );
  }

  getProjetosOrdenadosPorArea(attribute: string) : Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.apiURL}/area/${attribute}`);
  }

  getProjetoById(id: number) : Observable<Projeto> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  atualizar( projeto: Projeto ) : Observable<any> {
    return this.http.put<Projeto>(`${this.apiURL}/${projeto.id}`, projeto);
  }

  deletar( projeto: Projeto ) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${projeto.id}`);
  }
}
