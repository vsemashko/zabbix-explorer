import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { MailingListsService } from './mailing-lists.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	mailingLists: string[];

	constructor(private authService: AuthenticationService,
	            private mailingListsService: MailingListsService) {
	}

	logout() {
		this.authService.logout();
	}

	getMailingLists() {
		this.mailingListsService.getMailingLists()
			.subscribe(
				mailingLists => this.mailingLists = mailingLists,
				error => console.error(error)
			);
	}
}
