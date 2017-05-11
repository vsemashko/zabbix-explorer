import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/auth/authentication.service';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	error: string;

	constructor(public router: Router,
	            public authService: AuthenticationService) {
	}

	login(event, username, password) {
		event.preventDefault();
		this.authService.login(username, password)
			.subscribe(
				() => this.router.navigate(['home']),
				error => this.error = error.json().error || error.json()
			);
	}
}
