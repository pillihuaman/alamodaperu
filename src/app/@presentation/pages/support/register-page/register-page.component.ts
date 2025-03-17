import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NbButtonModule, NbCardModule, NbComponentStatus, NbDialogModule, NbDialogService, NbIconModule, NbInputModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { map } from 'rxjs';
import { ModalType } from '../../../../@data/model/general/enumModal';
import { Modal } from '../../../../@data/model/general/modal';
import { PageRequest } from '../../../../@data/model/general/pageRequest';
import { PageResponse } from '../../../../@data/model/general/pageResponse';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../@domain/repository/repository/support.repository';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { Utils } from '../../../../utils/utils';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { ValidationMessageComponent } from "../../../@common-components/validation-message/validation-message.component";
import { TableDatasourceComponent } from "../../../@common-components/table-datasource/table-datasource.component";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
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
    FormsModule,
    ValidationMessageComponent,
    TableDatasourceComponent
],
})
export class RegisterPageComponent  extends BaseImplementation implements OnInit {
  pageRequestForm!: FormGroup;
  pageRequest?: PageRequest;
  datas?: TreeNode<PageResponse>[] = [];
  teestMod: string = "tees";
  //page?: number = GeneralConstans.page
 // pageSize?: number = GeneralConstans.perPage;
  isLoading = false;
  hasMorePagesT = false;
  searchButtonDisabled = true;
  typeOfSearch: any;
  listError: any;
  defaultColumnsInput: any = ['id', 'title', "content", "isPublished", "metaKeywords", "metaDescription"];
  columnMappin(): { [key: string]: string } {
    return {
      id: 'ID',
      title: 'Page Title',
      content: 'Page Content',
      isPublished: 'Published',
      metaKeywords: 'Keywords',
      metaDescription: 'Description'

    };

  }
   processDataResult?:any;
  constructor(private fb: FormBuilder, private supportService: SupportRepository, private modalRepository: ModalRepository,
    public dialog: MatDialog, private spinnerService: SpinnerService,private dialogService: NbDialogService) {
    super();
    this.pageRequest = {};
  }

  ngOnInit(): void {
    this.buildForm();
    this.findByDefualt()
  }


  handleActionClick(event: any) {
    const modal: Modal = {
       data: event.data,
       description: event.data.any,
       typeDescription:ModalType.QUESTION.toString()
     };
     
     const dialogRef = this.dialogService.open(ModalComponent, {
       context: {
         rowData: modal // Pass the data to the modal
       } as any
 
     });
     //debuger
     dialogRef.componentRef.instance.deleteConfirmed.subscribe(() => {
       this.handleDeleteAction(event); // Implement logic to delete data
     });
   }
  isNewPage(): boolean {
    return !this.pageRequestForm.get('id')?.value;
  }

  buildForm() {
    this.pageRequestForm = this.fb.group({
      id: [''],
      title: [this.pageRequest?.title, Validators.required],
      content: [this.pageRequest?.content],
      url: [this.pageRequest?.url],
      isPublished: [this.pageRequest?.isPublished],
      metaKeywords: [this.pageRequest?.metaKeywords],
      metaDescription: [this.pageRequest?.metaDescription],
      idToFind: '',
      titleToFind: '',
      contentToFind: '',
      urlToFind: '',
    });
  }

  findPagesProcess() {

    this.spinnerService.show();
    /*const columnNamesMapping: { [key: string]: string } = {
      id: 'ID',
      title: 'Page Title',
      content: 'Page Content',
      isPublished: 'Published',
      metaKeywords: 'Keywords',
      metaDescription: 'Description'

    };*/
    const id = this.pageRequestForm.value.idToFind || '';
    const title = this.pageRequestForm.value.titleToFind || '';
    const content = this.pageRequestForm.value.contentToFind || '';
    const url = this.pageRequestForm.value.urlToFind || '';
    //debuger
    this.supportService.findPages(this.page, this.pageSize, id, title,
      content, url).pipe(
        map((value) => {
          let respo: PageResponse[] = value.payload;
         /* let copyStock: TreeNode<PageResponse>[] = [];
          respo.forEach((value, index) => {
            let transformedData: any = {
            };
            for (const key in value) {
              if (this.columnMappin()[key]) {
                transformedData[this.columnMappin()[key]] = value[key];
              } else {
                transformedData[key] = value[key];
              }
            }

            let costuItem: TreeNode<PageResponse> = { data: transformedData }
            copyStock.push(costuItem);
          });*/


          return  this.customizePropertyNames(respo, this.columnMappin());;
        })
      ).subscribe(
        (data) => {
          this.datas = data;
          console.log("Data source page", this.datas);
          
          if (this.datas && this.datas.length > 0) {
            console.log("Data" + Object.keys(this.datas[0].data))
            this.defaultColumnsInput = Object.keys(this.datas[0].data);
            this.hasMorePagesT = true;
          } else {
            this.hasMorePagesT = false;
          }
  
          this.spinnerService.hide();

        },
        (error) => {
          if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
            error.error.data.payload.forEach((errorItem: any) => {
              const controlName = errorItem.propertyPath;
              const errorMesagge = errorItem.valExceptionDescription;
              this.pageRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
            });
          }
          this.spinnerService.hide();

        }

      );
  }

  onSubmit() {
    if (this.pageRequestForm.valid) {
      const formValues = this.pageRequestForm.value;
      this.spinnerService.show();
      this.supportService.savePage(formValues).subscribe(
        (value) => {
          // Handle success
          let nbComponentStatus: NbComponentStatus = 'success';
          this.modalRepository.showToast(nbComponentStatus, "Save Succes", "Succes");
          this.pageRequestForm.reset();
          setTimeout(() => {
            window.location.reload();
          }, 600);
          this.spinnerService.hide();
        },
        (error) => {
          ;
          // Handle error

          if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
            // Map the errors to the form controls
            error.error.data.payload.forEach((errorItem: any) => {
              const controlName = errorItem.propertyPath;
              const errorMesagge = errorItem.valExceptionDescription;

              this.pageRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
            });
          }
          this.spinnerService.hide();
        }

      );
      console.log('Form values:', formValues);
    }
  }
  handleDeleteAction(row: TreeNode<any>): void {
  
    console.log('Deleting:', row.data);
    if (row.data.ID !== undefined) {
      const  id:String=row.data.ID;
    this.supportService.deletePages(id).subscribe(
      (value) => {
        // Handle success
        let nbComponentStatus: NbComponentStatus = 'success';
  
        this.pageRequestForm.reset();
        this.spinnerService.hide();
        this.findPagesProcess();
      },
      (error) => {
        ;
        // Handle error

        if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
          // Map the errors to the form controls
          error.error.data.payload.forEach((errorItem: any) => {
            const controlName = errorItem.propertyPath;
            const errorMesagge = errorItem.valExceptionDescription;

            this.pageRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
          });
        }
        this.spinnerService.hide();
      }

    );
    }
  }


  override onPageChange(page: number): void {
    ;
    this.page = page;
    this.findByDefualt()
  }

  override onPageSizeChange(pageSize: number): void {
    ;
    //this.pageSize = pageSize;
    //this.findPages();
  }

  checkInputs() {
    //declare input to find 
    ////debuger;
    const idToFind = this.pageRequestForm.get('idToFind')?.value || '';
    const titleToFind = this.pageRequestForm.get('titleToFind')?.value || '';
    const contentToFind = this.pageRequestForm.get('contentToFind')?.value || '';
    const urlToFind = this.pageRequestForm.get('urlToFind')?.value || '';

    this.searchButtonDisabled = !(idToFind || titleToFind || contentToFind || urlToFind);
    if (this.searchButtonDisabled) {     
     this.page = GeneralConstans.page
      this.typeOfSearch = GeneralConstans.typeSearchDefault
      this.findPagesProcess();
    }
   // this.validateObjectID();
  }

  override findByparameter() {
 
    //  lista de errores
    this.listError = this.validateObjectID();
    if (this.listError.length === 0) {
      this.pageRequestForm.get('idToFind')?.markAsTouched();
      this.page = GeneralConstans.page
      this.pageSize = GeneralConstans.perPage;
      this.typeOfSearch = GeneralConstans.typeSearchEspecific
      this.findPagesProcess();
    }
  }
  override findByDefualt() {

    this.typeOfSearch = GeneralConstans.typeSearchDefault
    this.findPagesProcess();
  }

  validateObjectID(): string[] {
    const idToFind = this.pageRequestForm.get('idToFind')?.value || '';
    const errorMessages: string[] = [];
    // Validate the idToFind control
    const isIdValid = Utils.isValidObjectId(idToFind);
    if (!Utils.empty(idToFind)) {
      if (!isIdValid) {
        // Handle the case when validation fails, e.g., add an error message to the array
        errorMessages.push('ID is not valid.');
      }
    }
    // Add more validation logic and error messages as needed
    return errorMessages;
  }

}
