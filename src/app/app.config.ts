import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, LOCALE_ID, ModuleWithProviders, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbDialogModule, NbToastrModule, NbDatepickerModule, NbTreeGridModule, NbIconModule, NbDialogConfig, NbThemeModule } from '@nebular/theme';
const nebularProviders = NbThemeModule.forRoot({ name: 'dark' }).providers || [];
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
   // provideHttpClient(
      // registering interceptors
      //withInterceptors([MyHttpInterceptorInterceptor,ErrorInterceptorInterceptor]) 
    //),
    provideAnimationsAsync(),
    nebularProviders,
    importProvidersFrom(
      NbLayoutModule,
      NbSidebarModule,
      NbButtonModule,
      NbEvaIconsModule,
      NbDialogModule.forRoot(),
      NbToastrModule.forRoot(),
      NbDatepickerModule.forRoot(), // Add this line
      NbTreeGridModule,NbEvaIconsModule,NbIconModule
      
    
    ),
  /*  Const,
    { provide: UserRepository, useClass: UserService },
    { provide: AuthenticationRepository, useClass: AuthenticationService },
    { provide: ModalRepository, useClass: ModalService },
    { provide: ChatRepository, useClass: ChatService },
    { provide: SupportRepository, useClass: SupportService },
    { provide: LocalRepository, useClass: LocaleService },
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [Const], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }, // Esto puede ser cambiado dinámicamente
    { provide: LOCALE_ID, useValue: 'es-PE' },
    ApiService,
    {
      provide: NbDialogConfig,
      useValue: {
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        closeOnBackdropClick: true,
        closeOnEsc: true,
      },
    },*/ 
      provideClientHydration(withEventReplay()),
    
    
    
    ]
};

/*
{
  providers: [
    provideRouter(routes),
    provideHttpClient(
      // registering interceptors
      withInterceptors([MyHttpInterceptorInterceptor,ErrorInterceptorInterceptor]) 
    ),
    provideAnimationsAsync(),
    nebularProviders,
    importProvidersFrom(
      NbLayoutModule,
      NbSidebarModule,
      NbButtonModule,
      NbEvaIconsModule,
      NbDialogModule.forRoot(),
      NbToastrModule.forRoot(),
      NbDatepickerModule.forRoot(), // Add this line
      MatDatepickerModule,
      MatNativeDateModule, // Necesario para el soporte nativo de fechas
      MatInputModule,
      NbTreeGridModule,NbEvaIconsModule,NbIconModule,MatIconModule,
      
      

    ),
    Const,
    { provide: UserRepository, useClass: UserService },
    { provide: AuthenticationRepository, useClass: AuthenticationService },
    { provide: ModalRepository, useClass: ModalService },
    { provide: ChatRepository, useClass: ChatService },
    { provide: SupportRepository, useClass: SupportService },
    { provide: LocalRepository, useClass: LocaleService },
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [Const], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }, // Esto puede ser cambiado dinámicamente
    { provide: LOCALE_ID, useValue: 'es-PE' },
    ApiService,
    {
      provide: NbDialogConfig,
      useValue: {
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        closeOnBackdropClick: true,
        closeOnEsc: true,
      },
    }, provideAnimationsAsync(), provideAnimationsAsync(),
  ],
});*/