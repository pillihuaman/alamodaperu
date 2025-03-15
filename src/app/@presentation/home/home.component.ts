import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconComponent, NbIconModule, NbInputModule, NbLayoutModule, NbSidebarModule, NbSidebarService } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { NebularSharedModule } from '../../@domain/nebular-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbLayoutModule,
    NbButtonModule,NbSidebarModule,NbLayoutModule,NebularSharedModule,ReactiveFormsModule ,NbIconModule,FormsModule,   
     ReactiveFormsModule,
        NbCardModule,
        NbInputModule,
  ]
})
export class HomeComponent {
  isSearchVisible = false;
  searchQuery: string = '';
  themes = ['default', 'cosmic', 'corporate', 'dark']; 
  selectedTheme = 'default';
  constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private nbThemeService: NbThemeService,private http: HttpClient,private cdRef: ChangeDetectorRef ,
    
  ) {}
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
    debugger;
    this.isSearchVisible = true;
    console.log('isSearchVisible:', this.isSearchVisible);
    this.cdRef.detectChanges(); // ✅ Force UI update
  }

  onSearch() {
    debugger;
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
    this.router.navigate(['/home']); // Navigate to Home page
  
  }



  onLogin() {
    this.router.navigate(['/auth/login']);
  }
}



