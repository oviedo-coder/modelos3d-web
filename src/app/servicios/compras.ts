import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompraDetalle, RealizarCompraRequest } from '../modelos/compras';

@Injectable({ providedIn: 'root' }) //lo marca como servicio
export class ComprasService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/compras';


  crear(solicitud: RealizarCompraRequest) {
    return this.http.post<CompraDetalle>(this.url, solicitud);
  }
}