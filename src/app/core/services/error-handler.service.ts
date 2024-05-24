import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorStatus } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private router: Router) {}
  public handleError = (error: HttpErrorResponse) => {
    if (error.status === ErrorStatus.NOT_FOUND) {
      this.handle404Error();
    } else if (error.status === ErrorStatus.SERVER_ERROR) {
      this.handle500Error();
    } else {
      this.handleOtherError();
    }
  };

  private handleOtherError = () => {
    this.router.navigate(['/error']);
  };

  private handle500Error = () => {
    this.router.navigate(['/500']);
  };

  private handle404Error = () => {
    this.router.navigate(['/404']);
  };
}
