import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Const {
  public static USERNAME_SEGURIDAD: string;
  public static PASSWORD_SEGURIDAD: string;
  public static ACCEPT_COOKIE: string = 'ACCEPT_COOKIE';
  public static API_SEGURIDAD: string;
  public static API_SUPPORT: any;
  public static API_INTELLIGENCY_ARTIFICIAL: any;
  public static API_SEARCH: string;
  public static API_IMAGEN: string;
  public static URL_TYPE_ACCES_PRIVATE: any;
  public static URL_TYPE_ACCES_PUBLIC: any;
  public static URL_TYPE_ACCES_IMG_AWS: any;
  public static KEY = '@@@@@dddd....dont be evil.....';
    static API_FILE_IA: any;

  constructor(private http: HttpClient) {}

  /** Carga la configuración común desde `common.config.json` */
  public async loadCommonConfig(): Promise<void> {
    try {
      const config: any = await lastValueFrom(
        this.http.get('./assets/config/common.config.json')
      );
      Const.API_SEGURIDAD = config.public_base_url_seguridad;
      Const.API_SUPPORT = config.public_base_url_support;
      Const.API_SEARCH = config.public_base_url_search;
      Const.URL_TYPE_ACCES_PUBLIC = config.acces_public;
      Const.URL_TYPE_ACCES_PRIVATE = config.acces_private;
      Const.API_IMAGEN = config.public_base_url_imagen;
      Const.API_INTELLIGENCY_ARTIFICIAL = config.public_base_url_file_IA;
      Const.URL_TYPE_ACCES_IMG_AWS = config.public_access_catalogo_img_aws;
    } catch (error) {
      console.error('Error al cargar configuración común:', error);
    }
  }

  /** Carga la configuración de entidad desde `pillihuaman-web.config.json` */
  public async loadEntidadConfig(): Promise<void> {
    try {
      const config: any = await lastValueFrom(
        this.http.get('./assets/config/pillihuaman-web.config.json')
      );
      Const.USERNAME_SEGURIDAD = config.client_id;
      Const.PASSWORD_SEGURIDAD = config.client_secret;
    } catch (error) {
      console.error('Error al cargar configuración de entidad:', error);
    }
  }
}

// ✅ Corregimos la inicialización de las credenciales evitando `undefined`
export const CREDENCIALES = () => {
  if (Const.USERNAME_SEGURIDAD && Const.PASSWORD_SEGURIDAD) {
    return btoa(`${Const.USERNAME_SEGURIDAD}:${Const.PASSWORD_SEGURIDAD}`);
  }
  return ''; // Retorna cadena vacía si aún no están definidas las credenciales
};

// Variable para la cabecera de una solicitud de token
export const HTTP_HEADERS_TOKEN = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Basic ${CREDENCIALES()}`, // Ahora es una función segura
});

// Idioma por defecto
export const DEFAULT_LANG = 'en-US';
