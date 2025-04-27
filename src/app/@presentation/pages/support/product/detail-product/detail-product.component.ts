import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbDatepickerModule, NbTimepickerModule, NbDialogService } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
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
    NbDateFnsDateModule
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
  
  ) {
    super( modalRepository, spinnerService);
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.entityData) {
      this.patchFormValues();
    }
    window.addEventListener('keydown', this.handleEscKey.bind(this));
  }

  patchFormValues(): void {
    if (!this.entityData) return;
  
    this.formData.patchValue({
      id: this.entityData.id,
      name: this.entityData.name,
      description: this.entityData.description,
      category: this.entityData.category,
      subcategory: this.entityData.subcategory,
      productCode: this.entityData.productCode,
      barcode: this.entityData.barcode,
      sku: this.entityData.sku,
      upc: this.entityData.upc,
      supplierId: this.entityData.supplierId,
      manufacturer: this.entityData.manufacturer,
      brand: this.entityData.brand,
  
      expirationDate: this.entityData.expirationDate,
      manufacturingDate: this.entityData.manufacturingDate,
  
      costPrice: this.entityData.pricing?.costPrice,
      sellingPrice: this.entityData.pricing?.sellingPrice,
      discount: this.entityData.pricing?.discount,
      currency: this.entityData.pricing?.currency,
  
      unitMeasure: this.entityData.inventory?.unitMeasure,
      minStock: this.entityData.inventory?.minStock,
      maxStock: this.entityData.inventory?.maxStock,
      isFeatured: this.entityData.inventory?.isFeatured,
      isNewArrival: this.entityData.inventory?.isNewArrival,
      batch: this.entityData.inventory?.batch,
      weight: this.entityData.inventory?.weight,
      height: this.entityData.inventory?.height,
      width: this.entityData.inventory?.width,
      length: this.entityData.inventory?.length,
  
      thumbnailUrl: this.entityData.media?.thumbnailUrl,
      seoTitle: this.entityData.media?.seoTitle,
      seoDescription: this.entityData.media?.seoDescription,
      imageUrls: this.entityData.media?.imageUrls?.join(', ') || '',
      tags: this.entityData.media?.tags?.join(', ') || '',
      status: this.entityData.status,
      createdAt: this.entityData.createdAt,
      updatedAt: this.entityData.updatedAt,
      sizes: this.entityData.sizes || []
    });
  
    console.log('Form patched:', this.formData.value);
  }
  

  buildForm() {
    this.formData = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      category: [''],
      subcategory: [''],
      productCode: [''],
      barcode: [''],
      sku: [''],
      upc: [''],
      supplierId: [''],
      manufacturer: [''],
      brand: [''],
  
      expirationDate: [''],
      manufacturingDate: [''],
  
      // Precios
      costPrice: [],
      sellingPrice: [],
      discount: [],
      currency: [''],
  
      // Inventario
      unitMeasure: [''],
      minStock: [],
      maxStock: [],
      isFeatured: [false],
      isNewArrival: [false],
      batch: [''],
      weight: [],
      height: [],
      width: [],
      length: [],
  
      // Multimedia
      thumbnailUrl: [''],
      seoTitle: [''],
      seoDescription: [''],
      imageUrls: [''],
      tags: [''],
  
      // Estado y auditoría
      status: [false],
      createdAt: [''],
      updatedAt: [''],
      audit: this.fb.group({
        codUser: [''],
        mail: ['']
      }),
  
      // Tallas (este será solo visual, puedes manejarlo aparte si deseas edición)
      sizes: [[]]
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
