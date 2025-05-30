import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Const } from '../../utils/const';
import { CommonRepository } from '../../@domain/repository/repository/common.repository';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements CommonRepository {
  constructor(private http: HttpClient, private apiService: ApiService) {}
  getCommonParameter(id: String): Observable<any> {
        const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/support/common/default-data/${id}`;
      return this.apiService.get(url);
  }
}