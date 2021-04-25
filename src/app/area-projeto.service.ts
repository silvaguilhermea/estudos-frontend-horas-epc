import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AreaProjeto } from "./area-projeto/area-projeto";
import { AreaProjetoBusca } from "./area-projeto/area-projeto-lista/areaProjetoBusca";
import { Area } from './areas/area';

@Injectable({
  providedIn: 'root'
})
export class AreaProjetoService {

  apiURL: string = environment.apiURLBase + "/projetos"

  constructor( private http: HttpClient ) { }

  salvar(areaProjeto: AreaProjeto) : Observable<AreaProjeto> {
    return this.http.post<AreaProjeto>(this.apiURL, areaProjeto);
  }

  buscar( area: string ) : Observable<AreaProjetoBusca[]>{
    const httpParams = new HttpParams().set("area", area);

    // /projeto?area=P41-PPH
    const url = this.apiURL + "?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url);
  }

  getAreaProjetoById(id: number) : Observable<AreaProjeto> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  atualizar( areaProjeto: AreaProjeto ) : Observable<any> {
    return this.http.put<AreaProjeto>(`${this.apiURL}/${areaProjeto.id}`, areaProjeto);
  }

  deletar( areaProjeto: AreaProjeto ) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${areaProjeto.id}`);
  }
}
