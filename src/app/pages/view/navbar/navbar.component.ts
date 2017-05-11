import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Component({
	selector: 'app-navbar',
	templateUrl: 'navbar.component.html',
	styleUrls: ['navbar.component.scss']
})

export class NavbarComponent {
	constructor(public router: Router,
	            private authService: AuthenticationService) {}

	logout() {
		this.authService.logout();
	}
}
