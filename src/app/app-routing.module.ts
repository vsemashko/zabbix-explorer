import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NotAuthGuard } from 'app/core/auth/not-auth.guard';

const routes: Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: '**', component: PageNotFoundComponent},
];
@NgModule({
	imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule],
	providers: [AuthGuard, NotAuthGuard]
})
export class AppRoutingModule {
}
