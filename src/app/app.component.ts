
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'serv-pillihuaman-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  imports: [CommonModule, RouterModule, CommonModule, NbDialogModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbLayoutModule, FormsModule,
    NbButtonModule, NbSidebarModule, NebularSharedModule, NbIconModule] // ✅ Importa CommonModule y RouterModule
})
export class AppComponent implements OnInit {
  isSearchVisible = false;
  searchQuery: string = '';
  themes = ['default', 'cosmic', 'corporate', 'dark'];
  selectedTheme = 'default';
  menuTree: NbMenuItem[] = [];
  constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private nbThemeService: NbThemeService, private http: HttpClient, private cdRef: ChangeDetectorRef,
    private systemService: SystemService

  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Current Route:', event.url);
      }
    });
    console.log('init page component');
    this.loadSystemsMenu();

  }
  ngOnInit(): void {
    console.log('init page compone')
  }
  loadSystemsMenu(): void {
    this.systemService.findSystemMenuTree().subscribe(
      (response: ResponseBody) => {
        console.log('MenuTree cargado:', response.payload);
        debugger
        // Mapear correctamente aquí
        this.menuTree = mapToNbMenuItems(response.payload);
        console.log('        this.menuTree',         this.menuTree);
      },
      (error) => {
        console.error('Error al cargar el menú:', error);
      }
    );

    
  }


  changeTheme(theme: string) {
    this.selectedTheme = theme;
    this.nbThemeService.changeTheme(theme);
  }
  toggleSearch() {

    this.isSearchVisible = !this.isSearchVisible;
    console.log('isSearchVisible:', this.isSearchVisible);
    this.cdRef.detectChanges(); // ✅ Force UI update
  }

  onFind() {
    this.isSearchVisible = true;
    console.log('isSearchVisible:', this.isSearchVisible);
    this.cdRef.detectChanges(); // ✅ Force UI update
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);

    if (this.searchQuery.trim()) {
      const apiUrl = `https://tu-api.com/search?query=${this.searchQuery}`;

      this.http.get(apiUrl).subscribe(
        (response) => {
          console.log('Resultados:', response);
        },
        (error) => {
          console.error('Error en la búsqueda:', error);
        }
      );
    }
  }
  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout(): void {
    this.sidebarService.collapse('menu-barapp');
  }
  goHome() {
    this.router.navigate(['/support/employee']);

  }



  onLogin() {
    this.router.navigate(['/auth/login']);
  }


  
}
function mapToNbMenuItems(items: RespMenuTree[]): NbMenuItem[] {
  return items.map(item => {
    const children: NbMenuItem[] = [];

    // Procesamos los hijos de la sección si existen
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        debugger
        // Usamos solo el 'link' proporcionado en el item
        children.push({
          title: child.title,
          icon: child.icon ?? 'file-text-outline',
          link: child.link, // Usamos el link ya definido para el hijo
        });

        // Si el hijo tiene subhijos, procesarlos recursivamente
        if (child.children && child.children.length > 0) {
          const grandChildren = mapToNbMenuItems(child.children);
          children[children.length - 1].children = grandChildren.length > 0 ? grandChildren : undefined;
        }
      }
    }

    // Si el 'link' del padre es null, asignamos un valor predeterminado basado en el 'title'
    const parentLink = item.link ? item.link : `/support/${item.title.toLowerCase()}`;

    return {
      title: item.title,
      icon: item.icon ?? 'folder-outline',
      link: parentLink, // Usamos el link del padre o el valor predeterminado
      expanded: item.expanded ?? true,
      children: children.length > 0 ? children : undefined,
    };
  });
}
