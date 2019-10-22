import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {//Observable<boolean> {
    if (!this.auth.user) {
      this.router.navigate(['/login']);
      return false
    } else {
      return true
    }
    // return this.auth.user.pipe(
    //   take(1),
    //   map(user => !!user),
    //   tap(loggedIn => {
    //     if (!loggedIn) {
    //       this.router.navigate(['/login']);
    //     }
    //   })
    // )
  }
}