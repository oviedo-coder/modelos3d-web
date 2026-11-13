import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../servicios/auth';
import { NotificacionesService } from '../servicios/notificaciones';
import { errorContext } from 'rxjs/internal/util/errorContext';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
const auth = inject(AuthService);
const router = inject(Router)
const avisos = inject(NotificacionesService);
const token = auth.getToken();

const peticion = token
? req.clone({setHeaders: {Authorization: `Bearer´${token}` } }) 
: req; 

//mire lo q devuleve el back
  return next(peticion).pipe( // envia la peticion
    catchError((error: HttpErrorResponse) => { // atrapa y se queda atento al error 
      if(error.status === 401 && token &&!req.url.includes('/login')){
        auth.logout();
        avisos.error('Tu sesión venció. Incia sesión nuevamente.');
        router.navigate(['/login']);
      }
      return throwError(() => error);
      
    })
  );
};
