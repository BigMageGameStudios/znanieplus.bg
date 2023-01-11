import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaceProvider } from '../providers';
import { MainResolversModule } from './module';

@Injectable({ providedIn: MainResolversModule })

export class HomeResolver implements Resolve<any> {

  constructor(
    private PlaceProvider: PlaceProvider) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.PlaceProvider.get({
      page: 1
    })
  }

}
