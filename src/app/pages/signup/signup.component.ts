import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../core/headers';
import { AuthenticationService } from '../../core/auth/authentication.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
	error: string;

	constructor(public router: Router,
	            public authService: AuthenticationService) {
	}

	signup(event, username, password) {
		event.preventDefault();
		this.authService.signup(username, password)
			.subscribe(
				() => this.router.navigate(['home']),
				error => this.error = error.json().error || error.json()
			);
	}
}
