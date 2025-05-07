import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FileRepository } from '../../@domain/repository/repository/file.repository';
import { Const } from '../../utils/const';
import { FileMetadata } from '../model/files/FileMetadata';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class FileService implements FileRepository {

  constructor(private http: HttpClient,private apiService: ApiService) {}

  uploadFiles(files: File[], dimension: string,typeFile:string): Observable<any> {
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('files', file); // ← usa 'files' (plural), igual al backend
    });
  
    formData.append('dimension', dimension); // string adicional
    formData.append('typeFile', typeFile); 
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/upload`;
  
    return this.apiService.uploadFilesMultipartFile(formData, url);
  }
  
  
    /*
uploadFiles(files: File[], dimension: string): Observable<FileMetadata> {
  const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/upload`;
  const formData = new FormData();
  if (files.length > 0) {
    formData.append('files', files[0]); // Solo el primer archivo
  }
  formData.append('dimension', dimension);

  return this.apiService.postFile(url, formData).pipe(
    map((files: FileMetadata[]) => files[0]) // Retorna solo el primero del backend
  );
}
*/


  downloadFile(id: string): Observable<Blob> {
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  deleteFile(id: string): Observable<string> {
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  restoreFile(id: string): Observable<string> {
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/files/restore/${id}`;
    return this.http.put(url, null, { responseType: 'text' });
  }
}
