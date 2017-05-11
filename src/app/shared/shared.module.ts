import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { IfAuthenticatedDirective } from '../core/auth/if-authenticated.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		IfAuthenticatedDirective
	],
	exports: [
		CommonModule,
		FormsModule,
		MaterialModule,
		IfAuthenticatedDirective
	]
})
export class SharedModule {
}
