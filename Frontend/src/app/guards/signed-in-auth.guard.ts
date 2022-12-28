import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignedInAuthGuard implements CanActivate {
  isSignedIn: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | undefined = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return <boolean>!this.isSignedIn;
  }

}
