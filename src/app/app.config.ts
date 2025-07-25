import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject, LOCALE_ID, PLATFORM_ID, provideAppInitializer } from '@angular/core';
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
import { NbThemeModule, NbLayoutModule, NbToastrModule, NbDialogModule, NbSidebarModule, NbMenuModule, NbWindowModule, NbOverlayModule, NbOverlayContainer, NbOverlayContainerAdapter, NbDialogService, NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
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
import { SupportRepository } from './@domain/repository/repository/support.repository';
import { SupportService } from './@data/services/support.service';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { SupplierService } from './@data/services/supplier.service';
import { SupplierRepository } from './@domain/repository/repository/supplier.repository';
import { CommonRepository } from './@domain/repository/repository/common.repository';
import { CommonService } from './@data/services/common.service';
import { ProductViewImagenRepository } from './@domain/repository/repository/product-view-imagen-repository';
import { ProductViewImagenService } from './@data/services/product-view-imagen.service';
import { FileRepository } from './@domain/repository/repository/file.repository';
import { FileService } from './@data/services/file.service';
import { ProductRepository } from './@domain/repository/repository/ProductRepository';
import { ProductService } from './@data/services/ProductService';
import { TenantInterceptor } from './@data/interceptors/TenantInterceptor';
import { DebugInterceptor } from './@data/interceptors/DebugInterceptor';
import { initApp } from './@data/interceptors/app.init';
import { QuotationService } from './@data/services/quotation.service';
import { QuotationRepository } from './@domain/repository/repository/quotation.repository';

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

    { provide: NbOverlayContainer, useClass: NbOverlayContainerAdapter }, // ✅ FIX
    provideHttpClient(withFetch(), withInterceptorsFromDi()), // ✅ Fix: No manual interceptor injection

    importProvidersFrom(
      NbOverlayModule, // ✅ Move to the top to ensure `_NbOverlayService` is available
      NbLayoutModule,
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
      NbThemeModule.forRoot({ name: 'corporate' }),
      NbEvaIconsModule,
      NbSidebarModule.forRoot(),
      NbDialogModule.forRoot(),
      NbMenuModule.forRoot(),
      NbWindowModule.forRoot(),
      NbToastrModule.forRoot(), NbDatepickerModule.forRoot(), // ✅ Ya agregado
      NbTimepickerModule.forRoot(), NbMomentDateModule, NbDateFnsDateModule
    ),

    provideAppInitializer(
      () => inject(Const).loadCommonConfig(),
    ),

    // ✅ Fix: HTTP Interceptors (Ensure No Circular Dependency)
        { provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DebugInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: LOCALE_ID, useValue: 'es-PE' },

    { provide: AuthenticationRepository, useClass: AuthenticationService },
    { provide: ModalRepository, useClass: ModalService },
    { provide: UserRepository, useClass: UserService },
    { provide: SupportRepository, useClass: SupportService },
    { provide: SupplierRepository, useClass: SupplierService },
    { provide: CommonRepository, useClass: CommonService },
    { provide: ProductViewImagenRepository, useClass: ProductViewImagenService },
    { provide: FileRepository, useClass: FileService },
    { provide: ProductRepository, useClass: ProductService },
    { provide: QuotationRepository, useClass: QuotationService },

    Const,
    ApiService,
    DataService,
    SpinnerService, NbDialogService,

  ],
};
