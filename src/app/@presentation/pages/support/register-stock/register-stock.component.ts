import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, Renderer2, ComponentFactoryResolver, Injector } from "@angular/core";
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BaseComponent } from "../../../../@data/model/general/baseComponent ";
import { Control } from "../../../../@data/model/general/control";
import { Size } from "../../../../@data/model/general/size";
import { TreeNode } from "../../../../@data/model/general/treeNode";
import { Imagen } from "../../../../@data/model/imagen/imagen";
import { ImagenDetail } from "../../../../@data/model/imagen/imagenDetail";
import { ImagenTempFile } from "../../../../@data/model/imagen/imagenTemFile";
import { Product } from "../../../../@data/model/product/product";
import { Stock } from "../../../../@data/model/product/stock";
import { DataService } from "../../../../@data/services/data.service";
import { ImagenTempService } from "../../../../@data/services/imagenTemp.service";
import { AuthenticationRepository } from "../../../../@domain/repository/repository/authentication.repository";
import { LocalRepository } from "../../../../@domain/repository/repository/local.repository";
import { DynamicComponent } from "../../../@common-components/dynamic/dynamic.component";
import { RouterButtonComponent } from "../../../@common-components/router-button/router-button.component";
import { DatePickerComponent } from "../../../@common-components/date-picker/date-picker.component";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";
import { NbDialogModule, NbLayoutModule, NbButtonModule, NbSidebarModule, NbCardModule, NbInputModule, NbIconModule } from "@nebular/theme";
import { NebularSharedModule } from "../../../../@domain/nebular-shared.module";

interface customStock {
  "ID Product"?: string;
  "Bar Code"?: string;
  Size?: Size[];
  "Expiration Date"?: Date;
  "Creation Date"?: Date;
  Count?: number;
}
@Component({
  selector: 'app-register-stock',
  templateUrl: './register-stock.component.html',
  styleUrls: ['./register-stock.component.scss'],
    standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    NbDialogModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbSidebarModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NebularSharedModule,
    ReactiveFormsModule,
    FormsModule,DatePickerComponent
],
})
export class RegisterStockComponent extends BaseComponent implements OnInit {
  listProductByUser?: Product[] = [];
  listImagenTemp?: Imagen[] = [
    {
      urlImagen:
        'http://localhost:8087/v1/imagen/getImagen?codImagen=6342acc01413e6298e29ef98',
    },
  ];
  imgPrincipal: any
  idTempUnique: string =""
  imagenTem?: any;
  uuidValue?: any;
  count?: any = 0;
  base64File?: String;
  selectImagen?: File;
  listFilePath?: String[] = [];
  filePath1?: String;
  filePath2?: String;
  filePath3?: String;
  filePath4?: String;
  img1?: ImagenDetail;
  img2?: ImagenDetail;
  img3?: ImagenDetail;
  img4?: ImagenDetail;
  myForm: FormGroup;
  lstfilePath?: ImagenDetail[] = [];
  idProductSelect: any;
  lstBarCode: any;
  register: any = 'Register';
  typeButton: any = 'typeButton';
  btn: any = 'btn btn-primary';
  truus: boolean = true;
  lstControl?: Control[];
  myDate?: any;
  datepicker?: any;
  locale?: any;
  customColumnInput: any = 'ID Product';
  defaultColumnsInput: any = ['Count', 'Bar Code',"Creation Date","Expiration Date"];
  datas?: TreeNode<customStock>[] = [];
  @ViewChild('inputFile') inputFile: ElementRef = {} as ElementRef;
  img: any;
  @ViewChild('container', { read: ViewContainerRef, static: true }) container?: ViewContainerRef;
  constructor(
    private renderer: Renderer2,
    private imagenTempService: ImagenTempService,
    public fb: FormBuilder,
    private dataService: DataService, private localservice: LocalRepository,
    private authenticationService: AuthenticationRepository, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector
  ) {
    super();
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
      name: [''],
      description: [''],
      idProduct: [''],
      barCode: [''],
      count: [''],
      expirationDate: [''],
    });
    this.lstButton;
    this.dataService.getData().subscribe((data) => {
      this.lstControl = data;


    });
    ;

    console.log(this.localservice.getLanguageCode());
    console.log(this.lstControl);
  }
  override ngOnInit(): void {
    // Obtener el usuario actual
    const userId = this.authenticationService.getCurrentUserValue?.id_user;
    if (!userId) {
      console.error("No user ID found.");
      return;
    }
  }


  createCOmponent() {
    ////debuger;
    this.container?.clear;
    const componetFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    const componentRef = componetFactory.create(this.injector);
    componentRef.instance.fileInput = this.imgPrincipal;


    //setAttribute('ng-star-inserted', 'foto-editor-item');
    componentRef.changeDetectorRef.detectChanges();
    this.container?.insert(componentRef.hostView);
    //const componetRef=this.container?.createComponent(componetFactory);
    //const dynamicComponent=componetRef?.instance;
    // componetRef?.instance?.fileInput!=this.imgPrincipal;
    // dynamicComponent?.fileInput!='ccs';

  }
  loadFile(event: any) {
    ////debuger;

    this.count++;
    const file: File[] = event.target.files;
    this.selectImagen = event.target.files[0];
    this.imgPrincipal = event;
    let imaFile: ImagenTempFile = { file: this.selectImagen };
    this.myForm?.patchValue({
      img: file,
    });
    this.myForm?.get('img')?.updateValueAndValidity();
    //if (this.filePath1 === undefined) {
    const readers = new FileReader();
    readers.onload = () => {
      //////debuger;
      this.filePath1 = readers.result as string;
      this.listFilePath?.push(this.filePath1);
      this.img1 = {
        name: this.selectImagen?.name,
        value: this.filePath1,
        index: 0,
      };
    };
    readers.readAsDataURL(this.selectImagen!);
    this.createCOmponent();

    /*} else if (this.filePath2 === undefined) {
      const readers1 = new FileReader();
      readers1.onload = () => {
        //////debuger;
        this.filePath2 = readers1.result as string;
        this.img2 = {
          name: this.selectImagen?.name,
          value: this.filePath2,
          index: 1,
        };
      };
      readers1.readAsDataURL(this.selectImagen!);
    } else if (this.filePath3 === undefined) {
      const readers1 = new FileReader();
      readers1.onload = () => {
        //////debuger;
        this.filePath3 = readers1.result as string;
        this.img3 = {
          name: this.selectImagen?.name,
          value: this.filePath3,
          index: 2,
        };
      };
      readers1.readAsDataURL(this.selectImagen!);
    } else if (this.filePath4 === undefined) {
      const readers1 = new FileReader();
      readers1.onload = () => {
        //////debuger;
        this.filePath4 = readers1.result as string;
        this.img4 = {
          name: this.selectImagen?.name,
          value: this.filePath4,
          index: 3,
        };
      };
      readers1.readAsDataURL(this.selectImagen!);
    }*/
    this.listFilePath?.forEach(element => {
      console.log(element.length)

    });

  }

  getCatalog() {
    ////debuger
    if (this.listFilePath?.length) {
      if (this.listFilePath?.length > 0) {
        let cont = 0;
        this.listFilePath.forEach(element => {
          cont++;
          const catalog = `
          <div>
            <img src="${element}" alt="Image"${cont}">
          </div>
        `;
          return catalog;

        });

      }
    }
    return '';
  }

  close(close: any) {
    //////debuger;
    if (close === 1) {
      this.filePath1 = undefined;
    } else if (close === 2) {
      this.filePath2 = undefined;
    }
    if (close === 3) {
      this.filePath3 = undefined;
    }
    if (close === 4) {
      this.filePath4 = undefined;
    }
    this.inputFile.nativeElement.value = null;
  }
  save() {
    ////debuger;
    this.lstfilePath = [];
    if (this.filePath1 && this.filePath1 !== '') {
      this.lstfilePath?.push(this.img1!);
      console.log(this.img1);
    }
    if (this.filePath2 && this.filePath2 !== '') {
      this.lstfilePath?.push(this.img2!);
    }
    if (this.filePath3 && this.filePath3 !== '') {
      this.lstfilePath?.push(this.img3!);
    }
    if (this.filePath4 && this.filePath4 !== '') {
      this.lstfilePath?.push(this.img4!);
    }

    if (this.lstfilePath && this.lstfilePath.length > 0) {
      //////debuger;
      let size: Size[] = [];
      let imageTem: Stock = {
        idProduct: this.idProductSelect,
        barCode: this.myForm.get('barCode')?.value,
        expirationDate: this.myForm.get('expirationDate')?.value,
        size: size,
        count: this.myForm.get('count')?.value,
      };

      /*  this.imagenTempService.registerImagenTemp(imageTem).subscribe(
        (value) => {},
        (error) => {}
      );*/
    }
  }
  changeProduct(values: any) {
    this.idProductSelect = values;
  }
}
