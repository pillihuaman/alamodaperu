
import { RouterModule, RouterOutlet } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewEncapsulation } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbThemeService, NbSidebarService, NbDatepickerModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { Observable, timer } from 'rxjs';
import { Control } from './@data/model/general/control';
import { User } from './@domain/repository/models/user';
import { NebularSharedModule } from './@domain/nebular-shared.module';
@Component({
  selector: 'serv-pillihuaman-app',
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  imports: [CommonModule, RouterModule,NbSidebarModule,    CommonModule,
      RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
      NbLayoutModule,
      NbButtonModule,NbSidebarModule,NbLayoutModule,NebularSharedModule] // ✅ Importa CommonModule y RouterModule
})
export class AppComponent implements OnInit {
  nombreEmpresa = 'Pillihuman Corporation app';
  estado: boolean = true;
  cantidadUsuario: number = 3;
  user: User | undefined;
  listaUsuario: Array<User> = [];
  lstControlVariable?: Control[];
  everySecond$: Observable<number> = timer(0, 100);

  constructor(
    private sidebarService: NbSidebarService,
    private nbthemeservice: NbThemeService
  ) {}

  ngOnInit() {
      console.log('✅ AppComponent Loaded');
    this.nombreEmpresa = 'Gamachicas.com';
    this.user = {
      name: 'zarmir',
      lastName: 'pillihuaman',
      code: 1,
      estatus: false,
      password: '',
      numTypeDocument: '46178209',
    };
    this.listaUsuario.push(this.user);
    console.log(this.listaUsuario);
    if (this.cantidadUsuario !== 1) {
      this.estado = false;
    }
    console.log('✅ AppComponent Loaded');
  }

  toggle(): boolean {
    this.sidebarService.toggle(true, 'mevsdvasdvu-barapp');
    return false;
  }

  toggleout() {
    this.sidebarService.collapse('menu-barapp');
  }
}
