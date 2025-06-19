
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbThemeService, NbSidebarService, NbDatepickerModule, NbDialogModule, NbMenuItem, NbIconModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NebularSharedModule } from './@domain/nebular-shared.module';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SystemService } from './@data/services/system.service';
import { System } from './@data/model/system/System';
import { RespMenuTree } from './@data/model/system/RespMenuTree';
import { ResponseBody } from './@data/model/general/responseBody';
import { Utils } from './utils/utils';
import { AuthStateService } from './@data/services/AuthStateService';

import { AuthenticationService } from './@data/services/authentication.service';
import { AuthenticationRepository } from './@domain/repository/repository/authentication.repository';
import { AppModalFooterComponent } from './@presentation/@common-components/app-modal-footer/app-modal-footer.component';
import { ServPillihuamanFooterHomeComponent } from './@presentation/@common-components/serv-pillihuaman-footer-home/serv-pillihuaman-footer-home.component';
@Component({
  selector: 'serv-pillihuaman-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  imports: [CommonModule, RouterModule, CommonModule, NbDialogModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbLayoutModule, FormsModule,
    NbButtonModule, NbSidebarModule, NebularSharedModule, NbIconModule,ServPillihuamanFooterHomeComponent] // ✅ Importa CommonModule y RouterModule
})
export class AppComponent implements OnInit {
  isSearchVisible = false;
  searchQuery: string = '';
  themes = ['default', 'cosmic', 'corporate', 'dark'];
  selectedTheme = 'default';
  showMenu: boolean = false;
  menuTree: NbMenuItem[] = [];
    private isMenuLoaded = false;
  private authenticationService = inject(AuthenticationService);
 constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private nbThemeService: NbThemeService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private systemService: SystemService,
    private authStateService: AuthStateService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.authStateService.isLoggedIn$.subscribe(loggedIn => {
          this.showMenu = loggedIn;

          if (loggedIn && !this.isMenuLoaded) {
            this.loadSystemsMenu();
            this.isMenuLoaded = true;
          }

          this.cdRef.detectChanges();
        });
      }
    });
  }

  ngOnInit(): void {
    console.log('✅ AppComponent inicializado');
  }

  loadSystemsMenu(): void {
    this.systemService.findSystemMenuTree().subscribe({
      next: (response: ResponseBody) => {
        this.menuTree = mapToNbMenuItems(response.payload);
        console.log('✅ Menú cargado:', this.menuTree);
      },
      error: error => {
        console.error('❌ Error al cargar el menú:', error);
      },
    });
  }

  changeTheme(theme: string): void {
    this.selectedTheme = theme;
    this.nbThemeService.changeTheme(theme);
  }

  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
    this.cdRef.detectChanges();
  }

  onFind(): void {
    this.isSearchVisible = true;
    this.cdRef.detectChanges();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      const apiUrl = `https://tu-api.com/search?query=${this.searchQuery}`;
      this.http.get(apiUrl).subscribe({
        next: response => console.log('🔍 Resultados:', response),
        error: err => console.error('❌ Error en búsqueda:', err),
      });
    }
  }

  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout(): void {
    this.sidebarService.collapse('menu-barapp');
  }

  goHome(): void {
    this.router.navigate(['/support/employee']);
  }

  onLogout(): void {
    this.authenticationService.logout();
    this.authStateService.logout();
    this.isMenuLoaded = false;
    window.location.reload();
  }

  onLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

// Helper para mapear el menú del backend a NbMenuItem[]
function mapToNbMenuItems(items: RespMenuTree[]): NbMenuItem[] {
  return items.map(item => {
    const children: NbMenuItem[] = [];

    if (item.children?.length) {
      item.children.forEach(child => {
        const grandChildren = child.children?.length ? mapToNbMenuItems(child.children) : undefined;
        children.push({
          title: child.title,
          icon: child.icon ?? 'file-text-outline',
          link: child.link,
          children: grandChildren,
        });
      });
    }

    const parentLink = item.link ? item.link : `/support/${item.title.toLowerCase()}`;

    return {
      title: item.title,
      icon: item.icon ?? 'folder-outline',
      link: parentLink,
      expanded: item.expanded ?? true,
      children: children.length > 0 ? children : undefined,
    };
  });
}