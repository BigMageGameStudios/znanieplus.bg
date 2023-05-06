import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnerProvider } from '../providers';
import { MainResolversModule } from './module';

@Injectable({ providedIn: MainResolversModule })

export class HomeResolver  {

  constructor(
    private PartnerProvider: PartnerProvider) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.PartnerProvider.get({
      page: 1
    })
  }

}
