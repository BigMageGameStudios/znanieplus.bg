import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ApartmentProvider, UserProvider } from '../providers';
import { MainResolversModule } from './module';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: MainResolversModule })

export class HomeResolver implements Resolve<any> {

  constructor(
    private ApartmentProvider: ApartmentProvider,
    private UserProvider: UserProvider
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return [];
    return forkJoin([
      this.ApartmentProvider.get({
        skip: 0,
        limit: 12
      }),
      this.UserProvider.get({
        skip: 0,
        limit: 24
      })
    ]).pipe(map(([apartments, users]) => {
      return {
        apartments,
        users
      }
    }));
  }

}
