import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogModule, NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogService, NbLayoutModule, NbComponentStatus, NbAccordionModule } from '@nebular/theme';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { ModalService } from '../../../../@data/services/modal.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { EmployeeResponse } from '../../../../@data/model/employee/employeeResponse';
import { EmployeeRequest } from '../../../../@data/model/employee/employeRequest';
import { ModalType } from '../../../../@data/model/general/enumModal';
import { Modal } from '../../../../@data/model/general/modal';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { EmployeeService } from '../../../../@data/services/employee.service';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../@domain/repository/repository/support.repository';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { Utils } from '../../../../utils/utils';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';

@Component({
  selector: 'app-employee',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      NbButtonModule,
      NbCardModule,
      NbInputModule,
      NbIconModule,
      FormsModule,    //✅ REQUIRED TO FIX LAYOUT ERROR
      NbDialogModule,      NbLayoutModule,NbAccordionModule,NebularSharedModule,TableDatasourceComponent
      ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent extends BaseImplementation implements OnInit {
  employeRequestForm!: FormGroup;
  employeRequest?: EmployeeRequest;
  datas?: TreeNode<EmployeeResponse>[] = [];
  teestMod: string = "tees";
  isModalVisible: boolean = false;
  //page?: number = GeneralConstans.page
  //pageSize?: number = GeneralConstans.perPage;
  isLoading = false;
   isdelelete : any;
  searchButtonDisabled = true;
  typeOfSearch: any;
  listError: any;
  @Output() deleteAction = new EventEmitter<TreeNode<any>>();
  defaultColumnsInput: any = ['id', 'name', "lastName", "document",
    "startDate", "finishDate", "totalHours", "total"];
  columnMappin(): { [key: string]: string } {
    return {
      id: 'ID',
      name: 'Name',
      lastName: 'Last Name',
      startDate: 'Start Date',
      finishDate: 'Finish Date',
      totalHours: 'Total Hours',
      total: 'Total',
      document: 'Document',

    };

  }
  isRegisterEmployeeExpanded: boolean = false; // Set to true to initially expand the section
  hasMorePagesT: boolean = true;
  processDataResult?: any;
  constructor(private fb: FormBuilder, private supportService: SupportRepository, private modalRepository: ModalRepository,
    private dialogService: NbDialogService, private spinnerService: SpinnerService, private datePipe: DatePipe, 
    private employeeService: EmployeeService,private modalService: ModalService) {
    super();
    this.employeRequest = {
      finishDateFormatted: '', // Initialize with an empty string
      startDateFormatted: '',
    };
  }
  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate || ''; // Return the formatted date or an empty string if the input date is invalid
  }
  ngOnInit(): void {
    this.page = 1;
    this.buildForm();
    this.employeeService.employees$.subscribe((employees) => {
      this.datas = this.customizePropertyNames(employees, this.columnMappin());
      if (this.datas && this.datas.length > 0) {
        this.defaultColumnsInput = Object.keys(this.datas[0].data);
        this.updateHasMorePagesT(true);
      } else {
        this.updateHasMorePagesT(false);
        
      }
      this.spinnerService.hide();
    });
    this. findEmproyeeProcess();
  }
  findByDefualtg() {
    //;
    const id = this.employeRequestForm.value.idToFind || '';
    const name = this.employeRequestForm.value.nameToFind || '';
    const lastName = this.employeRequestForm.value.lastNameToFind || '';
    const document = this.employeRequestForm.value.documentToFind || '';
    this.employeeService.fetchEmployees(this.page ?? GeneralConstans.page, this.pageSize ?? GeneralConstans.perPage, id, name, lastName, document);

  }

  deleting(event: any) {
    debugger
   const modal: Modal = {
      data: event.data,
      description: event.data.Name,
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
    return !this.employeRequestForm.get('id')?.value;
  }

  buildForm() {
    this.employeRequestForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: [''],
      startDate: [''],
      finishDate: [''],
      document: ['', Validators.required],
      typeDocument: [''],
      salaryHours: [''],
      idToFind: [''],
      nameToFind: [''],
      lastNameToFind: [''],
      documentToFind: [''],
    });
  }


  findEmproyeeProcess() {
    this.spinnerService.show();
    const id = this.employeRequestForm.value.idToFind || '';
    const name = this.employeRequestForm.value.nameToFind || '';
    const lastName = this.employeRequestForm.value.lastNameToFind || '';
    const document = this.employeRequestForm.value.documentToFind || '';

    this.supportService.findEmployee(this.page, this.pageSize, id, name, lastName, document).pipe(
        map(value => {
            let respo: EmployeeResponse[] = value?.payload || []; // Asegurar que no sea null o undefined
            return this.customizePropertyNames(respo, this.columnMappin());
        }),
        catchError(error => {
          debugger
            console.error("Error fetching employees:", error);
            return of([]); // Si hay error, retornar una lista vacía para evitar que la app falle
        })
    ).subscribe(data => {
        this.datas = data;
        console.log("Data source page", this.datas);
debugger
        if (this.datas && this.datas.length > 0) {
            this.defaultColumnsInput = Object.keys(this.datas[0].data);
            this.updateHasMorePagesT(true);
        } else {
            this.updateHasMorePagesT(false);
            this.showNoDataMessage(); // Llamar función para alertar que no hay datos
        }

        this.spinnerService.hide();
    });
}


  showNoDataMessage() {
    let nbComponentStatus: NbComponentStatus = 'warning';
  //  this.modalRepository.showToast(nbComponentStatus, "No se encontraron empleados con los filtros ingresados", "Succes");
}
  handleDeleteAction(row: TreeNode<any>): void {
    console.log('Deleting:', row);
    if (row.data.ID !== undefined) {
      const id: String = row.data.ID;
      this.supportService.deleteEmployee(id).subscribe(
        (value) => {
          let nbComponentStatus: NbComponentStatus = 'success';
          this.modalRepository.showToast(nbComponentStatus, "delete Succes", "Succes");
          this.spinnerService.hide();
          this.isdelelete=row;
        },
        (error) => {
          debugger
          if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
            error.error.data.payload.forEach((errorItem: any) => {
              const controlName = errorItem.propertyPath;
              const errorMesagge = errorItem.valExceptionDescription;
              this.employeRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
            });
          }
          this.spinnerService.hide();
        }

      );
    }

  }
  handleEditicionAction(row: TreeNode<any>): void {
    if (!row?.data?.ID) {
      console.warn("Invalid employee data.");
      return;
    }
  
    const employeeId = row.data.ID;

    this.supportService.findEmployee(1, 1, employeeId, '', '', '').pipe(
      map(response => response.payload?.[0] || null),
      catchError(error => {
        console.error("Error fetching employee:", error);
        return of(null);
      }),
      switchMap(employeeData => {
        if (!employeeData) {
          console.warn("Employee not found.");
          return of(null);
        }
        
        // Abrir el modal y esperar la respuesta del usuario
        return this.dialogService.open(EmployeeDetailComponent, {
          context: { employeeData },
          closeOnBackdropClick: false,
          hasBackdrop: true,
        }).onClose;
      })
    ).subscribe(updatedEmployee => {
      debugger
      if (updatedEmployee) {
        this.findEmproyeeProcess();  // Recargar la lista
      }
    });
  }
  

  override onPageChange(page: number): void {
    super.onPageChange(page); // Call the implementation in BaseImplementation
    console.log("EmployeeComponent onPageChange called with page:", page);
  }

  override onPageSizeChange(pageSize: number): void {
    
  }

  checkInputs() {
    //declare input to find 
    //////////////debuger;
    const idToFind = this.employeRequestForm.get('idToFind')?.value || '';
    const nameToFind = this.employeRequestForm.get('nameToFind')?.value || '';
    const lastNameToFind = this.employeRequestForm.get('lastNameToFind')?.value || '';
    const documentToFind = this.employeRequestForm.get('documentToFind')?.value || '';


    this.searchButtonDisabled = !(idToFind || nameToFind || lastNameToFind || documentToFind);
    if (this.searchButtonDisabled) {
      this.page = GeneralConstans.page
      this.typeOfSearch = GeneralConstans.typeSearchDefault
      this.findEmproyeeProcess();
    }
    // this.validateObjectID();
  }

  override findByparameter() {
    ////////debuger;
    //  lista de errores
    this.listError = this.validateObjectID();
    if (this.listError.length === 0) {
      this.employeRequestForm.get('idToFind')?.markAsTouched();
      this.page = GeneralConstans.page
      this.pageSize = GeneralConstans.perPage;
      this.typeOfSearch = GeneralConstans.typeSearchEspecific
      this.findEmproyeeProcess();
    }
  }
  override findByDefualt() {

    this.typeOfSearch = GeneralConstans.typeSearchDefault
    this.findEmproyeeProcess();
  }

  validateObjectID(): string[] {
    const idToFind = this.employeRequestForm.get('idToFind')?.value || '';
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
  updateHasMorePagesT(value: boolean): void {
    this.hasMorePagesT = value;
   // this.hasMorePagesT = value;
    //this.hasMorePagesTChange.emit(this.hasMorePagesT);
  }
  onHasMorePagesTChange(hasMorePages: boolean): void {
    ;
   // this.hasMorePagesT = hasMorePages;

  }


  onNewClick(): void {
    this.dialogService.open(EmployeeDetailComponent, {
      context: {
        // Optional: Pass any data you need for the modal (context)
      },
      closeOnBackdropClick: false, // Prevent closing on clicking outside the modal
      hasBackdrop: true,           // Ensure the backdrop is enabled
      backdropClass: 'custom-backdrop', // Optionally, customize the backdrop class
      dialogClass: 'custom-dialog'  // Customize the dialog class for the entire modal
    }).onClose.subscribe(result => {
      if (result) {
        this.findEmproyeeProcess(); // Recargar la lista después de una inserción o actualización
      }
    });
  }
  
  }



function getIndexForModalType(WARNING: ModalType): ModalType | undefined {
  throw new Error('Function not implemented.');
}



