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
  NbAccordionModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogService,
  NbFormFieldModule, // <<< CORRECCIÓN: Módulo importado
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,   // <<< CORRECCIÓN: Módulo importado
  NbTabsetModule,    // <<< CORRECCIÓN: Módulo importado
  NbTooltipModule    // <<< CORRECCIÓN: Módulo importado
} from '@nebular/theme';

//------------------------------------------------
// PROJECT IMPORTS
//------------------------------------------------
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { QuotationService } from '../../../../@data/services/quotation.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { ReqQuotation } from '../../../../@data/model/quotation/req-quotation';
import { RespQuotation } from '../../../../@data/model/quotation/resp-quotation';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { ChatbotComponent } from '../../../@common-components/chatbot/chatbot.component';
import { GeneralConstans } from '../../../../utils/generalConstant';

// --- Modelos de Vista para gestionar el estado de los archivos ---
interface LogoPreview {
  file?: File;
  url: string | ArrayBuffer;
  id?: string;
  state: 'existing' | 'new' | 'empty';
}

interface ReferencePreview {
  file?: File;
  url: string | ArrayBuffer;
  id?: string;
  state: 'existing' | 'new';
}

@Component({
  selector: 'quotation-create',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    // <<< CORRECCIÓN: Todos los módulos de Nebular necesarios están ahora en el array de imports
    NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbSelectModule,
    NbCheckboxModule, NbAccordionModule, NbAlertModule, NbFormFieldModule,
    NbTabsetModule, NbTooltipModule, NbSpinnerModule,
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

  // <<< CORRECCIÓN: Se reincorporan las variables de estado
  isSubmitting = false;
  formSubmitted = false;

  // Propiedades de cálculo y configuración
  tallasDisponibles: string[] = ['S', 'M', 'L', 'XL', 'XXL', '6', '8', '10', '12', '14', '16'];
  precioConjuntoCompleto = 65.00;
  precioSoloPolo = 45.00;
  costoDisenoPorPrenda = 25.00;
  cantidadTotalPrendas = 0;
  subtotalPrendas = 0;
  totalDiseno = 0;
  granTotal = 0;
  maxImagenes = 4;

  // Propiedades de Archivos
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

    this.quotationForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.recalcularTotales();
      if (this.quotationForm.dirty) {
        this.quotationForm.markAsDirty();
      }
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
        this.isEditMode = false;
        return of(null);
      }),
      catchError(() => of(null)),
      finalize(() => {
        if (this.isEditMode) this.spinnerService.hide();
      })
    ).subscribe(response => {
      if (response?.payload) {
        this.patchFormWithData(response.payload);
        this.quotationForm.markAsPristine();
                  this.spinnerService.hide();
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
  }

  private setItems(itemsData: any[]): void {
    const itemsFormGroups = itemsData.map(item => this.fb.group({
      nombre: [item.playerName, Validators.required],
      numeroCamisa: [item.shirtNumber],
      talla: [item.size, Validators.required],
      cantidad: [item.quantity, [Validators.required, Validators.min(1)]],
      // <<< CORRECCIÓN: Mapea la propiedad `fullSet` (de la API) al control `esConjuntoCompleto`
      esConjuntoCompleto: [item.isFullSet ?? item.fullSet, Validators.required]
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

    if (!this.isEditMode) {
      this.agregarItem();
    }
  }

  get items(): FormArray {
    return this.quotationForm.get('items') as FormArray;
  }

  crearItem(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      numeroCamisa: [null],
      talla: ['M', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      // <<< CORRECCIÓN: Se mantiene el nombre consistente del control
      esConjuntoCompleto: [true, Validators.required]
    });
  }

  agregarItem(): void {
    this.items.push(this.crearItem());
  }

  eliminarItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
      this.quotationForm.markAsDirty();
    }
  }

  onLogoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const newFile = input.files[0];
      if (this.logoPreview.state === 'existing' && this.logoPreview.id) {
        this.filesToDelete.push(this.logoPreview.id);
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = { file: newFile, url: reader.result!, state: 'new' };
      };
      reader.readAsDataURL(newFile);
      input.value = '';
    }
    this.quotationForm.markAsDirty();
  }

  eliminarLogo(): void {
    if (this.logoPreview.state === 'existing' && this.logoPreview.id) {
      this.filesToDelete.push(this.logoPreview.id);
    }
    this.logoPreview = { state: 'empty', url: '' };
    this.quotationForm.markAsDirty();
  }

  onReferenciaSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const nuevosArchivos = Array.from(input.files);
      if (this.referenciaPreviews.length + nuevosArchivos.length > this.maxImagenes) {
        this.showWarningMessage(`No puedes subir más de ${this.maxImagenes} imágenes.`, 'Límite Excedido');
        return;
      }
      nuevosArchivos.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.referenciaPreviews.push({ file, url: reader.result as string, state: 'new' });
        };
        reader.readAsDataURL(file);
      });
      input.value = '';
    }
    this.quotationForm.markAsDirty();
  }

  eliminarImagenReferencia(index: number): void {
    const previewToRemove = this.referenciaPreviews[index];
    if (previewToRemove.state === 'existing' && previewToRemove.id) {
      this.filesToDelete.push(previewToRemove.id);
    }
    this.referenciaPreviews.splice(index, 1);
    this.quotationForm.markAsDirty();
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

    const quotationData: ReqQuotation = {
      clienteNombre: this.quotationForm.value.clienteNombre,
      clienteEmail: this.quotationForm.value.clienteEmail,
      clienteTelefono: this.quotationForm.value.clienteTelefono,
      descripcionDetallada: this.quotationForm.value.descripcionDetallada,
      items: this.quotationForm.value.items.map((item: any) => ({
        nombre: item.nombre,
        numeroCamisa: item.numeroCamisa,
        talla: item.talla,
        cantidad: item.cantidad,
        esConjuntoCompleto: item.esConjuntoCompleto,
        tipoCostoProduccion: GeneralConstans.productionCostSublimadoTeamFutbol
      }))
    };

    let submissionObservable: Observable<any>;
    if (this.isEditMode && this.quotationId) {
      const logoFile = this.logoPreview.state === 'new' ? this.logoPreview.file : undefined;
      const referenceFiles = this.referenciaPreviews.filter(p => p.state === 'new' && p.file).map(p => p.file!);
      submissionObservable = this.quotationService.updateQuotation(this.quotationId, quotationData, logoFile, referenceFiles, this.filesToDelete);
    } else {
      const logoFile: File | null = (this.logoPreview.state === 'new' && this.logoPreview.file) ? this.logoPreview.file : null;
      const referenceFiles = this.referenciaPreviews.filter(p => p.state === 'new' && p.file).map(p => p.file!);
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
    if (response?.status?.success) {
      const message = isUpdate ? 'Cotización actualizada correctamente.' : 'Hemos recibido tu solicitud.';
      this.showSuccessMessage(message, '¡Éxito!');
      this.router.navigate(['/home/quotations']);
    } else if (response) {
      this.showWErrorMessage("No se pudo procesar la solicitud.", 'Error en la Solicitud');
    }
  }

  recalcularTotales(): void {
    const itemsValue: any[] = this.items.value;
    this.cantidadTotalPrendas = itemsValue.reduce((sum, item) => sum + (item.cantidad || 0), 0);
    this.subtotalPrendas = itemsValue.reduce((sum, item) => {
      const precioUnitario = item.esConjuntoCompleto ? this.precioConjuntoCompleto : this.precioSoloPolo;
      return sum + (precioUnitario * (item.cantidad || 0));
    }, 0);
    this.totalDiseno = this.cantidadTotalPrendas * this.costoDisenoPorPrenda;
    this.granTotal = this.subtotalPrendas + this.totalDiseno;
  }
}