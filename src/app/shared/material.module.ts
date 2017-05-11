import { NgModule } from '@angular/core';
import {
	MdButtonModule,
	MdCheckboxModule,
	MdCoreModule,
	MdGridListModule,
	MdInputModule,
	MdListModule
} from '@angular/material';

@NgModule({
	imports: [
		MdListModule,
		MdButtonModule,
		MdInputModule,
		MdCheckboxModule,
		MdGridListModule,
		MdCoreModule
	],
	exports: [
		MdListModule,
		MdButtonModule,
		MdInputModule,
		MdCheckboxModule,
		MdGridListModule,
		MdCoreModule
	],
})
export class MaterialModule {
}
