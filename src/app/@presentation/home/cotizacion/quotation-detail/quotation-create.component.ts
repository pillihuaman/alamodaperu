
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogService, NbSelectModule, NbCheckboxModule, NbAccordionModule, NbAlertModule } from '@nebular/theme';
import { catchError, map, of } from 'rxjs';

// Tus importaciones personalizadas
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { ModalComponent } from '../../../@common-components/modal/modal.component';

// Nuevos servicios y modelos


import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../../../../@data/services/quotation.service';
import { RespQuotation } from '../../../../@data/model/quotation/resp-quotation';
import { ChatbotComponent } from '../../../@common-components/chatbot/chatbot.component';

interface CotizacionItem {
  nombre: string;
  numeroCamisa: number | null;
  talla: string;
  cantidad: number;
   esConjuntoCompleto: boolean;
}

@Component({
  selector: 'quotation-create',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, NbButtonModule, NbCardModule,
    NbInputModule, NbIconModule, NbSelectModule, TableDatasourceComponent,NbCheckboxModule ,NbAccordionModule,NbAlertModule,ChatbotComponent
  ],
  templateUrl: './quotation-create.html',
  styleUrls: ['./quotation-create.scss']
})

// Modelo para definir la estructura de una fila

export class QuotationCreateComponent extends BaseImplementation<RespQuotation> implements OnInit {
  
  searchForm!: FormGroup;
    quotationForm!: FormGroup;
  // Datos para los selectores
  tallasDisponibles: string[] = ['S', 'M', 'L', 'XL', 'XXL', '6', '8', '10', '12', '14', '16'];
  
 // Precios diferenciados
  precioConjuntoCompleto = 65.00; // Polo + Short + Medias
  precioSoloPolo = 45.00;       // Solo Polo
  costoDisenoPorPrenda = 25.00;

  // Totales calculados
  cantidadTotalPrendas = 0;
  subtotalPrendas = 0;
  totalDiseno = 0;
  granTotal = 0;

  // Manejo de archivos
  logoFile: File | null = null;
  imagenesReferencia: File[] = [];
  maxImagenes = 4;
  logoPreviewUrl: string | ArrayBuffer | null = null;
  referenciaPreviews: { file: File, url: string }[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
     quotationService: QuotationService,
    spinnerService: SpinnerService,
    dialogService: NbDialogService,
    modalRepository: ModalRepository,
  ) {
    super(modalRepository, spinnerService, dialogService);
  }

  ngOnInit(): void {
    this.buildForm();
    
    // Escuchar los cambios en el formulario para recalcular los totales en tiempo real
    this.quotationForm.valueChanges.subscribe(() => {
      this.recalcularTotales();
    });
  }

  buildForm() {
    this.quotationForm = this.fb.group({
      // Aquí podrías agregar campos generales como nombre del cliente, etc.
      clienteNombre: ['', Validators.required],
      clienteEmail: ['', [Validators.required, Validators.email]],
      // El FormArray que manejará la tabla de ítems
      items: this.fb.array([])
    });
    // Añadir la primera fila por defecto al crear el formulario
    this.agregarItem();
  }

  // Getter para acceder fácilmente al FormArray desde el template
  get items(): FormArray {
    return this.quotationForm.get('items') as FormArray;
  }

  // Crea un FormGroup que representa una fila de la tabla
  crearItem(): FormGroup {
    return this.fb.group({
      // No necesitamos un campo para el numerado, se puede manejar con el índice del array
      nombre: ['', Validators.required],
      numeroCamisa: [null],
      talla: ['M', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      esConjuntoCompleto: [true, Validators.required] 
    });
  }

  // Añade una nueva fila (un nuevo FormGroup) al FormArray
  agregarItem(): void {
    this.items.push(this.crearItem());
  }

  // Elimina una fila del FormArray por su índice
  eliminarItem(index: number): void {
    // Evitar que se elimine la última fila
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  // Lógica para recalcular todos los costos
 recalcularTotales(): void {
    const itemsValue: CotizacionItem[] = this.items.value;
    
    this.cantidadTotalPrendas = itemsValue.reduce((sum, item) => sum + (item.cantidad || 0), 0);

    // El subtotal ahora depende del checkbox de cada fila
    this.subtotalPrendas = itemsValue.reduce((sum, item) => {
      const precioUnitario = item.esConjuntoCompleto ? this.precioConjuntoCompleto : this.precioSoloPolo;
      return sum + (precioUnitario * (item.cantidad || 0));
    }, 0);

    this.totalDiseno = this.cantidadTotalPrendas * this.costoDisenoPorPrenda;
    this.granTotal = this.subtotalPrendas + this.totalDiseno;
  }
  // Lógica para enviar la cotización
  enviarCotizacion(): void {
    if (this.quotationForm.invalid) {
      this.quotationForm.markAllAsTouched();
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    
    // Aquí usarías FormData para enviar los archivos junto con los datos JSON
    const formData = new FormData();
    formData.append('cotizacionData', JSON.stringify(this.quotationForm.value));
    
    if (this.logoFile) {
      formData.append('logo', this.logoFile, this.logoFile.name);
    }
    this.imagenesReferencia.forEach((file, index) => {
      formData.append(`referencia_${index}`, file, file.name);
    });

    console.log('Enviando FormData al backend...');
    // Lógica de envío con HttpClient que soporte FormData
    // this.httpClient.post('/api/cotizacion-con-archivos', formData).subscribe(...)
    alert('¡Cotización enviada con éxito!');
  }


    onLogoSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.logoFile = input.files[0];
      
      // Crear URL de previsualización para el logo
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.logoFile);
    }
  }
   onReferenciaSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const nuevosArchivos = Array.from(input.files);
      if (this.referenciaPreviews.length + nuevosArchivos.length > this.maxImagenes) {
        alert(`No puedes subir más de ${this.maxImagenes} imágenes de referencia.`);
        return;
      }

      // Crear URLs de previsualización para cada imagen de referencia
      nuevosArchivos.forEach(file => {
        this.imagenesReferencia.push(file); // Mantienes el array de archivos
        const reader = new FileReader();
        reader.onload = () => {
          this.referenciaPreviews.push({ file: file, url: reader.result as string });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  eliminarImagenReferencia(index: number) {
    // Eliminar tanto del array de archivos como del de previsualizaciones
    this.imagenesReferencia.splice(index, 1);
    this.referenciaPreviews.splice(index, 1);
  }

  eliminarLogo(): void {
    this.logoFile = null;
    this.logoPreviewUrl = null;
    const logoInput = document.getElementById('logo-input') as HTMLInputElement;
    if (logoInput) logoInput.value = '';
  }
}