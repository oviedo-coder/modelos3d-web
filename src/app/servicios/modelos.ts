import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Modelo, Pagina } from '../modelos/catalogo';

@Injectable({ providedIn: 'root' })
export class ModelosService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/modelos';

  listar(pagina = 0, tamano = 5, busqueda ='') {

    let params = new HttpParams().set('page', pagina).set('size', tamano);

    if (busqueda.trim()) {
      params = params.set('busqueda', busqueda.trim());
    }

    return this.http.get<Pagina<Modelo>>(this.url, { params });
  }
}
