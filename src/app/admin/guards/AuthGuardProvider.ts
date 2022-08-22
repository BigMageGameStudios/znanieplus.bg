import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { UserProvider } from '../providers/UserProvider';
import { AdminGuardsModule } from './module';

@Injectable({
    providedIn: AdminGuardsModule
})

export class AuthGuardProvider implements CanActivate {

    constructor(
        private UserProvider: UserProvider,
        private Router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        return this.UserProvider.getAuth().pipe(map(({ error, result }) => {

            if (error || result == null) {
                this.Router.navigate(['/admin', 'login']);
                return false;
            }

            return true;

        }));

    }

}
