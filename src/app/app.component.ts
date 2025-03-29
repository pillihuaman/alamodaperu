
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbThemeService, NbSidebarService, NbDatepickerModule, NbDialogModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NebularSharedModule } from './@domain/nebular-shared.module';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'serv-pillihuaman-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  imports: [CommonModule, RouterModule,    CommonModule,NbDialogModule,
      RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
      NbLayoutModule,FormsModule,
      NbButtonModule,NbSidebarModule,NebularSharedModule] // ✅ Importa CommonModule y RouterModule
})
export class AppComponent implements OnInit {
   isSearchVisible = false;
    searchQuery: string = '';
    themes = ['default', 'cosmic', 'corporate', 'dark']; 
    selectedTheme = 'default';
    constructor(
      private router: Router,
      private sidebarService: NbSidebarService,
      private nbThemeService: NbThemeService,private http: HttpClient,private cdRef: ChangeDetectorRef ,
      
    ) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          console.log('Current Route:', event.url);
        }
      });
    }
  ngOnInit(): void {
    console.log('init page compone')
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
  
  
  
  