import { Observable } from 'rxjs';
import { FileMetadata } from '../../../@data/model/files/fileMetadata';
import { SaveCommonDataReq } from '../../../@data/model/general/common-data.model';
import { ResponseBody } from '../../../@data/model/general/responseBody';


export abstract class CommonRepository {

  abstract getCommonParameter(id: String): Observable<any>;

 abstract saveOrUpdateCommonData(data: SaveCommonDataReq): Observable<ResponseBody>;
}
