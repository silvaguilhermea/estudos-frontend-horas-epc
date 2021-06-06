import { Area } from "../areas/area";
import { Estado } from "../estado/estado";
import { Usuario } from "../login/usuario";
import { Projeto } from "../projetos/projeto";
import { Setor } from "../setores/setor";

export class Atividade {
    id?: number;
    name?: string;
    area?: Area;
    projeto?: Projeto;
    usuario?: Usuario;
    setor?: Setor;
    estado?: Estado;
}