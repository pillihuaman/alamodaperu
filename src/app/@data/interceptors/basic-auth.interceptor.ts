import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { NbComponentStatus } from '@nebular/theme';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { ModalRepository } from '../../@domain/repository/repository/modal.repository ';
import { inject } from '@angular/core';

export class BasicAuthInterceptor implements HttpInterceptor {
  private authenticationService = inject(AuthenticationRepository);
  private modalRepository = inject(ModalRepository);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (!request.headers.has('Authorization')) {
      
      const currentUser = this.authenticationService.getCurrentUserValue;
      if (currentUser?.access_token) {
        headersConfig.Authorization = `Bearer ${currentUser.access_token}`;
      }
    }

    request = request.clone({ setHeaders: headersConfig });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const nbComponentStatus: NbComponentStatus = 'danger';
        this.modalRepository.showToast(nbComponentStatus, error.message, "Basic");
        return throwError(() => error);
      })
    );
  }
}
