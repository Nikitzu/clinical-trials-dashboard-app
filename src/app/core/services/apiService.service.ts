import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Signal, WritableSignal } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';

export abstract class ApiService<T = []> {
  protected abstract _data: WritableSignal<T>;
  abstract data: Signal<T>;
  protected constructor(
    protected baseUrl: string,
    protected http: HttpClient,
    protected errorHandlerService: ErrorHandlerService
  ) {}

  set setServerData(value: T) {
    this._data.update(() => value);
  }

  get<R>(params?: HttpParams, headers?: HttpHeaders): Observable<R> {
    const options = { params, headers };
    return this.http.get<R>(`${this.baseUrl}`, options).pipe(
      catchError((error) => {
        this.errorHandlerService.handleError(error);
        return new Observable<R>();
      })
    );
  }
}
