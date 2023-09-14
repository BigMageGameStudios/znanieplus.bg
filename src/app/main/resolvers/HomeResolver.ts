import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { CompanyProvider } from '../providers';
import { PartnerProvider } from '../providers';
import { MainResolversModule } from './module';

@Injectable({ providedIn: MainResolversModule })

export class HomeResolver {

  constructor(
    private PartnerProvider: PartnerProvider,
    private CompanyProvider: CompanyProvider
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return forkJoin([
      this.PartnerProvider.get({
        page: 1
      }),
      this.CompanyProvider.get({
        page: 1
      })
    ]);
  }

}
