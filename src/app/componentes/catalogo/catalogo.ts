import { Component, computed, inject, signal} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { ModelosService } from '../../servicios/modelos';
import { NotificacionesService } from '../../servicios/notificaciones';
import { Modelo, Pagina } from '../../modelos/catalogo';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {
  private modelosService = inject(ModelosService);
  private avisos = inject(NotificacionesService);

  // en que pag y qué busco 
  readonly tamano = 5;
  pagina = signal(0);
  texto = signal('');

  busqueda = toSignal(
    toObservable(this.texto).pipe(
      debounceTime(400),
      distinctUntilChanged()
    ),
    { initialValue: ''}
  );

  // junta pág y busqueda en un solo objeto
  private consulta = computed(() => ({
    pagina : this.pagina(),
    busqueda: this.busqueda()
  }));

  respuesta = toSignal(
    toObservable(this.consulta).pipe(
      switchMap(c =>
        this.modelosService.listar(c.pagina, this.tamano, c.busqueda).pipe(
          catchError(() =>{
            this.avisos.error('No pudimos cargar el catálogo. ');
            return of(null);

          })
        )
      )
    ),

    { initialValue: null as Pagina<Modelo> | null}
  );

  modelos =computed(() => this.respuesta()?.content ?? []); 
  totalPaginas = computed(() => this.respuesta()?.totalPages ?? 0);
  total = computed(() => this.respuesta()?.totalElements ?? 0);
  esPrimera = computed(() => this.pagina() === 0);
  esUltima = computed(() => this.pagina() >= this.totalPaginas() -1);

  escribir(valor: string): void {
    this.texto.set(valor);
    this.pagina.set(0);
  }

  anterior(): void { this.pagina.update(p => p -1); }
  siguiente(): void { this.pagina.update(p => p + 1 ); }

 

  badgeLicencia(licencia: string): string {
    const colores: Record<string, string> = {
      PERSONAL: 'bg-secondary',
      COMERCIAL: 'bg-warning text-dark',
      ILIMITADA: 'bg-success'
    };
    return colores[licencia] ?? 'bg-secondary';
  }
}
