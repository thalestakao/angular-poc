import { ComponentBase } from './../../../../shared/component-base';
import { AlunosService } from './../../services/alunos.service';
import { combineLatest, debounceTime, distinctUntilChanged, map, merge, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Component, Input, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ListaPaginada } from '../../models/response/lista-paginada.response';
import { Aluno } from '../../models/response/alunos';
import { Paginador } from '../../models/response/paginador';
import { TabelaAlunoService } from './tabela.service';

@Component({
  selector: 'app-tabela-aluno',
  templateUrl: './tabela-aluno.component.html',
  styleUrls: ['./tabela-aluno.component.css'],
  providers: [TabelaAlunoService]
})

export class TabelaAlunoComponent extends ComponentBase<ListaPaginada<Aluno>> implements OnInit, OnDestroy {
  items$ = this._facade.items$;
  
  paginador$ = this._facade.paginador$;
  isLoading$ = this._facade.isLoading$;


  constructor(private alunoService: AlunosService, private _facade: TabelaAlunoService) {
    super();
  }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    this._facade.buscaAlunos('');
  }

  public aoMudarPagina(paginador: Paginador): void {
    this._facade.buscaAlunosPagina(paginador.paginaAtual);
  }

  @Input() public set pesquisa(value: string) {
    this._facade.buscaAlunos(value);
  }



}
