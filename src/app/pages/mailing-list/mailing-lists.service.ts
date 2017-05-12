import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../core/config.service';
import { contentHeaders } from '../../core/headers';

export class Email {
	constructor(public value: string,
	            public id?: string,
	            public editing: boolean = false,
	            public editedValue?: string) {}
}

@Injectable()
export class MailingListsService {
	constructor(public authHttp: AuthHttp,
	            private configService: ConfigService) { }

	getMailingLists(): Observable<Email[]> {
		return this.authHttp.get(`${this.configService.baseUrl}/api/mailing-lists`)
			.map(response => response.json().map(element => new Email(element.email, element._id)));
	}

	saveEmail(email: Email): Observable<Email> {
		const body = JSON.stringify({email: email.value});
		return this.authHttp.post(`${this.configService.baseUrl}/api/mailing-lists`, body, {headers: contentHeaders})
			.map(response => {
				const element = response.json();
				return new Email(element.email, element._id);
			});
	}

	updateEmail(email: Email): Observable<Email> {
		const body = JSON.stringify({email: email.value, _id: email.id});
		return this.authHttp.put(`${this.configService.baseUrl}/api/mailing-lists/${email.id}`, body, {headers: contentHeaders})
			.map(response => {
				const element = response.json();
				return new Email(element.email, element._id);
			});
	}

	deleteEmail(email: Email): Observable<boolean> {
		return this.authHttp.delete(`${this.configService.baseUrl}/api/mailing-lists/${email.id}`, {headers: contentHeaders})
			.map(response => response.json());
	}

}
