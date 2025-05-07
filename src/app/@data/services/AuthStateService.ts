// src/app/@data/services/auth-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private loggedIn = new BehaviorSubject<boolean>(false); // valor inicial false
  isLoggedIn$ = this.loggedIn.asObservable();

  setLoginState(state: boolean): void {
    this.loggedIn.next(state);
  }


logout(): void {
  
  this.setLoginState(false);
  localStorage.removeItem('token');
}

}
