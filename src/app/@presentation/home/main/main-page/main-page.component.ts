
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NbButtonModule } from '@nebular/theme';
import { CorouselImage } from '../../../../@data/model/general/corouselImage';
import { listCorouseImages } from '../../../../@data/model/general/listCorouseImages';
import { DataService } from '../../../../@data/services/data.service';
import { ImagenTempService } from '../../../../@data/services/imagenTemp.service';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module'
import { GeneralConstans } from '../../../../utils/generalConstant';
import { ImagenCatchInformationComponent } from '../../../@common-components/imagen-catch-information/imagen-catch-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../@data/services/ProductService';
import { ProductViewImagenRepository } from '../../../../@domain/repository/repository/product-view-imagen-repository';
import { FileService } from '../../../../@data/services/file.service';
import { FileRepository } from '../../../../@domain/repository/repository/file.repository';
import { ProductRepository } from '../../../../@domain/repository/repository/ProductRepository';
import { FileMetadata } from '../../../../@data/model/files/fileMetadata';
import { CatalogImageWrapper } from '../../../../@data/model/files/catalogImageWrapper';
import { RespImagenProductRank } from '../../../../@data/model/product/resp-imagen-product-rank';
import { RespProduct } from '../../../../@data/model/product/resp-product';
import { AuthenticationRepository } from '../../../../@domain/repository/repository/authentication.repository';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NebularSharedModule,
    ImagenCatchInformationComponent,
    ReactiveFormsModule
  ],
})
export class MainPageComponent implements OnInit {

  constructor(
    private imagenData: DataService,
    private imagenTempService: ImagenTempService,
    private productViewImagenRepository: ProductViewImagenRepository,
    private fileService: FileRepository,
    private productService: ProductRepository, private router: Router,private authService:AuthenticationRepository
  ) { }

  @Input() catalogImagesMetadata: RespImagenProductRank[] = [];
  @Input() productosCargados: RespProduct[] = []; // ✅ lista de productos ya disponibles
  @Input() selectToken?: string = '';
  @Input() selectCountainerToken: any;
  @Output() updateImagen = new EventEmitter<CorouselImage>();
  ngOnInit(): void {
    this.productViewImagenRepository.findAllViewsProducImag().subscribe({
      next: (value) => {
        if (value?.payload) {
          
          this.catalogImagesMetadata = value.payload;
          // Iterar sobre todos los productos para obtener sus imágenes
          this.catalogImagesMetadata.forEach((item: RespImagenProductRank, index: number) => {
            const productId: string = item?.respProduct?.id ?? '';
            
            this.fileService.getCatalogImagen(GeneralConstans.tipoImagenCatalog, productId).subscribe({
              next: (files: FileMetadata[]) => {
                // Asignar directamente la lista de FileMetadata al producto correspondiente
                if (this.catalogImagesMetadata[index].respProduct) {
                  // this.catalogImagesMetadata[index].respProduct.fileMetadata = files;
                  this.catalogImagesMetadata[index].respProduct.fileMetadata = files.length > 0 ? [files[0]] : [];

                }
              },
              error: (err) => {
                console.error('❌ Error al obtener catálogo de imágenes para producto con ID', productId, err);
              }
            });
          });

          console.log('📦 Lista inicial cargada (con productos acoplados):', this.catalogImagesMetadata);
        }
      },
      error: (error) => {
        console.error('❌ Error al cargar imágenes', error);
      }
    });
  }


  /*
  this.productService.saveView().subscribe(
    (value) => {

      if (value?.payload) {
        console.log('Vista guardada correctamente', value.payload);
      }
    });


  this.productService.findAllViewsProducImag().subscribe(
    (value) => {
      if (value?.payload) {
        this.lstIMf = value.payload;
      }
    },
    (error) => {
      console.error('Error al cargar imágenes', error);
    }
  );
  this.imagenTempService
    .listMainTopImagen(GeneralConstans.page, GeneralConstans.perPage)
    .subscribe(
      (value) => {
        if (value?.payload) {
          this.lstIMf = value.payload;
        }
      },
      (error) => {
        console.error('Error al cargar imágenes', error);
      }
    );
    */

  changeImage(listImagenes: listCorouseImages, image: CorouselImage) {
    this.selectToken = image.imagetoken;
    this.selectCountainerToken = image.imageCountainerToken;
  }

  enviarData(image: CorouselImage) {
    this.updateImagen.emit(image);
  }
  viewCatalog(images: RespProduct | undefined): void {
    
    if (!images) {
      return;
    }
    this.router.navigate(['/home/detail'], { state: images });
  }
}
