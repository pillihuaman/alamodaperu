import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  NbButtonModule } from '@nebular/theme';
import { CorouselImage } from '../../../../@data/model/general/corouselImage';
import { listCorouseImages } from '../../../../@data/model/general/listCorouseImages';
import { DataService } from '../../../../@data/services/data.service';
import { ImagenTempService } from '../../../../@data/services/imagenTemp.service';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module'
import { GeneralConstans } from '../../../../utils/generalConstant';
import { ImagenCatchInformationComponent } from '../../../@common-components/imagen-catch-information/imagen-catch-information.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    ImagenCatchInformationComponent,ReactiveFormsModule  // Asegúrate de agregar el componente aquí si es standalone
  ],
})
export class MainPageComponent implements OnInit {
  constructor(
    private imagenData: DataService,
    private imagenTempService: ImagenTempService
  ) {}

  @Input() lstIMf: listCorouseImages[] = [];
  @Input() selectToken?: string = '';
  @Input() selectCountainerToken: any;

  @Output() updateImagen = new EventEmitter<CorouselImage>();

  ngOnInit(): void {
    debugger;
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
  }

  changeImage(listImagenes: listCorouseImages, image: CorouselImage) {
    this.selectToken = image.imagetoken;
    this.selectCountainerToken = image.imageCountainerToken;
  }

  enviarData(image: CorouselImage) {
    this.updateImagen.emit(image);
  }
}
