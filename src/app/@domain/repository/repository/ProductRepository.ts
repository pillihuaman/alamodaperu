import { Observable } from "rxjs";
import { ResponseBody } from "../../../@data/model/general/responseBody";
import { Product } from "../../../@data/model/product/product";
import { RespProduct } from "../../../@data/model/product/RespProduct";

export abstract class ProductRepository {
  abstract findProducts(
    page: any,
    pagesize: any,
    id: any,
    name: any,
    category: any,
    barcode: any
  ): Observable<ResponseBody>
  abstract getProductById(id: string): Observable<RespProduct>;
  abstract saveProduct(product: Product): Observable<RespProduct>;
  abstract deleteProduct(id: String): Observable<ResponseBody>;
}