import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

	constructor(private router: Router,
	            private authService: AuthenticationService) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (!this.authService.isAuthenticated()) {
			// allowed only when user is not logged in
			return true;
		}
		// otherwise redirect to home page
		this.router.navigate(['/home']);
		return false;
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(childRoute, state);
	}
}
