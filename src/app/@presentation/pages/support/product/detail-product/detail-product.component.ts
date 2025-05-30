import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbDatepickerModule, NbTimepickerModule, NbDialogService, NbAccordionModule, NbDialogModule, NbLayoutModule } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module'; import { AppModalFooterComponent } from '../../../../@common-components/app-modal-footer/app-modal-footer.component';
import { AppModalHeaderComponent } from '../../../../@common-components/app-modal-header/app-modal-header.component';
import { BaseImplementation } from '../../../../../utils/baseImplementation';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { ProductService } from '../../../../../@data/services/ProductService';
import { SearchInputComponent } from '../../../../@common-components/search-input/search-input.component';
import { RespSupplier } from '../../../../../@data/model/supplier/resp-supplier.model';
import { SupplierRepository } from '../../../../../@domain/repository/repository/supplier.repository';
import { ReqProduct } from '../../../../../@data/model/product/req-product';
import { map, Observable, of, switchMap } from 'rxjs';
import { Utils } from '../../../../../utils/utils';
import { FileService } from '../../../../../@data/services/file.service';
import { FileMetadata } from '../../../../../@data/model/files/fileMetadata';
import { GeneralConstans } from '../../../../../utils/generalConstant';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { id } from 'date-fns/locale';
import { ModalComponent } from '../../../../@common-components/modal/modal.component';
import { RespProduct } from '../../../../../@data/model/product/resp-product';
import { CommonRepository } from '../../../../../@domain/repository/repository/common.repository';
import { SizeStock } from '../../../../../@data/model/product/sizeStock';
import { CatalogImageWrapper } from '../../../../../@data/model/files/catalogImageWrapper';


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
    NbAccordionModule, DragDropModule
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent extends BaseImplementation<RespProduct> implements OnInit, AfterViewInit {
  @ViewChild('autoInput') autoInput?: ElementRef<HTMLInputElement>;
  proveedorSeleccionado: RespSupplier | null = null;
  imageFiles: File[] = [];
  imagePreviews: { file: File; url: string }[] = [];
  sizes: string[] = [];
  catalogImages: string[] = [];
  catalogImagesMetadata: any[] = [];
  assignedImages: any[] = [];
  @ViewChildren('columnRef') columnRefs!: QueryList<ElementRef>;
  catalogImagesLoaded = false;
  productLoaded = false;
  currencies: { code: string; name: string }[] = [];
  fileTypes: string[] = [];

  

  constructor(
    private fb: FormBuilder,
    spinnerService: SpinnerService,
    private datePipe: DatePipe,
    private productService: ProductService,
    modalRepository: ModalRepository, dialogService: NbDialogService, public proveedorService: SupplierRepository, private router: Router,
    private route: ActivatedRoute, private fileService: FileService, private renderer: Renderer2, private zone: NgZone, private commonRepository: CommonRepository

  ) {
    super(modalRepository, spinnerService, dialogService);
  }


    ngAfterViewInit(): void {

    this.syncColumnHeights();

    // Escuchar cambios por redimensionamiento o mutaciones
    this.zone.runOutsideAngular(() => {
      new ResizeObserver(() => {
        this.syncColumnHeights();
      }).observe(document.querySelector('.image-list')!);
    });
  }

  ngAfterViewChecked(): void {
    this.syncColumnHeights(); // para mantener alturas iguales cuando cambia el contenido
  }
  syncColumnHeights(): void {
    if (!this.columnRefs || this.columnRefs.length < 2) return;

    const [leftCol, rightCol] = this.columnRefs.map(ref => ref.nativeElement);

    // Resetear altura para medición real
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

  getPlaceholders(type: 'catalog' | 'assigned'): any[] {
    const catLen = this.catalogImagesMetadata?.length ?? 0;
    const assLen = this.assignedImages?.length ?? 0;
    const diff = catLen - assLen;

    if (type === 'catalog' && diff < 0) {
      return Array(Math.abs(diff));
    }

    if (type === 'assigned' && diff > 0) {
      return Array(diff);
    }

    return [];
  }


  ngOnInit(): void {

    debugger
    this.buildForm();

    if (this.entityData) {
      this.patchFormValues();
    }
    this.loadCommonData();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && Utils.isValidObjectId(id)) {
        this.loadProductById(id);
        this.productLoaded = true;
        this.trySyncHeights();

this.fileService.getCatalogImagen(GeneralConstans.tipoImagenCatalog, id).subscribe({
  next: (files: FileMetadata[]) => {
    debugger
    this.catalogImagesMetadata = [];
    this.assignedImages = [];

    files.forEach(file => {
      const wrapper: CatalogImageWrapper = {
        fileMetadata: [file],
        sizeStockMap: {} // o llénalo con lógica si aplica
      };

      if (file.position === 'CATALOG') {
        this.catalogImagesMetadata.push(wrapper);
      } else if (file.position === 'ASIGNADA') {
        this.assignedImages.push(wrapper);
      }
    });

    this.catalogImagesLoaded = true;
    this.trySyncHeights();

    console.log('Imágenes de catálogo:', this.catalogImagesMetadata);
    console.log('Imágenes asignadas:', this.assignedImages);
  },
  error: err => {
    console.error('Error al obtener catálogo de imágenes:', err);
  }
});


      } else {
        console.warn('El ID no es un ObjectId válido. No se cargará el producto.');
      }
    });

    window.addEventListener('keydown', this.handleEscKey.bind(this));
  }


  loadCommonData(): void {
    this.commonRepository.getCommonParameter(GeneralConstans.commonConstant).subscribe({
      next: (resp) => {
        this.sizes = resp.data.sizes;
        this.currencies = resp.data.currencies;
        this.fileTypes = resp.data.fileTypes;
      },
      error: (err) => {
        console.error('Error loading common data', err);
      }
    });
  }

  trySyncHeights(): void {
    if (this.productLoaded && this.catalogImagesLoaded) {
      setTimeout(() => {
        this.syncColumnHeights();
      }, 0); // Espera a que el DOM se actualice
    }
  }

  //(this.page, this.pageSize, id, name, category, barcode)
  loadProductById(id: string): void {

    this.productService.findProducts(1, 1, id, '', '', '').subscribe((response) => {
      this.entityData = response.payload[0] as RespProduct; // ✅ o `response.data` si es un solo objeto
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
      images: this.fb.array([]),
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
  const formRaw = this.formData.getRawValue();

  const manufacturingDate = this.datePipe.transform(this.formData.value.manufacturingDate, 'dd/MM/yyyy') || '';
  const expirationDate = this.datePipe.transform(this.formData.value.expirationDate, 'dd/MM/yyyy') || '';

  // Paso 1: Construimos el body sin imágenes todavía
  const baseProduct: ReqProduct = {
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
    expirationDate,
    manufacturingDate,
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
      imageUrls: [],
      thumbnailUrl: formRaw.thumbnailUrl,
      tags: formRaw.tags?.split(',').map((tag: string) => tag.trim()) || [],
      seoTitle: formRaw.seoTitle,
      seoDescription: formRaw.seoDescription,
    },
    fileMetadata: [],
    status: formRaw.status,
    typeFile: formRaw.typeImagen,
  };

  this.spinnerService.show();

  // Paso 2: Guardar producto
  this.productService.saveProduct(baseProduct).pipe(
    switchMap((savedProduct: any) => {
      const productId = savedProduct.payload.id;

      // Si no hay imágenes, terminamos aquí
      if (this.imageFiles.length === 0) {
        this.handleSuccessResponseSaveOrUpdate(savedProduct.payload);
        return of(null);
      }

      // Paso 3: Subir imágenes si hay
      const metadataList: Partial<FileMetadata>[] = this.imageFiles.map((file) => {
        const existsInCatalog = this.catalogImagesMetadata.some(
          (item) => item.fileMetadata && item.fileMetadata[0]?.filename === file.name
        );
        return {
          dimension: formRaw.typeImagen,
          typeFile: formRaw.typeImagen,
          position: existsInCatalog ? 'CATALOGO' : 'ASIGNADA'
        };
      });
debugger
      return this.fileService.uploadFiles(this.imageFiles, metadataList, productId).pipe(
        map((uploadedFiles: FileMetadata[]) => ({
          productId,
          uploadedFiles,
          savedProduct
        }))
      );
    }),
    switchMap((result) => {
      debugger
      if (!result) return of(null); // No hubo archivos, ya terminamos

      const { uploadedFiles, savedProduct } = result;

      // Paso 4: Actualizar producto con los metadatos reales
      const updatedFileMetadata: FileMetadata[] = uploadedFiles.map(file => {
        const sizeStockArray: SizeStock[] = Object.entries(file.sizeStock || {}).map(([size, stock]) => ({
          size,
          stock: Number(stock),
        }));

        return {
          ...file,
          sizeStock: sizeStockArray,
        };
      });
      const updatedProduct: ReqProduct = {
        ...savedProduct.payload,
          manufacturingDate,
  expirationDate,
        fileMetadata: updatedFileMetadata,
      };

      return this.productService.saveProduct(updatedProduct);
    })
  ).subscribe({
    next: (finalSavedProduct) => {
      this.handleSuccessResponseSaveOrUpdate(finalSavedProduct || baseProduct);
    },
    error: (error) => this.handleErrorResponseSaveOrUpdate(error),
    complete: () => this.spinnerService.hide()
  });
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


  createSize(size: string, stock: number = 0): FormGroup {
    return this.fb.group({
      size: [size],
      stock: [stock, Validators.required]
      // No es necesario incluir imageUrl aquí, lo puedes agregar dinámicamente como arriba
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

  onCatalogDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.syncColumnHeights();
  }

  onAssignDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.syncColumnHeights();
  }

  confirmDeleteImage(img: FileMetadata): void {
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: {
          ...img,
          typeDescription: 'QUESTION',
          description: `¿Deseas eliminar la imagen "${img.filename}"?`, // Puedes ajustar esto
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
    this.fileService.deleteFile(img.id).subscribe(
      () => {
        this.catalogImagesMetadata = this.catalogImagesMetadata.filter(
          (item) => item.id !== img.id
        );
        this.showSuccessMessage('Imagen eliminada correctamente', 'Éxito');
      },
      (error) => {
        console.error('Error al eliminar imagen:', error);
      }
    );
  }

}
