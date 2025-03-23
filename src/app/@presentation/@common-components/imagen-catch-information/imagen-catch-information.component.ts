import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SupportService } from '../../../@data/services/support.service';
import { Const } from '../../../utils/const';
import { HttpClientModule } from '@angular/common/http';
import { NbButtonModule} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-imagen-catch-information',
  templateUrl: './imagen-catch-information.component.html',
  styleUrls: ['./imagen-catch-information.component.scss'],
  standalone: true,
  imports: [CommonModule,  NbButtonModule,
      RouterModule,
      NbButtonModule,
      NebularSharedModule ], // Importar módulos necesarios
})
export class ImagenCatchInformationComponent implements OnInit {
  constructor(private supportService: SupportService) {}

  @Input() image: any;
  urlApiImagen: string = `${Const.API_IMAGEN}/v1/imagen/getImagen?codImagen=`;
  @Input() urlImagen?: any;

  ngOnInit(): void {
    if (this.image) {
      console.log(this.image);
      console.log(this.image.firstObject);
      console.log(this.image.attr);
    }
  }

  clickCount(event: any) {
    console.log(event);
  }

  concateInput(str1: any, str2: any) {
    return str1.concat(str2);
  }

  dataget() {
    console.log(this.image);
    this.supportService.saveClickCountImagen(this.image).subscribe(
      (value) => {
        if (value) {
          console.log(JSON.stringify(value));
        }
      },
      (error) => {
        console.error('Error al guardar el conteo de clics', error);
      }
    );
  }
}
