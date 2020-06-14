import { AuthserviceService } from './authservice.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanLoad {
  constructor(private authS: AuthserviceService, private router: Router) {

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authS.isUserAuthenticated) {
        this.router.navigateByUrl('/auth');
      }
      return this.authS.isUserAuthenticated;
  }
}
