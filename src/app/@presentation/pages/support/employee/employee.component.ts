import { DatePipe, formatDate, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NbComponentStatus, NbDialogService, NbDialogModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { map } from 'rxjs';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { EmployeeResponse } from '../../../../@data/model/employee/employeeResponse';
import { EmployeeRequest } from '../../../../@data/model/employee/employeRequest';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { EmployeeService } from '../../../../@data/services/employee.service';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../@domain/repository/repository/support.repository';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { ValidationMessageComponent } from '../../../@common-components/validation-message/validation-message.component';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { GeneralConstans } from '../../../../utils/generalConstant';

@Component({
  selector: 'app-employee',
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
        FormsModule,ValidationMessageComponent,TableDatasourceComponent
  ],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends BaseImplementation implements OnInit {
  
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
  employeRequestForm!: FormGroup;
  employeRequest?: EmployeeRequest;
  datas?: TreeNode<EmployeeResponse>[] = [];
  isModalVisible: boolean = false;
  isLoading = false;
  searchButtonDisabled = true;
  typeOfSearch: any;
  listError: any;
  @Output() deleteAction = new EventEmitter<TreeNode<any>>();
  defaultColumnsInput: any = ['id', 'name', 'lastName', 'document', 'startDate', 'finishDate', 'totalHours', 'total'];
  isRegisterEmployeeExpanded: boolean = false;
  hasMorePagesT: boolean = true;
  processDataResult?: any;

  private fb = inject(FormBuilder);
  private supportService = inject(SupportRepository);
  private modalRepository = inject(ModalRepository);
  private dialogService = inject(NbDialogService);
  private spinnerService = inject(SpinnerService);
  private datePipe = inject(DatePipe);
  private employeeService = inject(EmployeeService);

  constructor() {
    super();
    this.employeRequest = { finishDateFormatted: '', startDateFormatted: '' };
  }

  ngOnInit(): void {
    this.page = 1;
    this.buildForm();
    this.findEmproyeeProcess();
    this.employeeService.employees$.subscribe((employees) => {
      this.datas = this.customizePropertyNames(employees, this.columnMappin());
      this.hasMorePagesT = !!(this.datas && this.datas.length > 0);
      this.spinnerService.hide();
    });
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
  findEmproyeeProcess() {
    this.spinnerService.show();
    const id = this.employeRequestForm.value.idToFind || '';
    const name = this.employeRequestForm.value.nameToFind || '';
    const lastName = this.employeRequestForm.value.lastNameToFind || '';
    const document = this.employeRequestForm.value.documentToFind || '';

    this.supportService.findEmployee(this.page, this.pageSize, id, name, lastName, document).pipe(
      map((value) => this.customizePropertyNames(value.payload, this.columnMappin()))
    ).subscribe(
      (data) => {
        this.datas = data;
        this.hasMorePagesT = !!(this.datas && this.datas.length > 0);
        this.spinnerService.hide();
      },
      () => this.spinnerService.hide()
    );
  }

  handleDeleteAction(row: TreeNode<any>): void {
    if (row.data.ID !== undefined) {
      this.supportService.deleteEmployee(row.data.ID).subscribe(
        () => {
          this.modalRepository.showToast('success', 'Delete Success', 'Success');
          this.spinnerService.hide();
        },
        () => this.spinnerService.hide()
      );
    }
  }

  onNewClick(): void {
    this.dialogService.open(RegisterEmployeeComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: true,
    }).onClose.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
}
