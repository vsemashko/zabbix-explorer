import { NgModule } from '@angular/core';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		SignupRoutingModule
	],
	declarations: [
		SignupComponent
	],
	providers: []
})

export class SignupModule {
}
