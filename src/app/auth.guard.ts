import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {GoogleService} from './google/services/google.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private googleService: GoogleService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.googleService.gapiSetup) {
      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

      if (!isSignedIn) {
        this.router.navigate(['/google']);
      }
      return isSignedIn;
    } else {
      return this.googleService.initClient()
        .then(() => {
          const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

          if (!isSignedIn) {
            this.router.navigate(['/google']);
          }
          return isSignedIn;
        });
    }
  }
}
