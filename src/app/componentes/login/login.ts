import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth';
import { LoginRequest } from '../../modelos/auth';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);


  loginForm = inject(FormBuilder).group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = signal(false);
  result = signal('');

  formStatus = toSignal(this.loginForm.statusChanges, { initialValue: 'INVALID' as const });
  canSubmit = computed(() => this.formStatus() === 'VALID' && !this.isLoading());

  onSubmit(): void {
    if (!this.canSubmit()) return; 
    this.isLoading.set(true);
    const credenciales = this.loginForm.value as LoginRequest;

    this.authService.login(credenciales)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (respuesta) => {
          this.authService.guardarSesion(respuesta);
          this.result.set('Sesión iniciada correctamente');
          this.router.navigate(['/']);
        },
        error: () => {
          this.isLoading.set(false);
          this.result.set('Error al iniciar sesión');
        }
      });

  }
}