import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDialogModule, NbLayoutModule, NbAccordionModule, NbDialogService } from '@nebular/theme';
import { ProductService } from '../../../../@data/services/ProductService';
import { ModalService } from '../../../../@data/services/modal.service';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { NebularSharedModule } from '../../../../@domain/nebular-shared.module';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { EmployeeService } from '../../../../@data/services/employee.service';
import { ModalRepository } from '../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../@domain/repository/repository/support.repository';
import { ProductRepository } from '../../../../@domain/repository/repository/ProductRepository';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { RespProduct } from '../../../../@data/model/product/RespProduct';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Utils } from '../../../../utils/utils';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbDialogModule,
    NbLayoutModule,
    NbAccordionModule,
    NebularSharedModule,
    TableDatasourceComponent,
  ],
})
export class ProductComponent extends BaseImplementation<any> implements OnInit {
  productForm!: FormGroup;
  datas?: TreeNode<any>[] = [];
  isLoading = false;
  searchButtonDisabled = true;
  listError: any;
  isdelelete: any;
  constructor(
    private fb: FormBuilder,
     modalRepository: ModalRepository,
     spinnerService: SpinnerService,
    private datePipe: DatePipe,
    private productService: ProductService,
    private modalService: ModalService,
    dialogService: NbDialogService
  ) {
    super(dialogService,modalRepository,spinnerService); // ✅ Pass dialogService to the parent class
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadProducts();
    this.  findProductProcess();
  }

  private buildForm() {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      category:[''],
      barcode:[''],
      price:[''],
      stock:[''],
    });
  }
  columnMapping(): { [key: string]: string } {
    return {
      id: 'ID',
      name: 'Product Name',
      price: 'Price',
      stock: 'Stock',
      category: 'category',
      barcode: 'Barcode',
    };
  }

  private loadProducts(): void {
    this.productService.product$.subscribe((product) => {
      this.processProductData(product);
      this.spinnerService.hide();
    });
  }
  private processProductData(produ: any[]): void {
    this.datas = this.customizePropertyNames(produ, this.columnMapping());
    this.setDefaultColumns(this.datas);
    if (this.datas && this.datas.length > 0) {
      this.updateHasMorePagesT(true);
    } else {
      this.updateHasMorePagesT(false);
    }
  }

  checkInputs() {
    const idToFind = this.productForm.get('id')?.value || '';
    const nameToFind = this.productForm.get('name')?.value || '';
    const category = this.productForm.get('category')?.value || '';
    const barcode = this.productForm.get('barcode')?.value || '';
    this.searchButtonDisabled = !(idToFind || nameToFind || category || barcode);
    if (this.searchButtonDisabled) {
      this.findProductProcess();
    }
  }


  findProductProcess() {
      this.spinnerService.show();
      const id = this.productForm.value.id || '';
      const name = this.productForm.value.name || '';
      const category = this.productForm.value.category || '';
      const barcode = this.productForm.value.barcode || '';
  
      this.productService.findProducts(this.page, this.pageSize, id, name, category, barcode).pipe(
        map(value => {
          let respo: RespProduct[] = value?.payload || []; // Asegurar que no sea null o undefined
          return this.customizePropertyNames(respo, this.columnMapping());
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
        this.setDefaultColumns(this.datas);
        if (this.datas && this.datas.length > 0) {
          this.updateHasMorePagesT(true);
        } else {
          this.updateHasMorePagesT(false);
        }
        this.spinnerService.hide();
      });
    }

    override findByparameter() {
      debugger
      this.listError = this.validateObjectID();
      if (this.listError.length === 0) {
        this.productForm.get('id')?.markAsTouched();
        this.page = GeneralConstans.page
        this.pageSize = GeneralConstans.perPage;
        this.findProductProcess();
      }
    }
  validateObjectID(): string[] {
    const idToFind = this.productForm.get('id')?.value || '';
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

    onNewClick(): void {
      this.dialogService.open(DetailProductComponent, {
        context: {
          // Optional: Pass any data you need for the modal (context)
        },
        closeOnBackdropClick: false, // Prevent closing on clicking outside the modal
        hasBackdrop: true,           // Ensure the backdrop is enabled
        backdropClass: 'custom-backdrop', // Optionally, customize the backdrop class
        dialogClass: 'custom-dialog'  // Customize the dialog class for the entire modal
      }).onClose.subscribe(result => {
        if (result) {
          debugger
          this.findProductProcess(); // Recargar la lista después de una inserción o actualización
        }
      });
    }

  handleEditAction(row: TreeNode<any>): void {
    debugger;
    if (!row?.data?.ID) {
      console.warn("Invalid product data.");
      return;
    }
    const productId = row.data.ID;
    this.productService.findProducts(1, 1, productId, '', '', '').pipe(
      map(response => response.payload?.[0] || null),
      catchError(error => {
        console.error("Error fetching product:", error);
        return of(null);
      }),
      switchMap(entityData => {
        if (!entityData) {
          console.warn("Product not found.");
          return of(null);
        }
  
        // Abrir el modal y esperar la respuesta del usuario
        return this.dialogService.open(DetailProductComponent, {
          context: {  entityData },
          closeOnBackdropClick: false,
          hasBackdrop: true,
        }).onClose;
      })
    ).subscribe(updatedProduct => {
      if (updatedProduct) {
        this.findProductProcess();  // Recargar la lista de productos
      }
    });
  }
  
  handleDeleteAction(row: TreeNode<any>): void {
    console.log('Deleting:', row);
    if (row.data.ID !== undefined) {
      const id: String = row.data.ID;
      this.productService.deleteProduct(id).subscribe(
        (value) => {
          this.showSuccessMessage("Delete Success", "Success");
          this.isdelelete = row;
        },
        (error) => {
          debugger
          if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
            error.error.data.payload.forEach((errorItem: any) => {
              const controlName = errorItem.propertyPath;
              const errorMesagge = errorItem.valExceptionDescription;
              this.productForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
            });
          }
          this.spinnerService.hide();
        }

      );
    }
  }
  deleting(event: any) {
    const dialogRef = this.openDeleteModal(event); // ✅ Use `this.`
    dialogRef.componentRef.instance.deleteConfirmed.subscribe(() => {
      this.handleDeleteAction(event);
    });
  }
  
}
