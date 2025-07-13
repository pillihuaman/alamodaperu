import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Nebular & Third-Party Imports
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbDatepickerModule, NbTimepickerModule, NbDialogService, NbAccordionModule, NbDialogModule, NbLayoutModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';

// Project-Specific Imports
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { ProductService } from '../../../../../@data/services/ProductService';
import { FileService } from '../../../../../@data/services/file.service';
import { SupplierRepository } from '../../../../../@domain/repository/repository/supplier.repository';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { CommonRepository } from '../../../../../@domain/repository/repository/common.repository';

import { AppModalFooterComponent } from '../../../../@common-components/app-modal-footer/app-modal-footer.component';
import { AppModalHeaderComponent } from '../../../../@common-components/app-modal-header/app-modal-header.component';
import { SearchInputComponent } from '../../../../@common-components/search-input/search-input.component';
import { ModalComponent } from '../../../../@common-components/modal/modal.component';

import { ReqProduct } from '../../../../../@data/model/product/req-product';
import { RespProduct } from '../../../../../@data/model/product/resp-product';
import { RespSupplier } from '../../../../../@data/model/supplier/resp-supplier.model';
import { FileMetadata } from '../../../../../@data/model/files/fileMetadata';
import { SizeStock } from '../../../../../@data/model/product/sizeStock';
import { CatalogImageWrapper } from '../../../../../@data/model/files/catalogImageWrapper';

import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { Utils } from '../../../../../utils/utils';
import { GeneralConstans } from '../../../../../utils/generalConstant';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    // Nebular Modules
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbDialogModule,
    NbLayoutModule,
    NbAccordionModule,
    NbSelectModule,
    NbCheckboxModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
    NebularSharedModule,
    // Common Components
    AppModalHeaderComponent,
    AppModalFooterComponent,
    SearchInputComponent,
  ],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'] // Use styleUrls (plural)
})
export class DetailProductComponent extends BaseImplementation<RespProduct> implements OnInit, AfterViewInit {

  // --- Class Properties ---
  @ViewChildren('columnRef') columnRefs!: QueryList<ElementRef>;
  proveedorSeleccionado: RespSupplier | null = null;
  
  // UI State for Images and Drag-Drop
  imageFiles: File[] = []; // Holds new files selected for upload
  imagePreviews: { file: File; url: string }[] = [];
  catalogImagesMetadata: CatalogImageWrapper[] = [];
  assignedImages: CatalogImageWrapper[] = [];

  // Data for Form Controls
  sizes: string[] = [];
  currencies: { code: string; name: string }[] = [];
  fileTypes: string[] = [];

  // Loading and State Flags
  productLoaded = false;
  catalogImagesLoaded = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private renderer: Renderer2,
    // Services
    spinnerService: SpinnerService,
    dialogService: NbDialogService,
    modalRepository: ModalRepository,
    public proveedorService: SupplierRepository,
    private productService: ProductService,
    private fileService: FileService,
    private commonRepository: CommonRepository
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  // --- Lifecycle Hooks ---

  ngOnInit(): void {
    this.buildForm();
    this.loadCommonData();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && Utils.isValidObjectId(id)) {
        // "Update" Mode: Load the product data from the server.
        this.loadProductById(id);
      } else {
        // "Create" Mode: The form is ready and empty.
        console.log('No product ID found, starting in create mode.');
      }
    });

    window.addEventListener('keydown', this.handleEscKey.bind(this));
  }
  
  ngAfterViewInit(): void {
    this.syncColumnHeights();
    this.zone.runOutsideAngular(() => {
        const imageList = document.querySelector('.image-list');
        if (imageList) {
            new ResizeObserver(() => this.syncColumnHeights()).observe(imageList);
        }
    });
  }

  ngAfterViewChecked(): void {
    this.syncColumnHeights();
  }

  // --- Data Loading and Form Population ---

  loadCommonData(): void {
    this.commonRepository.getCommonParameter(GeneralConstans.commonConstant).subscribe({
      next: (resp) => {
        this.sizes = resp.data.sizes;
        this.currencies = resp.data.currencies;
        this.fileTypes = resp.data.fileTypes;
      },
      error: (err) => console.error('Error loading common data', err)
    });
  }

  loadProductById(id: string): void {
    this.spinnerService.show();
    this.productService.findProducts(1, 1, id, '', '', '').subscribe({
      next: (response) => {
        this.entityData = response.payload[0] as RespProduct;
        this.patchFormValues(); // This method will now populate everything
        this.productLoaded = true;
        this.catalogImagesLoaded = true;
        this.trySyncHeights();
        this.spinnerService.hide();
      },
      error: (err) => {
        this.spinnerService.hide();
        console.error('Error loading product by ID', err);
      }
    });
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
      costPrice: [null],
      sellingPrice: [null],
      discount: [null],
      currency: [''],
      unitMeasure: [''],
      minStock: [null],
      maxStock: [null],
      isFeatured: [false],
      isNewArrival: [false],
      batch: [''],
      weight: [null],
      height: [null],
      width: [null],
      length: [null],
      thumbnailUrl: [''],
      seoTitle: [''],
      seoDescription: [''],
      imageUrls: [''],
      tags: [''],
      status: [true],
      typeImagen: [''],
      sizes: this.fb.array([]),
      images: this.fb.array([]),
    });
  }

  patchFormValues(): void {
    if (!this.entityData) return;

    // 1. Patch all the simple form controls
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
      expirationDate: this.entityData.expirationDate ? new Date(this.entityData.expirationDate) : null,
      manufacturingDate: this.entityData.manufacturingDate ? new Date(this.entityData.manufacturingDate) : null,
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

    // 2. Clear out old data from UI arrays
    this.assignedImages = [];
    this.catalogImagesMetadata = [];
    
    // 3. Process the file metadata from the server to populate UI lists
    if (this.entityData.fileMetadata && Array.isArray(this.entityData.fileMetadata)) {
      this.entityData.fileMetadata.forEach(file => {
        // Convert the sizeStock array from API into the sizeStockMap object for the UI
        const sizeStockMap = (file.sizeStock || []).reduce((map, item) => {
          if (item.size !== undefined) {
            map[item.size] = item.stock ?? 0;
          }
          return map;
        }, {} as { [key: string]: number });
        
        const wrapper: CatalogImageWrapper = {
          fileMetadata: [file],
          sizeStockMap: sizeStockMap
        };

        if (file.position === 'ASIGNADA') {
          this.assignedImages.push(wrapper);
        } else if (file.position === 'CATALOG') {
          this.catalogImagesMetadata.push(wrapper);
        }
      });
    }
    
    // 4. Populate supplier information
    if (this.entityData.supplierId && this.entityData.supplierName) {
      this.proveedorSeleccionado = {
        id: this.entityData.supplierId,
        name: this.entityData.supplierName,
      } as RespSupplier;
    } else {
      this.proveedorSeleccionado = null;
    }
  }

  // --- Form Submission ---

  onSubmit() {
    if (this.formData.invalid) {
      this.showWarningMessage('Por favor, complete todos los campos obligatorios.', 'Formulario Inválido');
      return;
    }
    this.spinnerService.show();

    const formRaw = this.formData.getRawValue();
    const productId = formRaw.id;

    const assignedMetadata: FileMetadata[] = this.assignedImages.map((imgWrapper: CatalogImageWrapper) => {
        const stockDetails: SizeStock[] = Object.keys(imgWrapper.sizeStockMap || {}).map(sizeKey => ({
            size: sizeKey,
            stock: (imgWrapper.sizeStockMap || {})[sizeKey] || 0
        }));
        const baseMetadata = imgWrapper.fileMetadata && imgWrapper.fileMetadata[0] ? imgWrapper.fileMetadata[0] : {} as FileMetadata;
        return {
            ...baseMetadata,
            filename: baseMetadata.filename ?? '',
            position: 'ASIGNADA',
            sizeStock: stockDetails
        } as FileMetadata;
    });

    const catalogMetadata: FileMetadata[] = this.catalogImagesMetadata.map((imgWrapper: CatalogImageWrapper) => ({
        ...(imgWrapper.fileMetadata && imgWrapper.fileMetadata.length > 0 ? imgWrapper.fileMetadata[0] : {} as FileMetadata),
        position: 'CATALOG',
        sizeStock: []
    }));

    const baseProductRequest: ReqProduct = {
        ...formRaw,
        expirationDate: this.datePipe.transform(formRaw.expirationDate, 'dd/MM/yyyy') || '',
        manufacturingDate: this.datePipe.transform(formRaw.manufacturingDate, 'dd/MM/yyyy') || '',
        pricing: { costPrice: formRaw.costPrice, sellingPrice: formRaw.sellingPrice, discount: formRaw.discount, currency: formRaw.currency },
        inventory: { unitMeasure: formRaw.unitMeasure, minStock: formRaw.minStock, maxStock: formRaw.maxStock, isFeatured: formRaw.isFeatured, isNewArrival: formRaw.isNewArrival, batch: formRaw.batch, weight: formRaw.weight, height: formRaw.height, width: formRaw.width, length: formRaw.length },
        media: { imageUrls: [], thumbnailUrl: formRaw.thumbnailUrl, tags: formRaw.tags?.split(',').map((tag: string) => tag.trim()) || [], seoTitle: formRaw.seoTitle, seoDescription: formRaw.seoDescription },
        fileMetadata: [...assignedMetadata, ...catalogMetadata],
    };

    this.uploadNewFiles(productId, formRaw.typeImagen).pipe(
        switchMap((uploadedFiles: FileMetadata[]) => {
            const finalMetadata = [...assignedMetadata, ...catalogMetadata, ...uploadedFiles];
            const finalProductRequest: ReqProduct = { ...baseProductRequest, fileMetadata: finalMetadata };
            return this.productService.saveProduct(finalProductRequest);
        })
    ).subscribe({
        next: (response) => {
            this.handleSuccessResponseSaveOrUpdate(response);
            this.returnToList();
        },
        error: (error) => this.handleErrorResponseSaveOrUpdate(error),
        complete: () => this.spinnerService.hide()
    });
  }

  private uploadNewFiles(productId: string, typeImagen: string): Observable<FileMetadata[]> {
    if (this.imageFiles.length === 0) {
      return of([]);
    }
    const newFilesMetadata: Partial<FileMetadata>[] = this.imageFiles.map(file => ({
      filename: file.name,
      typeFile: typeImagen || 'IMAGEN_PRODUCTO',
      position: 'ASIGNADA',
    }));
    return this.fileService.uploadFiles(this.imageFiles, newFilesMetadata, productId);
  }

  // --- UI and Event Handlers ---

  get sizesFormArray(): FormArray {
    return this.formData.get('sizes') as FormArray;
  }

  onProveedorSelected(option: any) {
    this.formData.patchValue({
      supplierId: option?.id,
      supplierName: option?.name,
    });
  }
  
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const productName = this.formData.get('name')?.value?.toLowerCase().replace(/\s+/g, '-');
    if (!productName) {
        this.showWarningMessage('Por favor, ingrese un nombre para el producto antes de subir imágenes.', 'Nombre Requerido');
        return;
    }
    if (input.files) {
      for (const file of Array.from(input.files)) {
        const uniqueIndex = Date.now() + Math.random(); // Better uniqueness
        const extension = file.name.split('.').pop();
        const newFileName = `${productName}-${uniqueIndex}.${extension}`;
        const renamedFile = new File([file], newFileName, { type: file.type });
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push({ file: renamedFile, url: reader.result as string });
          this.imageFiles.push(renamedFile);
        };
        reader.readAsDataURL(renamedFile);
      }
    }
  }

  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  onCatalogDrop(event: CdkDragDrop<CatalogImageWrapper[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.syncColumnHeights();
  }

  onAssignDrop(event: CdkDragDrop<CatalogImageWrapper[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.syncColumnHeights();
  }
  
  confirmDeleteImage(img: FileMetadata): void {
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: {
          ...img,
          typeDescription: 'QUESTION',
          description: `¿Estás seguro de que deseas eliminar permanentemente la imagen "${img.filename}"?`,
        },
      },
    });
    dialogRef.onClose.subscribe((result) => {
      if (result === 'deleteConfirmed') {
        this.handleDeleteImage(img);
      }
    });
  }

  handleDeleteImage(img: FileMetadata): void {
    if (!img.id) return;
    this.spinnerService.show();
    this.fileService.deleteFile(img.id).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.catalogImagesMetadata = this.catalogImagesMetadata.filter(item => item.fileMetadata && item.fileMetadata.length > 0 && item.fileMetadata[0].id !== img.id);
        this.assignedImages = this.assignedImages.filter(item => item.fileMetadata && item.fileMetadata.length > 0 && item.fileMetadata[0].id !== img.id);
        this.showSuccessMessage('Imagen eliminada correctamente.', 'Éxito');
      },
      error: (error) => {
        this.spinnerService.hide();
        this.showWErrorMessage('Error al eliminar la imagen.', 'Error');
        console.error('Error deleting image:', error);
      }
    });
  }

  returnToList(): void {
    this.router.navigate(['/support/product']);
  }
  
  // --- UI Sync and Helpers ---

  trySyncHeights(): void {
    if (this.productLoaded && this.catalogImagesLoaded) {
      setTimeout(() => this.syncColumnHeights(), 0);
    }
  }

  syncColumnHeights(): void {
    if (!this.columnRefs || this.columnRefs.length < 2) return;
    const [leftCol, rightCol] = this.columnRefs.map(ref => ref.nativeElement);
    this.renderer.setStyle(leftCol, 'height', 'auto');
    this.renderer.setStyle(rightCol, 'height', 'auto');
    const maxHeight = Math.max(leftCol.offsetHeight, rightCol.offsetHeight);
    this.renderer.setStyle(leftCol, 'height', `${maxHeight}px`);
    this.renderer.setStyle(rightCol, 'height', `${maxHeight}px`);
  }

  get emptySlots(): any[] {
    const catLen = this.catalogImagesMetadata?.length ?? 0;
    const assLen = this.assignedImages?.length ?? 0;
    const diff = catLen - assLen;
    return Array(Math.max(diff, 0));
  }
}