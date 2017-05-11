import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { MailingListsService } from './mailing-lists.service';
import { LoggerService } from '../../core/logger/logger.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	mailingLists: string[];

	constructor(private authService: AuthenticationService,
	            private mailingListsService: MailingListsService,
	            private logger: LoggerService) {
	}

	logout() {
		this.authService.logout();
	}

	getMailingLists() {
		this.mailingListsService.getMailingLists()
			.subscribe(
				mailingLists => this.mailingLists = mailingLists,
				error => this.logger.error(error)
			);
	}
}
