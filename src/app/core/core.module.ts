import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule, RequestOptions } from '@angular/http';
import { AuthenticationService } from './auth/authentication.service';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { ConfigService } from './config.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
	return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		JsonpModule
	],
	declarations: [],
	exports: [
		HttpModule,
		JsonpModule
	],
	providers: [
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [Http, RequestOptions]
		},
		AuthenticationService,
		ConfigService,
	]
})
export class CoreModule {
}
