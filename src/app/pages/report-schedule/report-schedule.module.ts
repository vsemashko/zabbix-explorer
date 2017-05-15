import { NgModule } from '@angular/core';
import { ReportScheduleComponent } from './report-schedule.component';
import { ReportScheduleRoutingModule } from 'app/pages/report-schedule/report-schedule-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ReportScheduleService } from './report-schedule.service';
import { TimeStringPipe } from './time-string.pipe';

@NgModule({
	imports: [
		SharedModule,
		ReportScheduleRoutingModule
	],
	declarations: [
		ReportScheduleComponent,
		TimeStringPipe
	],
	providers: [
		ReportScheduleService
	]
})
export class ReportScheduleModule {
}
