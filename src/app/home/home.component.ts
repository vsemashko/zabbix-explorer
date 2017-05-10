import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	mailingLists: any[];

	constructor(public router: Router,
	            public authHttp: AuthHttp) {
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['login']);
	}

	getMailingLists() {
		this.authHttp.get('http://localhost:3001/api/mailing-lists')
			.subscribe(
				response => this.mailingLists = response.json(),
				error => {
					if (!tokenNotExpired()) {
						return this.router.navigate(['login']);
					}
					console.error(error);
				}
			);
	}
}
