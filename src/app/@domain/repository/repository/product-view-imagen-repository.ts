import { Observable } from "rxjs";
import { ResponseBody } from "../../../@data/model/general/responseBody";


export abstract class ProductViewImagenRepository {

  abstract findAllViewsProducImag(

  ): Observable<ResponseBody>;
  

  abstract saveView( ): Observable<ResponseBody>;
  
}

