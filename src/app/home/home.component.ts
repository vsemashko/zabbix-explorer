import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	jwt: string;
	decodedJwt: string;
	response: string;
	api: string;

	constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
		this.jwt = localStorage.getItem('token');
		this.decodedJwt = this.jwt && (<any>window).jwt_decode(this.jwt);
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['login']);
	}

	callAnonymousApi() {
		this._callApi('Anonymous', 'http://localhost:3001/api/random-quote');
	}

	callSecuredApi() {
		this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
	}

	_callApi(type, url) {
		this.response = null;
		if (type === 'Anonymous') {
			// For non-protected routes, just use Http
			this.http.get(url)
				.subscribe(
					response => this.response = response.text(),
					error => this.response = error.text()
				);
		}
		if (type === 'Secured') {
			// For protected routes, use AuthHttp
			this.authHttp.get(url)
				.subscribe(
					response => {
						console.log(response);
						this.response = response.text();
					},
					error => {
						console.log(error);
						this.response = error.text();
					}
				);
		}
	}
}
