import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aluno-page',
  templateUrl: './aluno-page.component.html',
  styleUrls: ['./aluno-page.component.css']
})
export class AlunoPageComponent implements OnInit {

  public pesquisa!: string;

  constructor() { }

  ngOnInit() {
  }

  public aoPesquisar(pesquisa: string) {
    this.pesquisa = pesquisa;
  }

}
