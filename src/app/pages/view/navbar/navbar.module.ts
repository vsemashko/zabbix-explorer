import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		SharedModule,
		RouterModule
	],
	declarations: [
		NavbarComponent
	],
	exports: [
		NavbarComponent
	]
})

export class NavbarModule {
}
