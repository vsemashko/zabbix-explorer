import { NgModule } from '@angular/core';
import {
	MdButtonModule,
	MdCheckboxModule,
	MdCoreModule,
	MdGridListModule, MdIconModule,
	MdInputModule,
	MdListModule,
	MdMenuModule,
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
		MdIconModule
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
		MdIconModule
	],
})
export class MaterialModule {
}
