import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NbDialogService, NbSelectModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { UserRepository } from '../../../../@domain/repository/repository/user.repository';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { EmployeeDetailComponent } from '../../../pages/support/workers/employee-detail/employee-detail.component';
import { User } from '../../../../@data/model/User/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NebularSharedModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule
  ]
})
export class UserRegisterComponent implements OnInit {
  loginForm!: FormGroup<{
    name: FormControl<string>;
    lastName: FormControl<string>;
    password: FormControl<string>;
    repeatpassword: FormControl<string>;
    numTypeDocument: FormControl<string>;
    typeDocument: FormControl<string>;
    email: FormControl<string>;
    phoneNumber: FormControl<string>;
    alias: FormControl<string>;
    userName: FormControl<string>;
    rolId: FormControl<number>;
    code: FormControl<number>;
    estatus: FormControl<boolean>;
  }>;

  selectedItemType: any;
  user!: User;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private userRepository: UserRepository,
    private modalRepository: ModalRepository,
    private dialogService: NbDialogService,
    public dialog: MatDialog
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.loginForm.patchValue({
      name: 'zarmir',
      lastName: 'pillihuaman hurtado',
      password: '1988deza',
      repeatpassword: '1988deza',
      numTypeDocument: '12345678',
      typeDocument: 'DNI',
      email: 'pillihuamanhz@gmail.com',
      phoneNumber: '999999999',
      alias: 'zarmir',
      userName: 'zarmirph',
      rolId: 1,
      code: 1001,
      estatus: true
    });
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      lastName: this.formBuilder.control(''),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      repeatpassword: this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      numTypeDocument: this.formBuilder.control(''),
      typeDocument: this.formBuilder.control(''),
      email: this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      phoneNumber: this.formBuilder.control(''),
      alias: this.formBuilder.control(''),
      userName: this.formBuilder.control(''),
      rolId: this.formBuilder.control(0),
      code: this.formBuilder.control(0),
      estatus: this.formBuilder.control(true)
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    // Asignar valores predeterminados si es necesario


    const data: User = {
      name: this.loginForm.value.name,
      lastName: this.loginForm.value.lastName,
      password: this.loginForm.value.password,
      numTypeDocument: this.loginForm.value.numTypeDocument,
      typeDocument: this.loginForm.value.typeDocument,
      email: this.loginForm.value.email,
      phoneNumber: this.loginForm.value.phoneNumber,
      alias: this.loginForm.value.alias,
      userName: this.loginForm.value.userName,
      rolId: this.loginForm.value.rolId,
      code: this.loginForm.value.code,
      estatus: this.loginForm.value.estatus
    };

    this.userRepository.registerUser(data).subscribe(
      () => {
        this.dialog.open(ModalComponent, { data: GeneralConstans.datamodelSucess });
      },
      () => {
        this.dialog.open(ModalComponent, { data: GeneralConstans.datamodelError });
      }
    );
  }

  onNewClick(): void {
    this.dialogService.open(EmployeeDetailComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: true,
    }).onClose.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
}
