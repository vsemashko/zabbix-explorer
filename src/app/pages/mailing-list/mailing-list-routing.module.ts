import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/auth/auth.guard';
import { MailingListComponent } from './mailing-list.component';
import { MailingListResolve } from './mailing-list-resolve.service';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'mailing-lists',
				component: MailingListComponent,
				canActivate: [AuthGuard],
				resolve: {
					mailingList: MailingListResolve
				}
			}
		])
	],
	providers: [
		MailingListResolve
	],
	exports: [
		RouterModule
	]
})
export class MailingListRoutingModule {
}
