import { NgModule } from '@angular/core';
import {
	MdButtonModule,
	MdCheckboxModule,
	MdCoreModule,
	MdDatepickerModule,
	MdGridListModule,
	MdIconModule,
	MdInputModule,
	MdListModule,
	MdMenuModule,
	MdNativeDateModule,
	MdSelectModule,
	MdToolbarModule
} from '@angular/material';

@NgModule({
	imports: [
		MdListModule,
		MdToolbarModule,
		MdMenuModule,
		MdButtonModule,
		MdInputModule,
		MdCheckboxModule,
		MdGridListModule,
		MdCoreModule,
		MdIconModule,
		MdSelectModule,
		MdDatepickerModule,
		MdNativeDateModule
	],
	exports: [
		MdListModule,
		MdToolbarModule,
		MdMenuModule,
		MdButtonModule,
		MdInputModule,
		MdCheckboxModule,
		MdGridListModule,
		MdCoreModule,
		MdIconModule,
		MdSelectModule,
		MdDatepickerModule,
		MdNativeDateModule
	],
})
export class MaterialModule {
}
