import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbSidebarService } from '@nebular/theme';
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
    CommonModule, NbButtonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet
  ]
})
export class HomeComponent {

}



