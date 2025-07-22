import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBody } from '../model/general/responseBody';
import { ApiService } from './api.service'; // Asegúrate de que tu ApiService esté disponible
import { QuotationRepository } from '../../@domain/repository/repository/quotation.repository';
import { Const } from '../../utils/const';
import { ReqQuotation } from '../model/quotation/req-quotation';

@Injectable({
  providedIn: 'root',
})
export class QuotationService extends QuotationRepository {
  
  constructor(private apiService: ApiService) {
    super();
  }

  /**
   * ============================================================================
   * MÉTODO DE CREACIÓN (CORREGIDO Y FINAL)
   * ============================================================================
   * Construye un FormData enviando los datos del formulario como un Blob JSON,
   * lo que permite a Spring Boot deserializarlo automáticamente a un objeto Java.
   */
  override createQuotation(
    quotationData: ReqQuotation,
    logoFile: File | null,
    referenceImages: File[]
  ): Observable<ResponseBody> {
    
    const formData = new FormData();

    // 1. Convertir el objeto de datos a una cadena JSON
    const quotationDataString = JSON.stringify(quotationData);
    
    // 2. Crear un Blob con el tipo MIME 'application/json'
    const quotationDataBlob = new Blob([quotationDataString], {
      type: 'application/json' // Esta es la clave para el backend
    });

    // 3. Añadir el Blob al FormData
    formData.append('quotationData', quotationDataBlob);

    // 4. Añadir los archivos (sin cambios, esto ya estaba bien)
    if (logoFile) {
      formData.append('logo', logoFile, logoFile.name);
    }
    if (referenceImages && referenceImages.length > 0) {
      referenceImages.forEach((file) => {
        formData.append('referenceImages', file, file.name);
      });
    }

    // 5. Construir la URL y realizar la petición POST
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations`;
    return this.apiService.post(url, formData);
  }

  // --- OTROS MÉTODOS DEL SERVICIO (sin cambios) ---

  override listAllQuotations(): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations`;
    return this.apiService.get(url);
  }

  override getQuotationById(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations/${id}`;
    return this.apiService.get(url);
  }

  override deleteQuotation(id: string): Observable<ResponseBody> {
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations/${id}`;
    return this.apiService.delete(url);
  }
   override updateQuotation(
    id: string,
    quotationData: ReqQuotation,
    logoFile: File | undefined,
    referenceImages: File[],
    filesToDelete: string[]
  ): Observable<ResponseBody> {
    
    const formData = new FormData();

    // 1. Adjuntar los datos JSON del formulario
    formData.append('quotationData', new Blob([JSON.stringify(quotationData)], { type: 'application/json' }));

    // 2. Adjuntar el nuevo logo, si se seleccionó uno
    if (logoFile) {
      formData.append('logoFile', logoFile, logoFile.name);
    }
    
    // 3. Adjuntar las nuevas imágenes de referencia
    referenceImages.forEach((file) => {
      formData.append('referenceImages', file, file.name);
    });

    // 4. Adjuntar los IDs de los archivos a eliminar.
    // El backend espera un @RequestParam, por lo que los adjuntamos como claves repetidas.
    filesToDelete.forEach(fileId => {
        formData.append('filesToDelete', fileId);
    });

    // 5. Construir la URL y realizar la petición PUT
    const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/support/quotations/${id}`;
    return this.apiService.put(url, formData);
  }

  // ... (listAll, getById, delete existentes)

}