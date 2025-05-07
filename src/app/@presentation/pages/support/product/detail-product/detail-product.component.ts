import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbDatepickerModule, NbTimepickerModule, NbDialogService, NbAccordionModule, NbDialogModule, NbLayoutModule } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { SupportRepository } from '../../../../../@domain/repository/repository/support.repository';
import { AppModalFooterComponent } from '../../../../@common-components/app-modal-footer/app-modal-footer.component';
import { AppModalHeaderComponent } from '../../../../@common-components/app-modal-header/app-modal-header.component';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { RespProduct } from '../../../../../@data/model/product/RespProduct';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { ProductService } from '../../../../../@data/services/ProductService';
import { SearchInputComponent } from '../../../../@common-components/search-input/search-input.component';
import { RespSupplier } from '../../../../../@data/model/supplier/resp-supplier.model';
import { SupplierRepository } from '../../../../../@domain/repository/repository/supplier.repository';
import { CURRENCIES, SIZES, TYPEFile } from '../../../../../utils/general'; // ajusta esta ruta si es distinta
import { ReqProduct } from '../../../../../@data/model/product/ReqProduct';
import { map, Observable, of } from 'rxjs';
import { Utils } from '../../../../../utils/utils';
import { FileService } from '../../../../../@data/services/file.service';
import { FileMetadata } from '../../../../../@data/model/files/FileMetadata';


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
    NbDateFnsDateModule, SearchInputComponent,
    NbDialogModule,
    NbLayoutModule,
    NbAccordionModule
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent extends BaseImplementation<RespProduct> implements OnInit {
  currencies = CURRENCIES;
  @ViewChild('autoInput') autoInput?: ElementRef<HTMLInputElement>;
  proveedorSeleccionado: RespSupplier | null = null;
  imageFiles: File[] = [];
  imagePreviews: { file: File; url: string }[] = [];
  sizes = SIZES;
  typesImages = TYPEFile;
  catalogImages: string[] = [];
  constructor(
    private fb: FormBuilder,
    spinnerService: SpinnerService,
    private datePipe: DatePipe,
    private productService: ProductService,
    modalRepository: ModalRepository, dialogService: NbDialogService, public proveedorService: SupplierRepository, private router: Router,
    private route: ActivatedRoute,  private fileService: FileService,

  ) {
    super(modalRepository, spinnerService, dialogService);
  }


  ngOnInit(): void {

    this.buildForm();
    if (this.entityData) {
      this.patchFormValues();
    }
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && Utils.isValidObjectId(id)) {
        this.loadProductById(id);
      } else {
        console.warn('El ID no es un ObjectId válido. No se cargará el producto.');
      }
    });

    window.addEventListener('keydown', this.handleEscKey.bind(this));
    this.loadCatalogImages();
  }
  //(this.page, this.pageSize, id, name, category, barcode)
  loadProductById(id: string): void {
    
    this.productService.findProducts(1, 1, id, '', '', '').subscribe((response) => {
      this.entityData = response.payload[0]; // ✅ o `response.data` si es un solo objeto
      this.patchFormValues();
    });
  }

  get sizesFormArray(): FormArray {
    return this.formData.get('sizes') as FormArray;
  }

  
  get typesFormArray(): FormArray {
    return this.formData.get('typesImages') as FormArray;
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
      supplierName: this.entityData.supplierName,
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

    });
    this.sizesFormArray.clear();
    (this.entityData.sizes || []).forEach((s: any) => {
      this.sizesFormArray.push(this.createSize(s.size, s.stock));
    });

    if (this.entityData.supplierId && this.entityData.supplierName) {
      this.proveedorSeleccionado = {
        id: this.entityData.supplierId,
        name: this.entityData.supplierName,
      } as RespSupplier;
    } else {
      this.proveedorSeleccionado = null;
    }

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
      supplierName: [''],
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

      typeImagen: [''],

      // Tallas (este será solo visual, puedes manejarlo aparte si deseas edición)
      sizes: this.fb.array([]),
      images: this.fb.array([]) ,
    });

    /*     this.formData.patchValue({
            name: 'Producto Demo',
            description: 'Descripción de prueba',
            productCode: 'COD123',
            barcode: '1234567890123',
            sku: 'SKU-001',
            upc: 'UPC-0001',
            costPrice: 50,
            sellingPrice: 75,
            discount: 5,
            currency: 'PEN',
            unitMeasure: 'KG',
            minStock: 10,
            maxStock: 100,
            isFeatured: true,
            isNewArrival: true,
            batch: 'Lote-A1',
            weight: 1.2,
            height: 30,
            width: 20,
            length: 40,
            seoTitle: 'Producto SEO Demo',
            seoDescription: 'Este es un producto de prueba para SEO',
            tags: 'test, demo, producto',
            imageUrls: 'https://via.placeholder.com/150, https://via.placeholder.com/200',
            status: true,
            expirationDate: new Date(),
            manufacturingDate: new Date()
          });
    */
  }


  onSubmit() {
    ;
    const formRaw = this.formData.getRawValue();
  
    const manufacturingDate = this.datePipe.transform(this.formData.value.manufacturingDate, 'dd/MM/yyyy') || '';
    const expirationDate = this.datePipe.transform(this.formData.value.expirationDate, 'dd/MM/yyyy') || '';
  
    const reqBody: { data: ReqProduct } = {
      data: {
        id: formRaw.id,
        name: formRaw.name,
        description: formRaw.description,
        category: formRaw.category,
        subcategory: formRaw.subcategory,
        productCode: formRaw.productCode,
        barcode: formRaw.barcode,
        sku: formRaw.sku,
        upc: formRaw.upc,
        supplierId: formRaw.supplierId,
        manufacturer: formRaw.manufacturer,
        brand: formRaw.brand,
        expirationDate: expirationDate,
        manufacturingDate: manufacturingDate,
        pricing: {
          costPrice: formRaw.costPrice,
          sellingPrice: formRaw.sellingPrice,
          discount: formRaw.discount,
          currency: formRaw.currency,
        },
        inventory: {
          unitMeasure: formRaw.unitMeasure,
          minStock: formRaw.minStock,
          maxStock: formRaw.maxStock,
          isFeatured: formRaw.isFeatured,
          isNewArrival: formRaw.isNewArrival,
          batch: formRaw.batch,
          weight: formRaw.weight,
          height: formRaw.height,
          width: formRaw.width,
          length: formRaw.length,
        },
        media: {
          imageUrls: [], // se llenará después si hay imágenes
          thumbnailUrl: formRaw.thumbnailUrl,
          tags: formRaw.tags?.split(',').map((tag: string) => tag.trim()) || [],
          seoTitle: formRaw.seoTitle,
          seoDescription: formRaw.seoDescription,
        },
        status: formRaw.status,
        sizes: this.sizesFormArray.getRawValue(),
      }
    };
  
    if (this.imageFiles.length > 0) {
      this.spinnerService.show(); // si tienes spinner

      if (this.imageFiles.length > 0) {
        this.spinnerService.show();
        this.fileService.uploadFiles(this.imageFiles, '1',formRaw.typeImagen).subscribe({
          next: (uploadedFiles: FileMetadata[]) => {
            // Suponiendo que el backend responde con un array de objetos FileMetadata
            const imageUrls = uploadedFiles.map(file => file.s3Key); // o file.url si lo devuelves
           // reqBody.data.media.imageUrls = imageUrls;
    
            this.saveProduct(reqBody);
          },
          error: (error) => this.handleErrorResponseSaveOrUpdate(error)
        });
      } else {
        this.saveProduct(reqBody);
      }

  }
}

  

  private saveProduct(reqBody: { data: ReqProduct }) {
    this.spinnerService.show();
    this.productService.saveProduct(reqBody.data).subscribe({
      next: () => this.handleSuccessResponseSaveOrUpdate(reqBody.data),
      error: (error) => this.handleErrorResponseSaveOrUpdate(error)
    });
    this.spinnerService.hide();
  }
  

  onBarcodeScanned(barcode: string) {
    // Update the form's barcode field with the scanned barcode value
    this.formData.patchValue({ barcode });
  }



  removeSize(index: number): void {
    this.sizesFormArray.removeAt(index);
  }

  returnToList(): void {
    this.router.navigate(['/support/product']);
  }


  onProveedorSelected(option: any) {
    
    const proveedorId = option?.id;
    this.formData.patchValue({
      supplierId: option?.id,
      supplierName: option?.name,
    });

    // Usar proveedorId para enviar al backend
    console.log('Proveedor ID:', proveedorId);
  }

  createSize(size: string = '', stock: number = 0): FormGroup {
    return this.fb.group({
      size: [size, Validators.required],
      stock: [stock, Validators.required],
      images: [[]], // arreglo de imágenes por talla
    });
  }
  


  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const productName = this.formData.get('name')?.value?.toLowerCase().replace(/\s+/g, '-');
  
    if (input.files && productName) {
      for (const file of Array.from(input.files)) {
        const index = this.imageFiles.length; // index basado en cantidad actual
        const extension = file.name.split('.').pop();
        const newFileName = `${productName}-${index}.${extension}`;
  
        const renamedFile = new File([file], newFileName, { type: file.type });
  
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push({ file: renamedFile, url: reader.result as string });
        };
        reader.readAsDataURL(renamedFile);
        this.imageFiles.push(renamedFile);
      }
  
      this.updateFormImageUrls();
    }
  }
  private updateFormImageUrls(): void {
    const urls = this.imageFiles.map(file => file.name); // Solo los nombres (sin path base64)
    this.formData.get('imageUrls')?.setValue(urls);
  }
  
  
  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  
    // Reordenar nombres
    const productName = this.formData.get('name')?.value?.toLowerCase().replace(/\s+/g, '-');
  
    this.imageFiles = this.imageFiles.map((file, idx) => {
      const extension = file.name.split('.').pop();
      return new File([file], `${productName}-${idx}.${extension}`, { type: file.type });
    });
  
    this.imagePreviews = this.imageFiles.map((file, idx) => ({
      file,
      url: this.imagePreviews[idx]?.url || '',
    }));
  
    this.updateFormImageUrls();
  }
  
  removeImageFromSize(sizeIndex: number, imageIndex: number): void {
    const sizeGroup = this.sizesFormArray.at(sizeIndex) as FormGroup;
    const images: string[] = sizeGroup.get('images')?.value || [];
    
    images.splice(imageIndex, 1);
    sizeGroup.get('images')?.setValue([...images]); // actualiza el control con el nuevo array
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
  
    const productName = this.formData.get('name')?.value;
    if (!productName) {
      alert('Ingrese primero el nombre del producto');
      return;
    }
  
    const files = Array.from(input.files);
    this.imageFiles = files.map((file, index) => {
      const extension = file.name.split('.').pop();
      const customName = `${productName.replace(/\s+/g, '_')}_${index + 1}.${extension}`;
      return new File([file], customName, { type: file.type });
    });
  
    // Puedes subir o mostrar `this.imageFiles` como desees
  }

  
loadCatalogImages() {
  const baseUrl = 'https://pillihuaman-prod-assets.s3.us-east-2.amazonaws.com/catalog/';
  this.catalogImages = [
    `${baseUrl}image1.jpg`,
    `${baseUrl}image2.jpg`,
    `${baseUrl}image3.jpg`,
    // agrega dinámicamente o carga desde un microservicio
  ];
}
  
}
