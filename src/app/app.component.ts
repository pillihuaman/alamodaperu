
import { RouterOutlet } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbThemeService, NbSidebarService, NbDatepickerModule } from '@nebular/theme';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NbSidebarService,NbThemeService,RouterOutlet]
})
export class AppComponent {
  constructor(  private sidebarService: NbSidebarService,
    private nbthemeservice: NbThemeService) {

    
  }
  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout() {

    this.sidebarService.collapse('menu-barapp');
  }
}