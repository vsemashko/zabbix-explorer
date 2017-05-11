import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { LoadingMaskModule } from './shared/loading-mask/loading-mask.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule,
		PagesModule,
		AppRoutingModule,
		LoadingMaskModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
