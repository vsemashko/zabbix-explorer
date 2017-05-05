import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate() {
		if (tokenNotExpired()) {
			return true;
		}

		this.router.navigate(['/login']);
		return false;
	}
}
