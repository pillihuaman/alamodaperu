import { Observable } from 'rxjs';
import { FileMetadata } from '../../../@data/model/files/fileMetadata';


export abstract class CommonRepository {

  abstract getCommonParameter(id: String): Observable<any>;


}
