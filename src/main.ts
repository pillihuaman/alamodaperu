import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { NbDatepickerModule, NbOverlayContainer, NbOverlayContainerAdapter, NbTimepickerModule } from '@nebular/theme';
registerLocaleData(localeEsPe, 'es-PE');

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // 🔹 Mantiene los providers existentes
    { provide: NbOverlayContainer, useClass: NbOverlayContainerAdapter }, // ✅ Forzar inicialización de Nebular Overlay
      NbDatepickerModule,
   
  ],
})
  .catch(err => console.error(err));
