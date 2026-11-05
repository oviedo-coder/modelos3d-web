import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, TokenResponse } from '../modelos/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/auth';

  isAuthenticated = signal(!!localStorage.getItem('token'));

  login(credenciales: LoginRequest) {
    return this.http.post<TokenResponse>(`${this.url}/login`, credenciales);
  }

  guardarSesion(respuesta: TokenResponse): void {
    localStorage.setItem('token', respuesta.token);
    localStorage.setItem('roles', JSON.stringify(respuesta.roles));
    this.isAuthenticated.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

    logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.isAuthenticated.set(false);
  }
}