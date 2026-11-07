import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComprasService } from '../../servicios/compras';
import { RealizarCompraRequest } from '../../modelos/compras';


@Component({
  selector: 'app-comprar',
  imports: [ReactiveFormsModule],
  templateUrl: './comprar.html',
  styleUrl: './comprar.css'
})
export class Comprar {
  private comprasService = inject(ComprasService);
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
          this.result.set(`Compra registrada: ${respuesta.id} (${respuesta.estado})`);
          this.compraForm.reset;
          this.isLoading.set(false);
        },
        error: (err) => {
          if(err.status === 404){
            this.result.set('Error: Ese modelo no existe');
          } else if(err.status === 400){
            this.result.set('Error: No se pudo realizar la compra, por favor revisa tus datos');
          } else if(err.status === 401 || err.status === 403){
            this.result.set('Error: tienes aque iniciar sesión para realizar la compra');
          }else{
            this.result.set('Ocurrió error. Intenta de nuevo más tarde');
          }
          this.isLoading.set(false);
        }
      });

  }
}