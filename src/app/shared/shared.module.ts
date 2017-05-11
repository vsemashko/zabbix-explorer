import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { IfAuthenticatedDirective } from '../core/auth/if-authenticated.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		IfAuthenticatedDirective
	],
	exports: [
		CommonModule,
		MaterialModule,
		IfAuthenticatedDirective
	]
})
export class SharedModule {
}
