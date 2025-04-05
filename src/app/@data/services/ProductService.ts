import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Product } from '../model/product/product';
import { RequestBody } from '../model/general/requestBody';
import { ResponseBody } from '../model/general/responseBody';
import { Const } from './../../utils/const';
import { ProductRepository } from '../../@domain/repository/repository/ProductRepository';
import { RespProduct } from '../model/product/RespProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ProductRepository {
    private productSubject = new BehaviorSubject<RespProduct[]>([]);
    product$ = this.productSubject.asObservable();
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }
  override findProducts(
    page: any, 
    pagesize: any, 
    id: any, 
    name: any, 
    category: any, 
    barcode: any
  ): Observable<ResponseBody> {
    const params: any = { page, pagesize, id, name, category, barcode };
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PRIVATE}` +
      `/v1/support/product`;
    return this.apiService.get(url, params);
  }
  override getProductById(id: string): Observable<RespProduct> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/product/listproducts/${id}`;
    return this.apiService.get(url);
  }

  override saveProduct(product: Product): Observable<RespProduct> {
    const request: RequestBody = { data: product, trace: { traceId: '01' } };
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/product`;
    return this.apiService.post(url, request);
  }

  override deleteProduct(id: String): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/product/${id}`;
    return this.apiService.delete(url);
  }

  
  fetchEmployees(page: number, pageSize: number, id: string, name: string, lastName: string, document: string) {
    //;
    this.findProducts(page, pageSize, id, name, lastName, document).subscribe((response) => {
      this.productSubject.next(response.payload);
    });
  }
  reloadEmployees() {
    this.productSubject.next(this.productSubject.value);
  }
    
}