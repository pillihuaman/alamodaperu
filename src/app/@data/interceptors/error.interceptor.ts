
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { NbComponentStatus } from '@nebular/theme';
import { Injectable, NgZone } from '@angular/core';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private modalService: ModalService, private ngZone: NgZone) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const nbComponentStatus: NbComponentStatus = 'danger';
        debugger
        if (error.status === 401 || error.status === 403) {
          // 🛑 Unauthorized / Forbidden - Redirect to Login
          this.modalService.showToast(nbComponentStatus, 'Session expired. Please log in again.', '');
          this.ngZone.run(() => {
            this.router.navigate(['/auth/login']);
          });
        } else if (error.status === 500) {
          this.modalService.showToast(nbComponentStatus, 'Internal Server Error', '');
        } else if (error.status === 404) {
          this.modalService.showToast(nbComponentStatus, 'Resource Not Found', '');
        } else if (error.status === 0) {
          // ✅ Handle ERR_CONNECTION_REFUSED (Backend is Down)
          this.modalService.showToast(nbComponentStatus, 'Server Unavailable. Redirecting to Login...', '');
          this.ngZone.run(() => {
            this.router.navigate(['/auth/login']);
          });
        }

        return throwError(() => error);
      })
    );
  }
}
