import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../../@common-components/table-datasource/table-datasource.component';
import { ReqSupplier } from '../../../../../@data/model/supplier/req-supplier.model';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { SupplierRepository } from '../../../../../@domain/repository/repository/supplier.repository';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';

@Component({
  selector: 'app-detail-supplier',
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
  templateUrl: './detail-supplier.component.html',
  styleUrl: './detail-supplier.component.scss'
})
export class DetailSupplierComponent extends BaseImplementation<any> implements OnInit {
  supplierForm!: FormGroup;

  constructor(
    modalRepository: ModalRepository,
    spinnerService: SpinnerService,
    private fb: FormBuilder,
    private supplierRepository: SupplierRepository,
    private router: Router
  ) {
    super(modalRepository, spinnerService);
  }

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      id: [''],
      name: [''],
      ruc: [''],
      address: [''],
      phone: [''],
      email: [''],
      status: [true],
      contacts: this.fb.array([])
    });
  }

  get contacts(): FormArray {
    return this.supplierForm.get('contacts') as FormArray;
  }

  addContact(): void {
    const contactForm = this.fb.group({
      name: [''],
      phone: [''],
      email: ['']
    });
    this.contacts.push(contactForm);
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  saveSupplier(): void {
    const supplier: ReqSupplier = {
      ...this.supplierForm.value
    };
    this.supplierRepository.saveSupplier(supplier).subscribe((res) => {
      console.log('Supplier saved:', res);
    });
  }

  deleteSupplier(): void {
    const id = this.supplierForm.get('id')?.value;
    if (id) {
      this.supplierRepository.deleteSupplier(id).subscribe(() => {
        console.log('Supplier deleted:', id);
        this.supplierForm.reset();
      });
    }
  }

  returnToList(): void {
    this.router.navigate(['/support/supplier']);
  }
}
