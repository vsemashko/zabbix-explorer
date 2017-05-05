import { Routes } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'login', component: LoginComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
	{path: '**', component: LoginComponent},
];
