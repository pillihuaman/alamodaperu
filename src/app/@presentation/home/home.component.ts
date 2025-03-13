import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbLayoutModule, NbSidebarModule, NbSidebarService } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { NebularSharedModule } from '../../@domain/nebular-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbLayoutModule,
    NbButtonModule,NbSidebarModule,NbLayoutModule,NebularSharedModule,ReactiveFormsModule 
  ]
})
export class HomeComponent {
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



