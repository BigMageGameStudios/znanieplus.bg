import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaceProvider } from '../providers';
import { MainResolversModule } from './module';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: MainResolversModule })

export class PlaceResolver implements Resolve<any> {

  constructor(
    private PlaceProvider: PlaceProvider,
    private Router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const { key } = route.params;
    return this.PlaceProvider.getByKey(key).pipe(map((data) => {
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
