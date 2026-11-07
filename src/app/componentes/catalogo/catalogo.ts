import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
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

  // la respuesta del backend -- una pág
  modelos =toSignal(
    this.modelosService.Listar().pipe(map(pagina => pagina.content)),
    { initialValue: [] as Modelo[]}
  );

}


