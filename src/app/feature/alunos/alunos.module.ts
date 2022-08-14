import { PaginadorComponent } from './components/paginador/paginador.component';
import { TabelaAlunoComponent } from './components/tabela-aluno/tabela-aluno.component';
import { AlunoPageComponent } from './pages/aluno-page/aluno-page.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AlunoPageComponent, TabelaAlunoComponent, PaginadorComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [AlunoPageComponent, PaginadorComponent]
})
export class AlunoModule {

}
