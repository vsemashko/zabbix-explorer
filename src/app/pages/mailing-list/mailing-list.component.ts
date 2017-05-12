import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email, MailingListsService } from './mailing-lists.service';
import { LoggerService } from '../../core/logger/logger.service';

@Component({
	selector: 'app-mailing-list',
	templateUrl: './mailing-list.component.html',
	styleUrls: ['./mailing-list.component.scss']
})
export class MailingListComponent implements OnInit {
	newEmailText = '';
	mailingList: Email[];

	constructor(private route: ActivatedRoute,
	            private logger: LoggerService,
	            private mailingListService: MailingListsService) {}

	ngOnInit() {
		this.route.data.forEach((data: { mailingList: Email[] }) => {
			this.mailingList = data.mailingList;
		});
	}

	addEmail(emailInput: HTMLInputElement, emailSubmitBtn) {
		if (!emailInput.validationMessage && this.newEmailText.trim().length) {
			if (!this.hasEmail(this.newEmailText)) {
				this.mailingListService.saveEmail(new Email(this.newEmailText))
					.subscribe(email => {
							this.mailingList.push(email);
							this.logger.success('Email successfully created!');
						},
						error => this.logger.error(error));
			}
			this.newEmailText = '';
		} else {
			emailSubmitBtn.focus();
			emailInput.focus();
		}
	}

	updateEditingEmail(email: Email, newEmailValue: string, isValid: boolean) {
		if (isValid && email.value === newEmailValue || !this.hasEmail(newEmailValue)) {
			email.value = newEmailValue;
			email.editing = false;
			this.mailingListService.updateEmail(email)
				.subscribe(updateEmail => this.logger.success('Email successfully updated!'),
					error => this.logger.error(error));
		}
	}

	removeEmail(email: Email) {
		this.mailingList.splice(this.mailingList.indexOf(email), 1);
		this.mailingListService.deleteEmail(email)
			.subscribe(() => this.logger.success('Email successfully deleted'),
				error => this.logger.error(error));
	}

	editEmail(email: Email): void {
		email.editing = true;
		email.editedValue = email.value;
	}

	completeEditingEmail(email: Email): void {
		email.editing = false;
	}

	cancelEditingEmail(email: Email) {
		email.editing = false;
	}

	private hasEmail(emailAddress: string) {
		return this.mailingList.filter((email: Email) => email.value === emailAddress).length !== 0;
	}
}
