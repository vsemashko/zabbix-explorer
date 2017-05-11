import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MailingListsService } from "app/pages/home/mailing-lists.service";

@NgModule({
	imports: [
		SharedModule,
		HomeRoutingModule
	],
	declarations: [
		HomeComponent
	],
	providers: [
		MailingListsService
	]
})

export class HomeModule {
}
