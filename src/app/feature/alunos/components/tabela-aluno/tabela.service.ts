import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { switchMap, take, combineLatest, debounceTime, distinctUntilChanged, map, Observable, of, tap } from "rxjs";
import { Aluno } from "../../models/response/alunos";
import { ListaPaginada } from "../../models/response/lista-paginada.response";
import { Paginador } from "../../models/response/paginador";
import { AlunosService } from "../../services/alunos.service";

@Injectable()
export class TabelaAlunoService extends ComponentStore<ListaPaginada<Aluno> & { term: string }> {
    items$ = this.select(state => state.itens);
    paginador$ = this.select(state => state.paginador);
    term$ = this.select(state => state.term);

    constructor(private alunoService: AlunosService) {
        super({
            itens: [],
            paginador: new Paginador(),
            term: ''
        })
    }

    buscaAlunos = this.effect((pesquisa$: Observable< string>) => {
        return pesquisa$
            .pipe(
                    debounceTime(300), 
                    map(term => (term ?? '').trim()), 
                    distinctUntilChanged(), 
                    switchMap((v: string) => 
                        combineLatest([
                                this.alunoService.buscarAlunos('nome', 'asc', 1, v), 
                                of(v)
                            ])),
                    tap(([v, term]: [ListaPaginada<Aluno>, string]) => this.patchState({...v, term}))
                )
    });

    buscaAlunosPagina(pagina = 1) {
        this.term$.pipe(take(1), switchMap(termTxt => this.alunoService
            .buscarAlunos('nome', 'asc', pagina, termTxt ?? '')))
            .subscribe(v => this.patchState(v));
    }


}