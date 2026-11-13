import { Routes } from '@angular/router';
import { Inicio } from './componentes/inicio/inicio';
import { Login } from './componentes/login/login';
import { Catalogo} from './componentes/catalogo/catalogo';
import { Comprar } from './componentes/comprar/comprar';
import { authGuard, guestGuard } from './guards/auth-guard';

export const routes: Routes = [
{ path: '', component: Inicio },
{ path: 'login', component: Login, canActivate: [guestGuard] },
{ path: 'catalogo', component: Catalogo },
{ path: 'comprar', component: Comprar, canActivate: [authGuard] },
{path: '**', pathMatch: 'full', redirectTo: '/' }

];

