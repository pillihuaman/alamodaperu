import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { MenuItem } from '../../../../@data/model/system/MenuItem';
import { Page } from '../../../../@data/model/system/Page';
import { System } from '../../../../@data/model/system/System';
import { SystemService } from '../../../../@data/services/system.service';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';

@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    ReactiveFormsModule,
    FormsModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
    
  ],
  templateUrl: './menu-detail.component.html',
  styleUrl: './menu-detail.component.scss'
})
export class MenuDetailComponent extends BaseImplementation<any> implements OnInit {
  menuForm!: FormGroup;
  systems: System[] = [];
  pages: Page[] = [];
  parentMenus: MenuItem[] = [];

  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,    modalRepository: ModalRepository, private router: Router,
        spinnerService: SpinnerService,
  ) {
    super(modalRepository, spinnerService);
  }

  ngOnInit(): void {
    this.menuForm = this.fb.group({
      id: [''],
      title: [''],
      icon: [''],
      url: [''],
      order: [],
      parentId: [''],
      systemId: [''],
      pageId: [''],
      status: [true],
    });

    this.loadDropdownData();
  }

  loadDropdownData(): void {
    this.systemService.findSystems().subscribe(res => this.systems = res.payload);
    this.systemService.findPages().subscribe(res => this.pages = res.payload);
    this.systemService.findMenus().subscribe(res => this.parentMenus = res.payload);
  }

  saveMenu(): void {
    const menu: MenuItem = this.menuForm.value;
    this.systemService.saveMenuItem(menu).subscribe((res) => {
      console.log('Menu saved:', res);
    });
  }

  deleteMenu(): void {
    const id = this.menuForm.get('id')?.value;
    if (id) {
      this.systemService.deleteMenu(id).subscribe(() => {
        console.log('Menu deleted:', id);
        this.menuForm.reset();
      });
    }
  }
  returnMenu(){
    this.router.navigate(['/support/system']); 
  }
}