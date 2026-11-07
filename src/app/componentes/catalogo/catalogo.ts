import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ModelosService } from '../../servicios/modelos';
import { Modelo } from '../../modelos/catalogo';

@Component({
  imports: [],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {
  private modelosService = inject(ModelosService);

  // La respuesta del backend es una página
  modelos = toSignal(
    this.modelosService.listar().pipe(map((pagina) => pagina.content)),
    { initialValue: [] as Modelo[] }
  );



}
