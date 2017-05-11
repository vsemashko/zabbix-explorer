import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { NotAuthGuard } from '../../core/auth/not-auth.guard';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'login',
				component: LoginComponent,
				canActivate: [NotAuthGuard]
			}
		])
	],
	exports: [
		RouterModule
	]
})
export class LoginRoutingModule {
}
