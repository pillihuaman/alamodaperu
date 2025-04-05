import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDialogRef, NbComponentStatus, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbDatepickerModule, NbTimepickerModule, NbDialogService } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { parse } from 'date-fns';
import { RouterModule } from '@angular/router';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { SupportRepository } from '../../../../../@domain/repository/repository/support.repository';
import { AppModalFooterComponent } from '../../../../@common-components/app-modal-footer/app-modal-footer.component';
import { AppModalHeaderComponent } from '../../../../@common-components/app-modal-header/app-modal-header.component';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { RespProduct } from '../../../../../@data/model/product/RespProduct';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { ProductService } from '../../../../../@data/services/ProductService';
import { BarcodeReaderWriterComponent } from '../../../../@common-components/barCode/barcode-reader-writer.component';

@Component({
  selector: 'app-detail-product',
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
    AppModalHeaderComponent,
    AppModalFooterComponent,
    NbDatepickerModule,
    NbTimepickerModule,
    NbMomentDateModule,
    NbDateFnsDateModule,BarcodeReaderWriterComponent
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent extends BaseImplementation<RespProduct> implements OnInit {
  constructor(
    private fb: FormBuilder,
    spinnerService: SpinnerService,
    private datePipe: DatePipe,
   private productService: ProductService,
    modalRepository: ModalRepository,
    override dialogRef: NbDialogRef<DetailProductComponent>,
    dialogService: NbDialogService,
  ) {
    super(dialogService, modalRepository, spinnerService);
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.entityData) {
      this.patchFormValues();
    }
    window.addEventListener('keydown', this.handleEscKey.bind(this));
  }

  patchFormValues(): void {
    this.formData.patchValue({
      id: this.entityData.id || '',
      name: this.entityData.name || '',
      category: this.entityData.category || '',
      price: this.entityData.price || '',
      stock: this.entityData.stock || '',
      barcode: this.entityData.barcode || '',
      
      //manufactureDate: this.entityData.manufactureDate ? parse(this.entityData.manufactureDate+'', 'dd/MM/yyyy', new Date()) : null,
      //expiryDate: this.entityData.expiryDate ? parse(this.entityData.expiryDate+'', 'dd/MM/yyyy', new Date()) : null,
    });
    console.log('Form Values:', this.formData.value);
  }

  buildForm() {
    this.formData = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      barcode: [''],
      //manufactureDate: ['', Validators.required],
      //expiryDate: ['', Validators.required]
    });
  }

  onSubmit() {
    // const manufactureDateFormatted = this.datePipe.transform(this.formData.value.manufactureDate, 'dd/MM/yyyy') || '';
    // const expiryDateFormatted = this.datePipe.transform(this.formData.value.expiryDate, 'dd/MM/yyyy') || '';

    const formValues = {
      ...this.formData.value,
      // manufactureDate: manufactureDateFormatted,
      // expiryDate: expiryDateFormatted
    };
    this.spinnerService.show();
    this.productService.saveProduct(formValues).subscribe({
      next: () => this.handleSuccessResponseSaveOrUpdate(formValues),
      error: (error) => this.handleErrorResponseSaveOrUpdate(error)
    });
  }
  onBarcodeScanned(barcode: string) {
    // Update the form's barcode field with the scanned barcode value
    this.formData.patchValue({ barcode });
  }
}
