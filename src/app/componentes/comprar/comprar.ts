import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComprasService } from '../../servicios/compras';
import { RealizarCompraRequest } from '../../modelos/compras';
import { NotificacionesService } from '../../servicios/notificaciones';


@Component({
  selector: 'app-comprar',
  imports: [ReactiveFormsModule],
  templateUrl: './comprar.html',
  styleUrl: './comprar.css'
})
export class Comprar {
  private comprasService = inject(ComprasService);
  private avisos = inject(NotificacionesService);
  private destroyRef = inject(DestroyRef);

  result = signal('');
  isLoading = signal(false);


  compraForm = inject(FormBuilder).group({
    modeloId: ['', Validators.required],
    compradorId: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.compraForm.invalid) return; 
    const compra = this.compraForm.value as RealizarCompraRequest;
    this.isLoading.set(true);

    this.comprasService.crear(compra)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (respuesta) => {
          const mensaje = `Compra registrada: ${respuesta.id} (${respuesta.estado})`;
          this.result.set(mensaje);
          this.avisos.exito(mensaje);
          this.compraForm.reset();
          this.isLoading.set(false);
        },
        error: (err) => {
          if(err.status === 404){
            this.avisos.error('Error: Ese modelo no existe');
          } else if(err.status === 400){
            this.avisos.error('Error: No se pudo realizar la compra, por favor revisa tus datos');
          } else if(err.status === 401 || err.status === 403){
            this.avisos.error('Error: tienes aque iniciar sesión para realizar la compra');
          }else{
            this.avisos.error('Ocurrió error. Intenta de nuevo más tarde');
          }
          this.isLoading.set(false);
        }
      });

  }
}