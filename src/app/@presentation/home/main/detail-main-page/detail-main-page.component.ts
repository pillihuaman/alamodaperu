import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { CorouselImage } from '../../../../@data/model/general/corouselImage';
import { listCorouseImages } from '../../../../@data/model/general/listCorouseImages';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { Const } from '../../../../utils/const';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RespProduct } from '../../../../@data/model/product/resp-product';
import { FileRepository } from '../../../../@domain/repository/repository/file.repository';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { FileMetadata } from '../../../../@data/model/files/fileMetadata';
import { ChatbotComponent } from '../../../@common-components/chatbot/chatbot.component';

@Component({
  selector: 'app-detail-main-page',
  templateUrl: './detail-main-page.component.html',
  styleUrls: ['./detail-main-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule, // Importante para los íconos
    NbInputModule,
    NebularSharedModule,
    FormsModule,
    ReactiveFormsModule,ChatbotComponent
  ]
})
export class DetailMainPageComponent implements OnInit {
  // --- Datos de tu componente original ---
  respProduct?: RespProduct;
  lstim?: listCorouseImages;
  colru?: CorouselImage;
  zoomed: boolean = false;

  // --- Datos de Relleno para la Maqueta "Temu" ---
  dummyRating = 4.8;
  dummyReviewsCount = "1.2k+";
  dummyPrice = 40.50;
  dummyOldPrice = 50.90;
  selectedColorIndex = 0;
  selectedSize: string | null = null;
  quantity = 1;

  // Datos estáticos para los selectores
  colors = [
    { name: 'Negro', imageUrl: 'https://i.imgur.com/gK6A4Lq.jpeg' },
    { name: 'Rojo', imageUrl: 'https://i.imgur.com/eB44aVn.jpeg' },
    { name: 'Azul', imageUrl: 'https://i.imgur.com/zN23pE5.jpeg' },
  ];
  sizes = ['S', 'M', 'L', 'XL','2XL','3XL'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileService: FileRepository
  ) { }

  ngOnInit(): void {
    const stateData = window.history.state as RespProduct;

    if (stateData && stateData.id) {
      this.respProduct = stateData;
      this.loadImages(this.respProduct.id);
    } else {
      this.activatedRoute.params.subscribe(params => {
        // Usamos un ID por defecto si no viene ninguno para que la maqueta funcione
        const id = params['id'] || '';
        if (!this.respProduct) {
             // =======================================================
             // == INICIO: Datos de relleno actualizados con "tags"  ==
             // =======================================================
             this.respProduct = {
                id,
                name: 'Poleras en Peluche',
                description: 'Experimenta la máxima comodidad con nuestras poleras en peluche. Fabricado con tela peluche de alta calidad, ofrece una sensación suave y un look moderno y relajado. Perfecto para cualquier ocasión casual.',
                tags: ['Moda Invierno', 'Ropa Cómoda', 'Peluche', 'Tendencia 2025'] // <-- ETIQUETAS DE EJEMPLO
             } as RespProduct;
             // =======================================================
             // == FIN: Datos de relleno actualizados                ==
             // =======================================================
        }
        this.loadImages(id);
      });
    }

    // Escuchar la tecla ESC para cerrar el zoom
    window.addEventListener('keydown', (e) => e.key === 'Escape' && (this.zoomed = false));
  }

    public getChatbotContext(): string {
    // Si el producto o su nombre aún no se han cargado, devuelve un contexto genérico.
    if (!this.respProduct?.name) {
      return 'producto-general';
    }

    // Formatea el nombre para usarlo como contexto:
    return this.respProduct.name
      .toLowerCase() // 1. Convierte todo a minúsculas
      .replace(/\s+/g, '-') // 2. Reemplaza uno o más espacios con un guion
      .replace(/[^a-z0-9-]/g, ''); // 3. Elimina cualquier caracter que no sea letra, número o guion
  }


  private loadImages(productId: string): void {
    this.fileService.getCatalogImagen(GeneralConstans.tipoImagenCatalog, productId).subscribe({
      next: (files: FileMetadata[]) => {
        if (files && files.length > 0) {
            const images: CorouselImage[] = files.map((file, index) => ({
                imageSrc: file.url ?? '',
                imageAlt: file.filename,
                imagetoken: file.id,
                firstObject: index === 0 ? 'true' : 'false',
                index,
                imageCountainerToken: productId,
                indicators: true,
                idDetail: file.productId
            }));

            this.lstim = { tokenCol: productId, lstCorouseImages: images };
            this.colru = images[0];
        } else {
            // Cargar imágenes de relleno si el producto no tiene
            this.loadMockImages();
        }
      },
      error: err => {
        console.error('Error al obtener imágenes, cargando datos de relleno:', err);
        this.loadMockImages(); // Cargar imágenes de relleno en caso de error
      }
    });
  }

  private loadMockImages(): void {
      const mockImages: CorouselImage[] = [
        { imageSrc: 'https://i.imgur.com/gK6A4Lq.jpeg', imageAlt: 'Polo Negro', imagetoken: 'mock1' },
        { imageSrc: 'https://i.imgur.com/eB44aVn.jpeg', imageAlt: 'Polo Rojo', imagetoken: 'mock2' },
        { imageSrc: 'https://i.imgur.com/zN23pE5.jpeg', imageAlt: 'Polo Azul', imagetoken: 'mock3' },
      ];
      this.lstim = { tokenCol: 'default-product-id', lstCorouseImages: mockImages };
      this.colru = mockImages[0];
  }


  // --- Métodos para la Interfaz "Temu" ---

  selectColor(index: number): void {
    this.selectedColorIndex = index;
  }

  selectSize(size: string): void {
    this.selectedSize = this.selectedSize === size ? null : size;
  }

  changeQuantity(amount: number): void {
    const newQuantity = this.quantity + amount;
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
    }
  }

  changeFothoDetail(image: any) {
    this.colru = image;
  }

  nextImage(): void {
    if (!this.lstim?.lstCorouseImages || !this.colru) return;
    const currentIndex = this.lstim.lstCorouseImages.findIndex(img => img.imagetoken === this.colru?.imagetoken);
    const nextIndex = (currentIndex + 1) % this.lstim.lstCorouseImages.length;
    this.colru = this.lstim.lstCorouseImages[nextIndex];
  }

  prevImage(): void {
    if (!this.lstim?.lstCorouseImages || !this.colru) return;
    const currentIndex = this.lstim.lstCorouseImages.findIndex(img => img.imagetoken === this.colru?.imagetoken);
    const prevIndex = (currentIndex - 1 + this.lstim.lstCorouseImages.length) % this.lstim.lstCorouseImages.length;
    this.colru = this.lstim.lstCorouseImages[prevIndex];
  }

  getWhatsAppLink(): string {
    const productName = this.respProduct?.name || 'este producto';
    const selectedColor = this.colors[this.selectedColorIndex]?.name || 'No seleccionado';
    const selectedSize = this.selectedSize || 'No seleccionada';
    const selectedImageUrl = this.colru?.imageSrc;
    const messageParts = [
      `Hola, quiero más información sobre este producto: *${productName}*`,
      `\n- *Color:* ${selectedColor}`,
      `- *Talla:* ${selectedSize}`,
      `- *Cantidad:* ${this.quantity}`
    ];
    if (selectedImageUrl) {
      messageParts.push(`\n- *Imagen de referencia:* ${selectedImageUrl}`);
    }
    const text = messageParts.join('\n');
    return `https://wa.me/51933418411?text=${encodeURIComponent(text)}`;
  }
}