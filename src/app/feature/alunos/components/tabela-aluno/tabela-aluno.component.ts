import { ComponentBase } from './../../../../shared/component-base';
import { AlunosService } from './../../services/alunos.service';
import { combineLatest, debounceTime, distinctUntilChanged, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Component, Input, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ListaPaginada } from '../../models/response/lista-paginada.response';
import { Aluno } from '../../models/response/alunos';
import { Paginador } from '../../models/response/paginador';

@Component({
  selector: 'app-tabela-aluno',
  templateUrl: './tabela-aluno.component.html',
  styleUrls: ['./tabela-aluno.component.css']
})

export class TabelaAlunoComponent extends ComponentBase<ListaPaginada<Aluno>> implements OnInit, OnDestroy {


  // public itens$!: Observable<ListaPaginada<Aluno>>;
  public carregamentoInicial$!: Observable<ListaPaginada<Aluno>>;

  public pesquisaSubject: Subject<string> = new Subject<string>();
  public buscaPorPesquisa$!: Observable<ListaPaginada<Aluno>>;

  public mudarPaginaSubject: Subject<Paginador> = new Subject<Paginador>();
  public carregaTabelaPagina$!: Observable<ListaPaginada<Aluno>>

  public listaPaginada!: ListaPaginada<Aluno>;

  /** destrói todas as assinaturas em observables */
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private alunoService: AlunosService) {
    super();
  }

  ngOnDestroy(): void {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  ngOnInit() {
    // this.buscaPorPesquisa$ = this.pesquisaSubject.asObservable().pipe(debounceTime(500), map(pesquisa => pesquisa.trim()), distinctUntilChanged(), switchMap(next => {
    this.buscaPorPesquisa$ = this.pesquisaSubject.pipe(debounceTime(500), map(pesquisa => pesquisa.trim()), distinctUntilChanged(), switchMap(next => {
      if (next) {
        return this.alunoService.buscarAlunos('nome', 'asc', 1, next);
      }
      return this.alunoService.buscarAlunos('nome', 'asc', 1, '');
    }), takeUntil(this._destroy$));

    this.carregamentoInicial$ = this.alunoService.buscarAlunos('nome', 'asc', 1, '').pipe(takeUntil(this._destroy$));

    // this.carregaTabelaPagina$ = this.mudarPaginaSubject.asObservable().pipe(switchMap(paginador => {
    this.carregaTabelaPagina$ = this.mudarPaginaSubject.pipe(switchMap(paginador => {
      if (paginador) {
        return this.alunoService.buscarAlunos('nome', 'asc', paginador.paginaAtual, '');
      }
      return this.alunoService.buscarAlunos('nome', 'asc', 1, '');
    }), takeUntil(this._destroy$));

    this.getItens(merge(this.buscaPorPesquisa$, this.carregamentoInicial$, this.carregaTabelaPagina$).pipe(takeUntil(this._destroy$)));
    ;

  }

  public aoMudarPagina(paginador: Paginador): void {
    this.mudarPaginaSubject.next(paginador);
  }

  @Input() public set pesquisa(value: string) {
    this.pesquisaSubject.next(value);
  }



}
