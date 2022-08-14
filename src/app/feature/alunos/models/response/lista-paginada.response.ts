import { Paginador } from './paginador';
export class ListaPaginada<T> {
  constructor(
    public paginador: Paginador = new Paginador(),
    public itens?: T[],
  ) { }
}
