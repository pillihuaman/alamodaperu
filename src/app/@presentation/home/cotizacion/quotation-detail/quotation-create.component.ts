// src/app/pages/home/components/quotations/quotation-create/quotation-create.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, finalize, switchMap, takeUntil } from 'rxjs/operators';

//------------------------------------------------
// NEBULAR MODULES
//------------------------------------------------
import {
  NbAccordionModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule,
  NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule,
  NbSpinnerModule, NbTabsetModule, NbTooltipModule
} from '@nebular/theme';

//------------------------------------------------
// PROJECT IMPORTS
//------------------------------------------------
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { QuotationService } from '../../../../@data/services/quotation.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { ReqQuotation } from '../../../../@data/model/quotation/req-quotation';
import { RespQuotation, QuotationItem as RespQuotationItem } from '../../../../@data/model/quotation/resp-quotation';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { ChatbotComponent } from '../../../@common-components/chatbot/chatbot.component';
import { GeneralConstans } from '../../../../utils/generalConstant';

interface LogoPreview { file?: File; url: string | ArrayBuffer; id?: string; state: 'existing' | 'new' | 'empty'; }
interface ReferencePreview { file?: File; url: string | ArrayBuffer; id?: string; state: 'existing' | 'new'; }

@Component({
  selector: 'quotation-create',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, NbButtonModule, NbCardModule, NbInputModule,
    NbIconModule, NbSelectModule, NbCheckboxModule, NbAccordionModule, NbAlertModule,
    NbFormFieldModule, NbTabsetModule, NbTooltipModule, NbSpinnerModule,
    TableDatasourceComponent, ChatbotComponent
  ],
  templateUrl: './quotation-create.html',
  styleUrls: ['./quotation-create.scss']
})
export class QuotationCreateComponent extends BaseImplementation<RespQuotation> implements OnInit, OnDestroy {

  quotationForm!: FormGroup;
  isEditMode = false;
  quotationId: string | null = null;
  private destroy$ = new Subject<void>();

  isSubmitting = false;
  formSubmitted = false;

  // --- Propiedades para cálculo visual ---
  precioConjuntoCompletoRef = 50.00;
  precioSoloPoloRef = 35.00;
  
  // --- Propiedades que muestran los totales ---
  tallasDisponibles: string[] = ['S', 'M', 'L', 'XL', 'XXL', '6', '8', '10', '12', '14', '16'];
  cantidadTotalPrendas = 0;
  subtotalPrendas = 0;
  totalDiseno = 0;
  granTotal = 0;
  maxImagenes = 4;

  precioConjuntoCompleto: number | null = null;
  precioSoloPolo: number | null = null;
  costoDisenoPorPrenda: number | null = null;
  subtotalGeneral: number | null = null;
  montoIgv: number | null = null;

  logoPreview: LogoPreview = { state: 'empty', url: '' };
  referenciaPreviews: ReferencePreview[] = [];
  private filesToDelete: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private quotationService: QuotationService,
    spinnerService: SpinnerService,
    dialogService: NbDialogService,
    modalRepository: ModalRepository,
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadDataForEdit();

    this.items.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      //this.recalcularTotalesVisuales();
      // >>> CORRECCIÓN <<<
      // Se marca el formulario como 'dirty' cuando cualquier valor de un item cambia.
      // Esto asegura que el botón de actualizar se active correctamente.
      this.quotationForm.markAsDirty();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDataForEdit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id && id !== 'new') {
          this.isEditMode = true;
          this.quotationId = id;
          this.spinnerService.show();
          return this.quotationService.getQuotationById(id);
        }
        return of(null);
      }),
      catchError(() => of(null)),
      finalize(() => this.spinnerService.hide())
    ).subscribe(response => {
      if (response?.payload) {
        this.patchFormWithData(response.payload);
this.quotationForm.markAsPristine(); // lo puedes comentar si quieres forzar botón activo
this.recalcularTotalesVisuales(response.payload); 
        this.spinnerService.hide()
      }
    });
  }

  private patchFormWithData(data: RespQuotation): void {
    this.quotationForm.patchValue({
      clienteNombre: data.customerInfo?.contactName,
      clienteEmail: data.customerInfo?.contactEmail,
      clienteTelefono: data.customerInfo?.contactPhone,
      descripcionDetallada: data.designDetails?.detailedDescription,
      aceptaTerminos: data.aceptaTerminos
    });
    if (data.designDetails?.logoFile) {
      this.logoPreview = { id: data.designDetails.logoFile.id, url: data.designDetails.logoFile.url, state: 'existing' };
    }
    if (data.designDetails?.referenceImages) {
      this.referenciaPreviews = data.designDetails.referenceImages.map(img => ({ id: img.id, url: img.url, state: 'existing' }));
    }
    if (data.items && data.items.length > 0) {
      this.setItems(data.items);
    }
    if (data.totals) {
      this.cantidadTotalPrendas = data.totals.totalGarments;
      this.subtotalPrendas = data.totals.garmentsSubtotal;
      this.totalDiseno = data.totals.designTotal;
      this.granTotal = data.totals.grandTotal;
      this.precioConjuntoCompleto = data.totals.fullSetPrice;
      this.precioSoloPolo = data.totals.poloOnlyPrice;
      this.costoDisenoPorPrenda = data.totals.designCostPerGarment;
      this.subtotalGeneral = data.totals.subtotal;
      this.montoIgv = data.totals.igvAmount;
    }
      this.recalcularTotalesVisuales(data); 
  }

  private setItems(itemsData: RespQuotationItem[]): void {
    const itemsFormGroups = itemsData.map(item => this.fb.group({
      nombre: [item.playerName, Validators.required],
      numeroCamisa: [item.shirtNumber],
      talla: [item.size, Validators.required],
      cantidad: [item.quantity, [Validators.required, Validators.min(1)]],
      // CORRECCIÓN: El nombre del control ahora es 'fullSet'
      fullSet: [item.fullSet, Validators.required] 
    }));
    this.quotationForm.setControl('items', this.fb.array(itemsFormGroups));
  }
  buildForm() {
    this.quotationForm = this.fb.group({
      clienteNombre: ['', Validators.required],
      clienteEmail: ['', [Validators.required, Validators.email]],
      clienteTelefono: ['', Validators.required],
      descripcionDetallada: ['', Validators.required],
      items: this.fb.array([]),
      aceptaTerminos: [false, Validators.requiredTrue]
    });
    if (!this.isEditMode) this.agregarItem();
  }

  get items(): FormArray { return this.quotationForm.get('items') as FormArray; }

  crearItem(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required], numeroCamisa: [null], talla: ['M', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]], fullSet: [true, Validators.required]
    });
  }

  agregarItem(): void {
    this.items.push(this.crearItem());
    // >>> CORRECCIÓN <<<
    // Se marca explícitamente el formulario como 'dirty' al añadir un item.
    this.quotationForm.markAsDirty();
  }

  eliminarItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
      // >>> CORRECCIÓN <<<
      // Se marca explícitamente el formulario como 'dirty' al eliminar un item.
      this.quotationForm.markAsDirty();
    }
  }

private recalcularTotalesVisuales(payload: any): void {
  const items = payload.items || [];
  const fullSetPrice = payload.totals?.fullSetPrice ?? this.precioConjuntoCompletoRef;
  const poloOnlyPrice = payload.totals?.poloOnlyPrice ?? this.precioSoloPoloRef;

  this.cantidadTotalPrendas = items.reduce((sum: number, item: RespQuotationItem) => sum + (item.quantity || 0), 0);

  this.subtotalPrendas = items.reduce((sum: number, item: RespQuotationItem) => {
    const precioUnitario = item.fullSet ? fullSetPrice : poloOnlyPrice;
    return sum + (precioUnitario * (item.quantity || 0));
  }, 0);

  this.totalDiseno = payload.totals?.designTotal ?? 0;
  this.granTotal = payload.totals?.grandTotal ?? (this.subtotalPrendas + this.totalDiseno);
}

  onLogoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const newFile = input.files[0];
      if (this.logoPreview.state === 'existing' && this.logoPreview.id) this.filesToDelete.push(this.logoPreview.id);
      const reader = new FileReader();
      reader.onload = () => { this.logoPreview = { file: newFile, url: reader.result!, state: 'new' }; this.quotationForm.markAsDirty(); };
      reader.readAsDataURL(newFile);
      input.value = '';
    }
  }

  eliminarLogo(): void {
    if (this.logoPreview.state === 'existing' && this.logoPreview.id) this.filesToDelete.push(this.logoPreview.id);
    this.logoPreview = { state: 'empty', url: '' }; this.quotationForm.markAsDirty();
  }

  onReferenciaSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const nuevosArchivos = Array.from(input.files);
      if (this.referenciaPreviews.length + nuevosArchivos.length > this.maxImagenes) { this.showWarningMessage(`No puedes subir más de ${this.maxImagenes} imágenes.`, 'Límite Excedido'); return; }
      nuevosArchivos.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => { this.referenciaPreviews.push({ file, url: reader.result as string, state: 'new' }); this.quotationForm.markAsDirty(); };
        reader.readAsDataURL(file);
      });
      input.value = '';
    }
  }

  eliminarImagenReferencia(index: number): void {
    const previewToRemove = this.referenciaPreviews[index];
    if (previewToRemove.state === 'existing' && previewToRemove.id) this.filesToDelete.push(previewToRemove.id);
    this.referenciaPreviews.splice(index, 1); this.quotationForm.markAsDirty();
  }

  enviarCotizacion(): void {
    this.formSubmitted = true;
    if (this.quotationForm.invalid) {
      this.quotationForm.markAllAsTouched();
      this.showWarningMessage('Por favor, completa todos los campos requeridos.', 'Formulario Incompleto');
      return;
    }

    this.isSubmitting = true;
    this.spinnerService.show();

    const formValue = this.quotationForm.value;

    // ▼▼▼ LÓGICA MODIFICADA PARA CONSTRUIR LA SOLICITUD ▼▼▼
    
    // 1. Filtrar solo los archivos existentes (no los nuevos que son solo previsualizaciones de File)
    const existingLogo = this.logoPreview.state === 'existing' ? { id: this.logoPreview.id, url: this.logoPreview.url } : null;
    const existingReferenceImages = this.referenciaPreviews
      .filter(p => p.state === 'existing')
      .map(p => ({ id: p.id, url: p.url })); // Mapear a un objeto simple de metadatos

    // 2. Construir el objeto de la solicitud con la nueva estructura
    const quotationData: ReqQuotation = {
      clienteNombre: formValue.clienteNombre,
      clienteEmail: formValue.clienteEmail,
      clienteTelefono: formValue.clienteTelefono,
      descripcionDetallada: formValue.descripcionDetallada, // Este campo ahora es redundante pero lo mantenemos por compatibilidad
      aceptaTerminos: formValue.aceptaTerminos,
      tipoCostoProduccion: GeneralConstans.productionCostSublimadoTeamFutbol,
      items: formValue.items.map((item: any) => ({
        nombre: item.nombre,
        numeroCamisa: item.numeroCamisa,
        talla: item.talla,
        cantidad: item.cantidad,
        fullSet: item.fullSet
      })),
      // Se añade la estructura de designDetails
      designDetails: {
        detailedDescription: formValue.descripcionDetallada,
        logoFile: existingLogo,
        referenceImages: existingReferenceImages,
      } as any // Usamos 'as any' para simplificar, ya que la interfaz completa de FileMetadata es grande
    };

    // 3. Los archivos nuevos se siguen enviando por separado
    const logoFile: File | undefined = (this.logoPreview.state === 'new' && this.logoPreview.file) ? this.logoPreview.file : undefined;
    const referenceFiles = this.referenciaPreviews.filter(p => p.state === 'new' && p.file).map(p => p.file!);

    let submissionObservable: Observable<any>;
    if (this.isEditMode && this.quotationId) {
      // Ya no se envía 'filesToDelete'. El backend deducirá qué borrar.
      submissionObservable = this.quotationService.updateQuotation(this.quotationId, quotationData, logoFile, referenceFiles, []);
    } else {
      submissionObservable = this.quotationService.createQuotation(quotationData, logoFile, referenceFiles);
    }

    submissionObservable.pipe(
      catchError(err => this.handleError(err)),
      finalize(() => {
        this.isSubmitting = false;
        this.spinnerService.hide();
      })
    ).subscribe(response => this.handleResponse(response, this.isEditMode));
  }

  private handleError(err: any): Observable<null> {
    const errorMessage = err.error?.status?.error?.message || err.error?.message || 'Ocurrió un error de conexión.';
    this.showWErrorMessage(errorMessage, 'Error de Envío');
    return of(null);
  }

 private handleResponse(response: any, isUpdate: boolean): void {
  debugger
    // Verificar que la petición fue exitosa y que contiene los datos de la cotización
    if (response?.status?.success && response.payload) {
      const returnedData: RespQuotation = response.payload;

      if (isUpdate) {
        // --- MODO ACTUALIZACIÓN ---
        // 1. Mostrar mensaje de éxito
        this.showSuccessMessage('Cotización actualizada correctamente.', '¡Éxito!');
        
        // 2. Limpiar la lista de archivos a eliminar para no reenviarlos por error
        this.filesToDelete = [];

        // 3. Repoblar el formulario y los totales con los datos frescos del servidor
        this.patchFormWithData(returnedData);
        this.recalcularTotalesVisuales(returnedData);
        
        // 4. Marcar el formulario como 'pristine' (sin cambios) para deshabilitar el botón de "Actualizar",
        //    ya que el estado del formulario ahora coincide con lo que está guardado.
        this.quotationForm.markAsPristine();

      } else {
        // --- MODO CREACIÓN ---
        // 1. Mostrar mensaje de éxito
        this.showSuccessMessage('Hemos recibido tu solicitud. Redirigiendo...', '¡Éxito!');
        
        // 2. Redirigir al modo de edición de la cotización recién creada usando su nuevo ID.
        //    Esto permite al usuario ver inmediatamente los totales calculados por el backend
        //    y el estado final de su cotización.
        this.router.navigate(['/home/quotations', returnedData.id]);
      }
    } else if (response) {
      // Manejo de errores de negocio (ej: validaciones del backend)
      const errorMessage = response?.status?.error?.message || "No se pudo procesar la solicitud.";
      this.showWErrorMessage(errorMessage, 'Error en la Solicitud');
    }
    // El método 'handleError' ya se encarga de los errores de conexión o del servidor.
  }
}