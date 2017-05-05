import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
	constructor(public router: Router, public http: Http) {
	}

	signup(event, username, password) {
		event.preventDefault();
		const body = JSON.stringify({username, password});
		this.http.post('http://localhost:3001/users', body, {headers: contentHeaders})
			.subscribe(
				response => {
					localStorage.setItem('token', response.json().id_token);
					this.router.navigate(['home']);
				},
				error => {
					alert(error.text());
					console.log(error.text());
				}
			);
	}

	login(event) {
		event.preventDefault();
		this.router.navigate(['login']);
	}

}
