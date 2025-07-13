import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FileRepository } from '../../@domain/repository/repository/file.repository';
import { Const } from '../../utils/const';
import { FileMetadata } from '../model/files/fileMetadata';
import { ApiService } from './api.service';
import { QuotationRepository } from '../../@domain/repository/repository/quotation.repository';

@Injectable({ providedIn: 'root' })
export class QuotationService implements QuotationRepository {

  constructor(private http: HttpClient,private apiService: ApiService) {}


}
