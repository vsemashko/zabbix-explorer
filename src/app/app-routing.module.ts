import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './common/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'login', component: LoginComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
	{path: '**', component: LoginComponent},
];
@NgModule({
	imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule {
}
