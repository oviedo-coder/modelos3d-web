import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComprasService } from '../../servicios/compras';
import { RealizarCompraRequest } from '../../modelos/compras';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-comprar',
  styleUrl: './comprar.css',
  templateUrl: './comprar.html',
})
export class Comprar {
  private comprasService = inject(ComprasService);
  private destroyRef = inject(DestroyRef);

  result = signal('');
  isLoading = signal(false);

  compraForm = inject(FormBuilder).group({
    modeloId: ['', [Validators.required]],
    // por ahora el id se escribe a mano ( ana, bruno, carla)
    compradorId: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.compraForm.invalid) return;
    const compra = this.compraForm.value as RealizarCompraRequest;
    this.isLoading.set(true);

    this.comprasService.crear(compra)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (respuesta) => {
        this.result.set(`Compra registrada : ${respuesta.id} (${respuesta.estado})`);
        this.compraForm.reset();
        this.isLoading.set(false);
      },
      error: (err) => {
        if (err.status === 404) {
          this.result.set('Error: Modelo no existe');
        } else if (err.status === 400) {
          this.result.set('Error: Datos inválidos');
        } else if (err.status === 400) {
          this.result.set('Error: No se pudo realizar la compra, revisa los datos');
        } else if (err.status === 403 || err.status === 401) {
          this.result.set('Error: Tienes que iniciar seseión para realizar la compra');
        } else {
          this.result.set('Error: Ocurrio un error, intenta de nuevo');
        }
        this.isLoading.set(false);
      }
    });
  }

}
