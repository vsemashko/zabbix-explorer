import { Injectable } from '@angular/core';
import { ConfigService } from '../../core/config.service';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../../core/headers';

export class AvailabilityRecord {
	constructor(public host: string,
	            public success: string,
	            public failure: string) {}
}

@Injectable()
export class AvailabilityReportService {

	constructor(private authHttp: AuthHttp,
	            private configService: ConfigService) { }

	sendReport(): Observable<void> {
		return this.authHttp.post(`${this.configService.baseUrl}/api/send-availability-report`, {}, {headers: contentHeaders})
			.map(response => response.json());
	}

	getAvailabilityReport(from: number, to: number): Observable<AvailabilityRecord[]> {
		return this.authHttp.get(`${this.configService.baseUrl}/api/availability-report?from=${from}&to${to}`)
			.map(response => response.json().map(record => new AvailabilityRecord(record.host, record.success, record.failure)));
	}

}
