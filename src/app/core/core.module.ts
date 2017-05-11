import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule, RequestOptions } from '@angular/http';
import { AuthenticationService } from './auth/authentication.service';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { ConfigService } from './config.service';
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { ZabbixToastOptions } from './toastr/toastr-options';
import { LoggerService } from 'app/core/logger/logger.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
	return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		ToastModule.forRoot()
	],
	declarations: [],
	exports: [
		HttpModule,
		JsonpModule
	],
	providers: [
		{provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]},
		{provide: ToastOptions, useClass: ZabbixToastOptions},
		LoggerService,
		AuthenticationService,
		ConfigService,
	]
})
export class CoreModule {
}
