import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, Injectable, inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { ModalRepository } from '../../@domain/repository/repository/modal.repository ';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  private authenticationService = inject(AuthenticationRepository);
  private modalRepository = inject(ModalRepository);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // ✅ Detectamos si estamos en el navegador
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (!request.headers.has('Authorization')) {
      let token: string | null = null;

      if (this.isBrowser) { // ✅ Verificar si estamos en el navegador antes de usar localStorage
        token = localStorage.getItem('token');
      }

      if (token) {
        headersConfig.Authorization = `Bearer ${token}`;
      }
    }

    request = request.clone({ setHeaders: headersConfig });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.modalRepository.showToast('danger', error.message, 'Basic');
        return throwError(() => error);
      })
    );
  }
}
