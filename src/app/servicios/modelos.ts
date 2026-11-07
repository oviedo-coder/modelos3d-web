import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modelo, Pagina } from '../modelos/catalogo';

@Injectable({ providedIn: 'root' }) // crea una sola copia para la app
export class ModelosService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/modelos';

  Listar(){
    return this.http.get<Pagina<Modelo>>(this.url);
  }

  
  }