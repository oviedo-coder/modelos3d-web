import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './servicios/auth';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  auth = inject(AuthService);
  title = signal('Modelos 3D');
  footer = signal('Universidad del Quindío');
}
