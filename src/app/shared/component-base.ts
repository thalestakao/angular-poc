import { HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

export class ComponentBase<T> {
  public itensSubject: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);
  public itens$!: Observable<T | null>;
  protected errorSubject!: BehaviorSubject<HttpErrorResponse | null>;
  public error$!: Observable<HttpErrorResponse | null>;

  protected getItens(observable: Observable<T>) {
    this.itensSubject = this.convertObservableToBehaviorSubject(observable, null);
    this.itens$ = this.itensSubject.asObservable();
  }

  private convertObservableToBehaviorSubject<T>(observable: Observable<T>, initValue: T): BehaviorSubject<T> {
    const subject = new BehaviorSubject(initValue);
    observable.subscribe(subject);
    return subject;
  }
}

