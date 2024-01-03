import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      switch (state.url) {
        case "/dashboard":
          if(!this.auth.getCurrentUser()) return this.router.parseUrl("log-in");
          break;
        case "/log-in":
        case "/register":
        case "/account-credential-recovery":
          if(this.auth.getCurrentUser()) return this.router.parseUrl("dashboard");
      }
      return true;
  }
  
}