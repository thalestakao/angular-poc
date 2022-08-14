export class Aluno {
  constructor(
    public nome: string,
    public sobrenome: string,
    public email: string,
    public genero: string,
    public ativo: boolean,
    public id?: string,
  ) { }
}

export type Alunos = Alunos[];
