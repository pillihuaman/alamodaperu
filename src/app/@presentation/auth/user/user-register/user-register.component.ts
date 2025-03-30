import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NbDialogService, NbSelectModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { User } from '../../../../@domain/repository/models/user';
import { UserRepository } from '../../../../@domain/repository/repository/user.repository';
import { ModalComponent } from '../../../@common-components/modal/modal.component';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { EmployeeDetailComponent } from '../../../pages/support/workers/employee-detail/employee-detail.component';

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
    numTypeDocument: FormControl<string>;
    typeDocument: FormControl<string>;
    email: FormControl<string>;
    repeatpassword: FormControl<string>;
    phoneNumber: FormControl<string>;
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
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      lastName: this.formBuilder.control(''),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      numTypeDocument: this.formBuilder.control(''),
      typeDocument: this.formBuilder.control(''),
      email: this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      repeatpassword: this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      phoneNumber: this.formBuilder.control('')
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    const data: User = {
      lastName: ''
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
