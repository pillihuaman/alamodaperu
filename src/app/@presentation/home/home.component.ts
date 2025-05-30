import { CommonModule } from '@angular/common';
import {  Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';
import { NebularSharedModule } from '../../@domain/nebular-shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
   CommonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbButtonModule,NebularSharedModule, NbButtonModule,    NbLayoutModule,
  ]
})
export class HomeComponent {

}



