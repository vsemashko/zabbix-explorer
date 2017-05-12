import { Injectable } from '@angular/core';
import { ConfigService } from '../../core/config.service';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../../core/headers';

@Injectable()
export class ZabbixReportService {

	constructor(private authHttp: AuthHttp,
	            private configService: ConfigService) { }

	sendReport(): Observable<void> {
		return this.authHttp.post(`${this.configService.baseUrl}/api/sendReport`, {}, {headers: contentHeaders})
			.map(response => response.json());
	}

}
