import { Injectable } from '@angular/core';
import { ConfigService } from 'app/core/config.service';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../../core/headers';

export class ReportSchedule {
	constructor(public report: string,
	            public interval: number,
	            public active: boolean,
	            public lastSent: string) {}
}

@Injectable()
export class ReportScheduleService {
	constructor(public authHttp: AuthHttp,
	            private configService: ConfigService) { }

	getReportSchedules(): Observable<ReportSchedule[]> {
		return this.authHttp.get(`${this.configService.baseUrl}/api/report-schedule`)
			.map(response => response.json()
				.map(el => new ReportSchedule(el.report, el.interval, el.active, el.lastSent)));
	}

	updateReportSchedule(reportSchedule: ReportSchedule): Observable<any> {
		const body = JSON.stringify(reportSchedule);
		return this.authHttp.put(`${this.configService.baseUrl}/api/report-schedule`, body, {headers: contentHeaders})
			.map(response => response.json());
	}

}
