import { NgModule } from '@angular/core';
import { MailingListComponent } from './mailing-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MailingListRoutingModule } from 'app/pages/mailing-list/mailing-list-routing.module';
import { MailingListsService } from './mailing-lists.service';

@NgModule({
	imports: [
		SharedModule,
		MailingListRoutingModule
	],
	declarations: [
		MailingListComponent
	],
	providers: [
		MailingListsService
	]
})
export class MailingListModule {
}
