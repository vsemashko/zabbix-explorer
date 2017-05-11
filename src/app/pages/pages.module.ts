import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { SignupModule } from './signup/signup.module';
import { RouterModule } from '@angular/router';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { NavbarModule } from './view/navbar/navbar.module';

@NgModule({
	imports: [
		LoginModule,
		SignupModule,
		HomeModule,
		PageNotFoundModule,
		RouterModule
	],
	exports: [
		NavbarModule
	]
})

export class PagesModule {
}
