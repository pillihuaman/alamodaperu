import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDialogRef, NbComponentStatus, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbSidebarModule, NbDatepickerModule, NbTimepickerModule, NbMediaBreakpointsService, NbDateTimePickerComponent } from '@nebular/theme';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../@domain/repository/repository/support.repository';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { AppModalHeaderComponent } from '../../../@common-components/app-modal-header/app-modal-header.component';
import { AppModalFooterComponent } from '../../../@common-components/app-modal-footer/app-modal-footer.component';

@Component({
  selector: 'app-employee-detail',
  imports: [
    CommonModule,
    RouterModule,
        NbButtonModule,
    NbSidebarModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    ReactiveFormsModule,
    FormsModule ,AppModalHeaderComponent,AppModalFooterComponent,
    NbDatepickerModule, // ✅ Importa el Datepicker
    NbTimepickerModule, // ✅ Si usas timepicker, agrégalo aquí
  ],
   standalone: true,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
  export class EmployeeDetailComponent implements OnInit {
    @Input() employeRequestForm!: FormGroup;

  
    constructor(
      private breakpointService: NbMediaBreakpointsService,
      private fb: FormBuilder,
      private spinnerService: SpinnerService,
      private datePipe: DatePipe,
      private supportService: SupportRepository,
      private modalRepository: ModalRepository,
      @Optional() protected dialogRef: NbDialogRef<EmployeeDetailComponent>
    ) {}
  
    ngOnInit(): void {
      this.buildForm();
      window.addEventListener('keydown', this.handleEscKey.bind(this));
    }

  
    buildForm() {
      this.employeRequestForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        lastName: [''],
        startDate: [''],
        finishDate: [''],
        document: ['', Validators.required],
        typeDocument: [''],
        salaryHours: [''],
        idToFind: [''],
        nameToFind: [''],
        lastNameToFind: [''],
        documentToFind: [''],
      });
    }
  
    onSubmit() {
      const startDateFormatted = this.datePipe.transform(this.employeRequestForm.value.startDate, 'dd/MM/yyyy HH:mm:ss');
      const finishDateFormatted = this.datePipe.transform(this.employeRequestForm.value.finishDate, 'dd/MM/yyyy HH:mm:ss');
      const formValues = {
        ...this.employeRequestForm.value,
        startDate: startDateFormatted,
        finishDate: finishDateFormatted
      };
  
      this.spinnerService.show();
      this.supportService.saveEmployee(formValues).subscribe(
        () => {
          let nbComponentStatus: NbComponentStatus = 'success';
          this.modalRepository.showToast(nbComponentStatus, 'Save Success', 'Success');
          this.employeRequestForm.reset();
          window.location.reload();
          this.closeDialog();
        },
        (error) => {
          if ((error.status === 422 || error.status === 500) && error.error?.data?.payload) {
            error.error.data.payload.forEach((errorItem: any) => {
              const controlName = errorItem.propertyPath;
              const errorMesagge = errorItem.valExceptionDescription;
              this.employeRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
            });
          }
          this.spinnerService.hide();
        }
      );
    }
  
    closeDialog() {
      this.employeRequestForm.reset();
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    }
  
    handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.closeDialog();
      }
    }
  }