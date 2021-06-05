import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { DocAutomacao } from "./doc-automacao/doc-automacao";
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DocAutomacaoService {

  apiURL: string = environment.apiURLBase + '/atividades';

  constructor( private http: HttpClient ) { }

  salvar( docAutomacao: DocAutomacao ) : Observable<DocAutomacao> {
    return this.http.post<DocAutomacao>( `${this.apiURL}` , docAutomacao );
  }

  buscar( projeto: string ) : Observable<[]>{
    const httpParams = new HttpParams().set("projeto", projeto);

    // /atividades?projeto=CIP Clarificação
    const url = this.apiURL + "?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }
 
  atualizar( docAutomacao: DocAutomacao ) : Observable<any> {
    return this.http.put<DocAutomacao>(`${this.apiURL}/${docAutomacao.id}`, docAutomacao);
  }
 
  getDocsAutomacao() : Observable<DocAutomacao[]> {
    return this.http.get<DocAutomacao[]>( this.apiURL );
  }
 
  getDocAutomacaoById(id: number) : Observable<DocAutomacao> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar( docAutomacao: DocAutomacao ) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${docAutomacao.id}`);
  }
}
