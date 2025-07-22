import { Observable } from 'rxjs';
import { ResponseBody } from '../../../@data/model/general/responseBody';

// No necesitamos importar los modelos de respuesta aquí, ya que el payload será de tipo 'any'
// en la capa del repositorio, siguiendo el patrón de ProductRepository.

export abstract class QuotationRepository {
  /**
   * Crea una nueva cotización. Devuelve el objeto ResponseBody completo.
   */
  abstract createQuotation(
    quotationData: any, // Usamos 'any' para ser consistentes con ApiService
    logoFile: File | null,
    referenceImages: File[]
  ): Observable<ResponseBody>; // CORREGIDO: Ya no es genérico

    abstract updateQuotation(
    id: string,
    quotationData: any,
    logoFile: File | undefined,
    referenceImages: File[],
    filesToDelete: string[]
  ): Observable<ResponseBody>;
  /**
   * Obtiene todas las cotizaciones. Devuelve el objeto ResponseBody completo.
   */
  abstract listAllQuotations(): Observable<ResponseBody>; // CORREGIDO: Ya no es genérico

  /**
   * Obtiene una cotización por su ID. Devuelve el objeto ResponseBody completo.
   */
  abstract getQuotationById(id: string): Observable<ResponseBody>; // CORREGIDO: Ya no es genérico

  /**
   * Elimina una cotización por su ID. Devuelve el objeto ResponseBody completo.
   */
  abstract deleteQuotation(id: string): Observable<ResponseBody>; // CORREGIDO: Ya no es genérico
}