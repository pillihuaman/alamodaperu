import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { Parameter } from '../../../../@data/model/general/parameter';
import { Product } from '../../../../@data/model/product/product';
import { AuthenticationRepository } from '../../../../@domain/repository/repository/authentication.repository';
import { SupportRepository } from '../../../../@domain/repository/repository/support.repository';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NbDialogModule, NbLayoutModule, NbButtonModule, NbSidebarModule, NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],    standalone: true,
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
],
})
export class RegisterProductComponent implements OnInit {
  myForm: FormGroup;
  lisParameter?: Parameter[];
  selectedTypeProduct:any;
  options?: string[]=[];
  filteredOptions$?: Observable<string[]>;
  @ViewChild('autoInput') input: any;
  itemList: any[] = [
    { value: 'Item 1' },
    { value: 'Item 2' },
    { value: 'Item 3' },
    // add more items as needed
  ];
  constructor(
    public fb: FormBuilder,
    private re: SupportRepository,
    private authenticationService: AuthenticationRepository
  ) {
    this.myForm = this.fb.group({
      description: [''],
      name: [''],
      type: [''],
    });
  }

  
  ngOnInit(): void {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
    this.getParameter();

  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event: string) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    //return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    return this.options?.filter(optionValue =>
      optionValue.toLowerCase().includes(filterValue)
    ) ?? [];
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map((filterString: string) => this.filter(filterString)),
    );
  }
  save() {
    const currentUser = this.authenticationService.getCurrentUserValue;
  
    if (!currentUser?.id_user) {
      console.error('No user is logged in.');
      return;
    }
  
    let product: Product = {
      name: this.myForm.get('name')?.value,
      description: this.myForm.get('description')?.value,
      idUser: currentUser.id_user,  // Now safe
    };
  
    this.re.saveProduct(product).subscribe(
      (value) => { },
      (error) => { }
    );
  }
  
  getParameter() {

    const currentUser = this.authenticationService.getCurrentUserValue;
    let parame: Parameter = {
      idCode: ""
    };
    this.re.getParameterbyIdCode(parame).subscribe(
      (value) => {
        //debuger;
        this.lisParameter = value;

      },
      (error) => { }
    );
  }
}
