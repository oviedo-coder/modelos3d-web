import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompraDetalle, RealizarCompraRequest } from '../modelos/compras';

@Injectable({ providedIn: 'root' }) // crea una sola copia para la app
export class ComprasService {
  private http = inject(HttpClient);
  private url = 'https://ecommerce-backend-1vcj.onrender.com/api/compras';

  crear(solicitud: RealizarCompraRequest) {
    return this.http.post<CompraDetalle>(this.url, solicitud);
  }
}