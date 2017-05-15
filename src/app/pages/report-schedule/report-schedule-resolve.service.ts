import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoadingMaskService } from 'app/shared/loading-mask/loading-mask.service';
import { ReportSchedule, ReportScheduleService } from './report-schedule.service';

@Injectable()
export class ReportScheduleResolve implements Resolve<ReportSchedule[]> {

	constructor(private service: ReportScheduleService,
	            private mask: LoadingMaskService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<ReportSchedule[]> {
		this.mask.addLoading();
		return this.service.getReportSchedules()
			.map((schedules: ReportSchedule[]) => {
				this.mask.removeLoading();
				return schedules;
			});
	}
}
