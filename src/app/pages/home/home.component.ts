import { Component } from '@angular/core';
import { LoggerService } from '../../core/logger/logger.service';
import { ZabbixReportService } from './zabbix-report.service';
import { LoadingMaskService } from '../../shared/loading-mask/loading-mask.service';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	constructor(private logger: LoggerService,
	            private loadingMask: LoadingMaskService,
	            private reportService: ZabbixReportService) {}

	sendReport() {
		this.loadingMask.addLoading();
		this.reportService.sendReport()
			.subscribe(() => {
					this.logger.success('Report successfully sent');
					this.loadingMask.removeLoading();
				},
				(err) => {
					this.logger.error(err);
					this.loadingMask.removeLoading();
				});
	}
}
