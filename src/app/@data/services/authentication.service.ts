import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { User } from './../../@domain/repository/models/user';
import { ResponseBody } from '../model/general/responseBody';
import { Utils } from '../../utils/utils';
import { Const } from './../../utils/const';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends AuthenticationRepository {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: NbToastrService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);
  
    let storedUser: User | null = null;
    if (this.isBrowser) {
      const userJson = localStorage.getItem('usuario');
      storedUser = userJson ? JSON.parse(userJson) : null;
    }
  
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * ✅ FIX: Now returns `null` instead of throwing an error when no user is logged in.
   */
  public get getCurrentUserValue(): User | null {
    if (!this.currentUserSubject.value && this.isBrowser) {
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        return user;
      }
    }
    return this.currentUserSubject.value;
  }

  /**
   * Logs in the user and stores the session details.
   * @param email User email
   * @param password User password
   */
  login(email: string, password: string): Observable<User> {
    return this.verifyCredentials(email, password).pipe(
      map((response: ResponseBody) => {
        const usuario = response.payload.user as User;
        usuario.access_token = response.payload.accessToken;
        this.currentUserSubject.next(usuario);
        if (this.isBrowser) {
          localStorage.setItem('token', response.payload.accessToken);
        }
        return usuario;
      }),
      catchError((error) => {
        this.toastrService.danger('Login failed', 'Authentication Error');
        return throwError(() => new Error('Login failed'));
      })
    );
  }
  /**
   * Logs out the user and clears the session.
   */
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Validates user credentials by calling the backend.
   * @param email User email
   * @param password User password
   */
  private verifyCredentials(email: string, password: string): Observable<ResponseBody> {
    if (this.isBrowser) {
      localStorage.clear();
    }

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      email,
      password
    });

    const url = `${Const.API_SEGURIDAD}/api/v1/auth/authenticate`;

    return this.http.post<ResponseBody>(url, { email, password }, { headers });
  }

  /**
   * Clears user data.
   */
  clearUser(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
    this.currentUserSubject.next(null);
  }
}
