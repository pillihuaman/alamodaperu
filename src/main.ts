import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
registerLocaleData(localeEsPe, 'es-PE');
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
