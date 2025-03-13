import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NbLayoutModule, NbButtonModule, NbSidebarModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { Router } from '@angular/router'; // ✅ Esto es correcto
import { CorouselImage } from '../../../../@data/model/general/corouselImage';
import { listCorouseImages } from '../../../../@data/model/general/listCorouseImages';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { Const } from '../../../../utils/const';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-detail-main-page',
  templateUrl: './detail-main-page.component.html',
  styleUrls: ['./detail-main-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // ✅ Se agrega para que reconozca <router-outlet>
    NbButtonModule, NbSidebarModule, NbLayoutModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NebularSharedModule, FormsModule,ReactiveFormsModule 

  ]
})
export class DetailMainPageComponent implements OnInit {
  lstim?: listCorouseImages;
  colru?: CorouselImage;
  urlApiImagen: String =
    `${Const.API_IMAGEN}` + `/v1/imagen/getImagen?codImagen=`;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.lstim = window.history.state; // ✅ Se usa `window.history.state`
    }
  
    if (this.lstim) {
      this.lstim?.lstCorouseImages?.forEach((x) => {
        this.colru = x;
      });
      console.log(JSON.stringify(this.lstim));
    }
  }
  concateInput(str1: any, str2: any) {
    //console.log(str1.concat(str2));
    return str1.concat(str2);
  }
  changeFothoDetail(image: any) {
    this.colru = image;
  }
}
