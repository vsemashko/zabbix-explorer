import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/auth/auth.guard';
import { ReportScheduleComponent } from './report-schedule.component';
import { ReportScheduleResolve } from './report-schedule-resolve.service';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'report-schedule',
				component: ReportScheduleComponent,
				canActivate: [AuthGuard],
				resolve: {
					schedules: ReportScheduleResolve
				}
			}
		])
	],
	providers: [
		ReportScheduleResolve
	],
	exports: [
		RouterModule
	]
})
export class ReportScheduleRoutingModule {
}
