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
	MdToolbarModule,
	MdSlideToggleModule
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
		MdNativeDateModule,
		MdSlideToggleModule
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
		MdNativeDateModule,
		MdSlideToggleModule
	],
})
export class MaterialModule {
}
