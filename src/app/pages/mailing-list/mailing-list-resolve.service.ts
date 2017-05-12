import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Email, MailingListsService } from './mailing-lists.service';
import { Observable } from 'rxjs/Observable';
import { LoadingMaskService } from 'app/shared/loading-mask/loading-mask.service';

@Injectable()
export class MailingListResolve implements Resolve<Email[]> {

	constructor(private service: MailingListsService,
	            private mask: LoadingMaskService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<Email[]> {
		this.mask.addLoading();
		return this.service.getMailingLists()
			.map((mailingLists: Email[]) => {
				this.mask.removeLoading();
				return mailingLists;
			});
	}
}
