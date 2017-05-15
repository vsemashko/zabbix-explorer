import { Component, OnInit } from '@angular/core';
import { ReportSchedule, ReportScheduleService } from './report-schedule.service';
import { LoggerService } from '../../core/logger/logger.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-report-schedule',
	templateUrl: './report-schedule.component.html',
	styleUrls: ['./report-schedule.component.scss']
})
export class ReportScheduleComponent implements OnInit {
	public reportSchedules: ReportSchedule[];

	constructor(private route: ActivatedRoute,
	            private logger: LoggerService,
	            private reportScheduleService: ReportScheduleService) { }

	ngOnInit() {
		this.route.data.forEach((data: { schedules: ReportSchedule[] }) => {
			this.reportSchedules = data.schedules;
		});
	}

	updateReportInterval(schedule: ReportSchedule, newInterval: number) {
		schedule.interval = newInterval;
		this.updateReportSchedule(schedule);
	}

	toggleReportActive(schedule: ReportSchedule) {
		schedule.active = !schedule.active;
		this.updateReportSchedule(schedule);
	}

	private updateReportSchedule(reportSchedule: ReportSchedule) {
		this.reportScheduleService.updateReportSchedule(reportSchedule)
			.subscribe(message => this.logger.success(message.message),
				err => this.logger.error(err));
	}
}
