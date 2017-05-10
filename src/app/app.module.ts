import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MdButtonModule,
	MdCheckboxModule,
	MdCoreModule,
	MdGridListModule,
	MdInputModule,
	MdListModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
	return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		SignupComponent,
		PageNotFoundComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		MdListModule,
		MdButtonModule,
		MdInputModule,
		MdCheckboxModule,
		MdGridListModule,
		MdCoreModule
	],
	providers: [
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [Http, RequestOptions]
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
