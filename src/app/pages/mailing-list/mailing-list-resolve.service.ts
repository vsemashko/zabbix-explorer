import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MailingListsService } from './mailing-lists.service';
import { Observable } from 'rxjs/Observable';
import { LoadingMaskService } from 'app/shared/loading-mask/loading-mask.service';

@Injectable()
export class MailingListResolve implements Resolve<string[]> {

	constructor(private service: MailingListsService,
	            private mask: LoadingMaskService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<string[]> {
		this.mask.addLoading();
		return this.service.getMailingLists()
			.map((mailingLists: string[]) => {
				this.mask.removeLoading();
				return mailingLists;
			});
	}
}
