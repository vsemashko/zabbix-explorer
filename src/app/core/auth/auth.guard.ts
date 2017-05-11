import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(private router: Router) {}

	canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (tokenNotExpired()) {
			return true;
		}

		this.router.navigate(['/login']);
		return false;
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(childRoute, state);
	}
}
