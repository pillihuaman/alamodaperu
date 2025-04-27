import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbButtonModule, NbCardModule, NbInputModule,  NbSidebarService } from '@nebular/theme';
import { Observable, Subscription, timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { SupportService } from '../../../../@data/services/support.service';
import { AuthenticationRepository } from '../../../../@domain/repository/repository/authentication.repository';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { User } from '../../../../@data/model/User/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NebularSharedModule, FormsModule
  ]

})
export class LoginComponent implements OnInit {
  nombreEmpresa = 'Pillihuman Corporation app';
  estado: boolean = true;
  cantidadUsuario: number = 3;
  everySecond$: Observable<number> = timer(0, 100);
  appName: string = 'AlamodaPeru.com';
  logging: boolean = false;
  hasError: boolean | undefined;
  private unsubscribe: Subscription[] = [];
  returnUrl: string = '/home';
  loginForm: FormGroup;

  constructor(
    private sidebarService: NbSidebarService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationRepository,
    private router: Router,
    private supportService: SupportService,
    private modalRepository: ModalRepository
  ) {
    // Inicialización de loginForm en el constructor
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['pillihuamanhz@gmail.com', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: ['1988deza', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
    });

  }

  submit() {
    try {
      this.hasError = false;
      const loginSubscr = this.authService
        .login(this.f['user'].value, this.f['password'].value)
        .pipe(first())
        .subscribe((user: User) => {
          if (user) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.hasError = true;
          }
        });

      this.unsubscribe.push(loginSubscr);
    } catch (e) {
      console.error('An error occurred:', e);
      throw e;
    }
  }
}
