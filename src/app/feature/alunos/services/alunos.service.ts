import { ListaPaginada } from './../models/response/lista-paginada.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from '../models/response/alunos';
import { delay, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor(private http: HttpClient) { }

  public buscarAlunos(coluna: string, ordem: string, pagina: number, pesquisa: string): Observable<ListaPaginada<Aluno>> {
    return this.http.get<Aluno[]>(`https://3000-thalestakao-angularpoc-7y0aa4zssbt.ws-us60.gitpod.io/alunos?_sort=${coluna}&_order=${ordem}&q=${pesquisa}&_page=${pagina}_limit=10`).pipe(switchMap((res) => {
      const lista: ListaPaginada<Aluno> = new ListaPaginada<Aluno>();
      lista.itens = res;
      lista.paginador.paginaAtual = pagina;
      lista.paginador.totalItens = res.length;
      lista.paginador.temPaginaAnterior = pagina > 1
      return of(lista).pipe(delay(1000));
    }));
  }

}
