import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnerProvider } from '../providers';
import { MainResolversModule } from './module';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: MainResolversModule })

export class PartnerResolver  {

  constructor(
    private PartnerProvider: PartnerProvider,
    private Router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const { key } = route.params;
    return this.PartnerProvider.getByKey(key).pipe(map((data) => {
      if (data === null) {
        this.Router.navigateByUrl('/#home');
        return [];
      }

      if(data && data.active == false){
        this.Router.navigateByUrl('/#home');
        return [];
      }

      return data;
    }));
  }

}
