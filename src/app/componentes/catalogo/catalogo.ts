import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ModelosService } from '../../servicios/modelos';
import { Modelo } from '../../modelos/catalogo';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {
  private modelosService = inject(ModelosService);

  modelos = toSignal(
    this.modelosService.listar().pipe(map(pagina => pagina.content)),
    { initialValue: [] as Modelo[] }
  );

  badgeLicencia(licencia: string): string {
    const colores: Record<string, string> = {
      PERSONAL: 'bg-secondary',
      COMERCIAL: 'bg-warning text-dark',
      ILIMITADA: 'bg-success'
    };
    return colores[licencia] ?? 'bg-secondary';
  }
}
