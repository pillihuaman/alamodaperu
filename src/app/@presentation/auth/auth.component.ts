import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSidebarService, NbThemeService, NbLayoutModule, NbButtonModule, NbSidebarModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../@domain/nebular-shared.module';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbLayoutModule,
    NbButtonModule,NbSidebarModule,NbLayoutModule,NebularSharedModule
  ]
})
export class AuthComponent {
  constructor(
    private sidebarService: NbSidebarService,
    private nbThemeService: NbThemeService
  ) {}

  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout(): void {
    this.sidebarService.collapse('menu-barapp');
  }
}
