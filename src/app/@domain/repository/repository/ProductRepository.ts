import { Observable } from "rxjs";
import { ResponseBody } from "../../../@data/model/general/responseBody";
import { Product } from "../../../@data/model/product/product";
import { RespProduct } from "../../../@data/model/product/RespProduct";
import { ReqProduct } from "../../../@data/model/product/ReqProduct";

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
  abstract saveProduct(product: ReqProduct): Observable<RespProduct>;
  abstract deleteProduct(id: String): Observable<ResponseBody>;
}