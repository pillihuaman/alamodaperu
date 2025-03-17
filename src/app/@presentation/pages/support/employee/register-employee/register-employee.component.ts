import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDialogRef } from '@nebular/theme';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { SupportRepository } from '../../../../../@domain/repository/repository/support.repository';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbButtonModule, NbSidebarModule, NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';

@Component({
  selector: 'app-register-employee',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbSidebarModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent implements OnInit {
  @Input() employeRequestForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private datePipe: DatePipe,
    private supportService: SupportRepository,
    private modalRepository: ModalRepository,
    @Optional() protected dialogRef: NbDialogRef<RegisterEmployeeComponent>
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
