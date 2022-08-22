import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AdminGuardsModule } from './module';
import { UserProvider } from '../providers';

@Injectable({
    providedIn: AdminGuardsModule
})

export class NotAuthGuardProvider implements CanActivate {

    constructor(
        private UserProvider: UserProvider,
        private Router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        return this.UserProvider.getAuth().pipe(map(({ error, result }) => {

            if (result) {
                this.Router.navigate(['/admin']);
                return false;
            }

            return true;

        }));

    }

}
