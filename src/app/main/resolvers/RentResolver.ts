import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApartmentProvider } from '../providers';
import { MainResolversModule } from './module';
import { ApartmentTypes } from 'src/globals/config';

@Injectable({ providedIn: MainResolversModule })

export class RentResolver implements Resolve<any> {

  constructor(
    private ApartmentProvider: ApartmentProvider
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const { page = 1 } = route.queryParams;

    return this.ApartmentProvider.get({
      skip: 0,
      limit: Number(page) * 12,
      apartmentType: ApartmentTypes.rent.id
    });
  }

}
