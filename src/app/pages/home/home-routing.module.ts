import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'home',
				component: HomeComponent,
				canActivate: [AuthGuard]
			}
		])
	],
	exports: [
		RouterModule
	]
})
export class HomeRoutingModule {
}
