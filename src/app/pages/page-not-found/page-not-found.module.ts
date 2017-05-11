import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		SharedModule,
		RouterModule
	],
	declarations: [
		PageNotFoundComponent
	],
	providers: []
})

export class PageNotFoundModule {
}
