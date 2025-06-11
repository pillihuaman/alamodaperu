import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {  NbButtonModule,  NbCardModule, NbInputModule } from '@nebular/theme';
import { Router } from '@angular/router'; // ✅ Esto es correcto
import { CorouselImage } from '../../../../@data/model/general/corouselImage';
import { listCorouseImages } from '../../../../@data/model/general/listCorouseImages';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { Const } from '../../../../utils/const';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RespProduct } from '../../../../@data/model/product/resp-product';
import { FileService } from '../../../../@data/services/file.service';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { FileMetadata } from '../../../../@data/model/files/fileMetadata';
import { FileRepository } from '../../../../@domain/repository/repository/file.repository';


@Component({
  selector: 'app-detail-main-page',
  templateUrl: './detail-main-page.component.html',
  styleUrls: ['./detail-main-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbButtonModule,    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NebularSharedModule, FormsModule,ReactiveFormsModule 

  ]
})
export class DetailMainPageComponent implements OnInit {
  lstim?: listCorouseImages;
    respProduct?: RespProduct;
  colru?: CorouselImage;
  urlApiImagen: String =
    `${Const.API_IMAGEN}` + `/v1/imagen/getImagen?codImagen=`;
    zoomed: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fileService: FileRepository) { }

ngOnInit(): void {
  let stateData = window.history.state as RespProduct;
debugger
  if (stateData && stateData.id) {
    this.respProduct = stateData;
  } else {
    // Intenta recuperar desde parámetros si el state está vacío
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.respProduct = { id } as RespProduct; // Carga parcial solo con ID
        this.loadImages(this.respProduct.id);
      }
    });
    return;
  }

  // Si cargó correctamente desde state
  this.loadImages(this.respProduct.id);
}

private loadImages(productId: string): void {
  this.fileService.getCatalogImagen(
    GeneralConstans.tipoImagenCatalog,
    productId
  ).subscribe({
    next: (files: FileMetadata[]) => {
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

      this.lstim = {
        tokenCol: productId,
        lstCorouseImages: images
      };
      this.colru = images[0];
    },
    error: err => {
      console.error('Error al obtener imágenes:', err);
    }
  });
}


  concateInput(str1: any, str2: any) {
    //console.log(str1.concat(str2));
    return str1.concat(str2);
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

  
}
