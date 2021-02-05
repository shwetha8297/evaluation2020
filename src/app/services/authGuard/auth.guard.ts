import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (state.url === '/login') {
        if (localStorage.getItem('loggedIn')) {
          this.router.navigate(['home']);
          return false;
        } else {
          return true;
        }
      }
      else if(localStorage.getItem('loggedIn')){
      return true;
    }  else {
     this.router.navigate(['login']);
    }
  }
  
}
