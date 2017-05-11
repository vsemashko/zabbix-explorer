import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from 'app/core/headers';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
	constructor(private http: Http,
	            private config: ConfigService,
	            private router: Router) {
	}

	login(username, password): Observable<void> {
		const body = JSON.stringify({username, password});
		return this.http.post(`${this.config.baseUrl}/login`, body, {headers: contentHeaders})
			.map(response => localStorage.setItem('token', response.json().id_token));
	}

	signup(username, password): Observable<void> {
		const body = JSON.stringify({username, password});
		return this.http.post(`${this.config.baseUrl}/users`, body, {headers: contentHeaders})
			.map(response => localStorage.setItem('token', response.json().id_token));
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['login']);
	}

	isAuthenticated(): boolean {
		return tokenNotExpired();
	}
}
