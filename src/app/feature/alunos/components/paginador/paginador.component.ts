import { Paginador } from './../../models/response/paginador';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {

  @Output() public mudarPagina: EventEmitter<Paginador> = new EventEmitter<Paginador>();

  @Input() public paginador!: Paginador;

  constructor() { }

  ngOnInit() {
  }

  proximaPagina() {
    console.log(this.paginador)
    this.paginador.paginaAtual++;
    this.mudarPagina.emit(this.paginador);
  }

  anteriorPagina() {
    this.paginador.paginaAtual > 1 ? this.paginador.paginaAtual-- : null;
    this.mudarPagina.emit(this.paginador);
  }

}
