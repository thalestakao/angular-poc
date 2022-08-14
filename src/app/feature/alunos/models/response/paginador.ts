export class Paginador {
  constructor(
    public paginaAtual: number = 1,
    public totalItens: number = 100,
    public temProximaPagina: boolean = false,
    public temPaginaAnterior: boolean = false,
  ) { }
}
