import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { routerReducer } from '@ngrx/router-store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsGuard implements CanActivate {

  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if(route.queryParams.lan && route.queryParams.lon) {
      return true;
    }
    return this.router.createUrlTree(['']);
  }

}
