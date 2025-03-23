import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbDialogModule, NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogService, NbLayoutModule } from '@nebular/theme';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { ModalService } from '../../../../@data/services/modal.service';
@Component({
  selector: 'app-employee',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      NbButtonModule,
      NbCardModule,
      NbInputModule,
      NbIconModule,
      FormsModule,    //✅ REQUIRED TO FIX LAYOUT ERROR
      NbDialogModule,      NbLayoutModule,
      ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent { 
  constructor(private dialogService: NbDialogService,private modalService: ModalService) {}

  openEmployeeDetail(): void {
    debugger
    this.modalService.openModal(EmployeeDetailComponent, { name: 'John Doe' });

    /*this.dialogService.open(ModalContainerComponent, {
      context: { 
        componentType: EmployeeDetailComponent, // ✅ Correctly pass componentType
      },
      closeOnBackdropClick: false,
      hasBackdrop: true,
    });*/
  }
}



