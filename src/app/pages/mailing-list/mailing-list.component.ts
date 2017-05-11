import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-mailing-list',
	templateUrl: './mailing-list.component.html',
	styleUrls: ['./mailing-list.component.scss']
})
export class MailingListComponent implements OnInit {
	newEmailText = '';
	mailingList: string[];

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.data.forEach((data: { mailingList: string[] }) => {
			this.mailingList = data.mailingList;
		});
	}

	remove(email: string) {
		this.mailingList.splice(this.mailingList.indexOf(email), 1);
	}

	addTodo() {
		if (this.newEmailText.trim().length) {
			this.mailingList.push(this.newEmailText);
			this.newEmailText = '';
		}
	}
}
