import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './error-handler.service';
import { ErrorStatus } from '../enums';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    service = new ErrorHandlerService(router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError', () => {
    it('should navigate to /error for other errors', () => {
      const error = new HttpErrorResponse({ status: 400 });
      service.handleError(error);
      expect(router.navigate).toHaveBeenCalledWith(['/error']);
    });

    it('should navigate to /500 for server errors', () => {
      const error = new HttpErrorResponse({ status: ErrorStatus.SERVER_ERROR });
      service.handleError(error);
      expect(router.navigate).toHaveBeenCalledWith(['/500']);
    });

    it('should navigate to /404 for not found errors', () => {
      const error = new HttpErrorResponse({ status: ErrorStatus.NOT_FOUND });
      service.handleError(error);
      expect(router.navigate).toHaveBeenCalledWith(['/404']);
    });
  });
});
