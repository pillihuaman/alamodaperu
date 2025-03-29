import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDialogRef, NbComponentStatus, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbSidebarModule, NbDatepickerModule, NbTimepickerModule, NbMediaBreakpointsService } from '@nebular/theme';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../@domain/repository/repository/support.repository';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { AppModalHeaderComponent } from '../../../@common-components/app-modal-header/app-modal-header.component';
import { AppModalFooterComponent } from '../../../@common-components/app-modal-footer/app-modal-footer.component';
import { EmployeeResponse } from '../../../../@data/model/employee/employeeResponse';
import { Utils } from '../../../../utils/utils';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { parse } from 'date-fns';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
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
    FormsModule,
    AppModalHeaderComponent,
    AppModalFooterComponent,
    NbDatepickerModule,
    NbTimepickerModule,NbMomentDateModule,NbDateFnsDateModule
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employeRequestForm!: FormGroup;
  @Input() employeeData!: EmployeeResponse;
  @Output() employeeUpdated = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private datePipe: DatePipe,
    private supportService: SupportRepository,
    private modalRepository: ModalRepository,
    @Optional() protected dialogRef: NbDialogRef<EmployeeDetailComponent>
  ) {}

  ngOnInit(): void {

    this.buildForm();
    if (this.employeeData) {
      this.patchFormValues();
    }
    window.addEventListener('keydown', this.handleEscKey.bind(this));
  }
  

  patchFormValues(): void {
    this.employeRequestForm.patchValue({
      id: this.employeeData.id || '',
      name: this.employeeData.name || '',
      lastName: this.employeeData.lastName || '',
      startDate: this.employeeData.startDate ? parse(this.employeeData.startDate+'', 'dd/MM/yyyy', new Date()) : null,
      finishDate: this.employeeData.finishDate ? parse(this.employeeData.finishDate+'', 'dd/MM/yyyy', new Date()) : null,  
      typeDocument: this.employeeData.typeDocument || '',
      document: this.employeeData.document || '',
      salaryHours: this.employeeData.salaryHours || '',
    });
    console.log("Form Values:", this.employeRequestForm.value);

  }
  

  buildForm() {
    this.employeRequestForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: [''],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
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
    const startDateFormatted = this.datePipe.transform(this.employeRequestForm.value.startDate, 'dd/MM/yyyy') || '';
    const finishDateFormatted = this.datePipe.transform(this.employeRequestForm.value.finishDate, 'dd/MM/yyyy') || '';
  
    const formValues = {
      ...this.employeRequestForm.value,
      startDate: startDateFormatted,
      finishDate: finishDateFormatted
    };
  
    this.spinnerService.show();
    this.supportService.saveEmployee(formValues).subscribe({
      next: () => {
        debugger

        let nbComponentStatus: NbComponentStatus = 'success';
        this.modalRepository.showToast(nbComponentStatus, 'Save Success', 'Success');
        this.employeRequestForm.reset();
        this.spinnerService.hide(); // ✅ Close modal and pass 'true' to indicate data change
        if (this.dialogRef) {
          this.employeeUpdated.emit(formValues); // Emitir evento
          this.dialogRef.close(formValues);
              this.spinnerService.show();
        }
        //this.closeDialog();
 

      },
      error: (error) => {
        if ((error.status === 422 || error.status === 500) && error.error?.data?.payload) {
          error.error.data.payload.forEach((errorItem: any) => {
            const controlName = errorItem.propertyPath;
            const errorMessage = errorItem.valExceptionDescription;
            this.employeRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMessage });
          });
        }
        this.spinnerService.hide();
      }
      
    });
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
