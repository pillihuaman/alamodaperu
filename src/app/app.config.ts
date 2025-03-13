import { ApplicationConfig, importProvidersFrom, inject, LOCALE_ID, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NbThemeModule, NbLayoutModule, NbToastrModule, NbDialogModule, NbSidebarModule, NbMenuModule, NbWindowModule, NbOverlayModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicAuthInterceptor, ErrorInterceptor } from './@data/interceptors';
import { MyHttpInterceptor } from './@data/interceptors/request.interceptor';
import { ApiService } from './@data/services/api.service';
import { DataService } from './@data/services/data.service';
import { SpinnerService } from './@data/services/spinner.service';
import { routes } from './app.routes';
import { AuthenticationService } from './@data/services/authentication.service';
import { AuthenticationRepository } from './@domain/repository/repository/authentication.repository';
import { ModalService } from './@data/services/modal.service';
import { UserService } from './@data/services/user.service';
import { UserRepository } from './@domain/repository/repository/user.repository';
import { Const } from './utils/const';
import { ModalRepository } from './@domain/repository/repository/modal.repository ';

export function initConfig(constService: Const) {
  return () =>
    Promise.all([constService.loadCommonConfig(), constService.loadEntidadConfig()])
      .catch(error => {
        console.error("Error en APP_INITIALIZER:", error);
        return [];
      });
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    
    provideHttpClient(withFetch(), withInterceptorsFromDi()), // ✅ Fix: No manual interceptor injection

    importProvidersFrom(
      NbOverlayModule, // ✅ Move to the top to ensure `_NbOverlayService` is available
      CommonModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatInputModule,
      MatTableModule,
      MatDialogModule,
      MatDatepickerModule,
      MatNativeDateModule,
      NbThemeModule.forRoot({ name: 'default' }),
      NbLayoutModule,
      NbEvaIconsModule,
      NbSidebarModule.forRoot(),
      NbDialogModule.forRoot(),
      NbMenuModule.forRoot(),
      NbWindowModule.forRoot(),
      NbToastrModule.forRoot(),
    ),

    provideAppInitializer(
      () => inject(Const).loadCommonConfig(),
    ),

    // ✅ Fix: HTTP Interceptors (Ensure No Circular Dependency)
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },

    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }, 
    { provide: LOCALE_ID, useValue: 'es-PE' },

    { provide: AuthenticationRepository, useClass: AuthenticationService },
    { provide: ModalRepository, useClass: ModalService },
    { provide: UserRepository, useClass: UserService },

    Const,
    ApiService,
    DataService,
    SpinnerService,
  ],
};
