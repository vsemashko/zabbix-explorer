import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { IfAuthenticatedDirective } from '../core/auth/if-authenticated.directive';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from 'angular2-material-datepicker';
import { DataTableModule } from 'angular2-datatable';

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
		DatepickerModule,
		DataTableModule,
		IfAuthenticatedDirective
	]
})
export class SharedModule {
}
