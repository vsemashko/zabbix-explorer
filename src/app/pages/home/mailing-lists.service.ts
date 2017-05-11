import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../core/config.service';

@Injectable()
export class MailingListsService {
	constructor(public authHttp: AuthHttp,
	            private configService: ConfigService) { }

	getMailingLists(): Observable<string[]> {
		return this.authHttp.get(`${this.configService.baseUrl}/api/mailing-lists`)
			.map(response => response.json().map(list => list.email));
	}

}
