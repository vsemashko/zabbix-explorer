import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoggerService } from '../../../core/logger/logger.service';
import { LoadingMaskService } from '../../../shared/loading-mask/loading-mask.service';
import { AvailabilityRecord, AvailabilityReportService } from '../availability-report.service';

@Component({
	selector: 'app-availability-report',
	templateUrl: './availability-report.component.html',
	styleUrls: ['./availability-report.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AvailabilityReportComponent implements OnInit {
	fromDate: Date;
	toDate: Date;

	records: AvailabilityRecord[];

	public filterQuery = '';
	public rowsOnPageOptions = [5, 50, 100];
	public rowsOnPage = this.rowsOnPageOptions[0];
	public sortBy = 'host';
	public sortOrder = 'asc';

	constructor(private logger: LoggerService,
	            private loadingMask: LoadingMaskService,
	            private availabilityReportService: AvailabilityReportService) { }

	ngOnInit() {
		this.generateReport();
	}

	generateReport() {
		const from = this.fromDate ? this.fromDate.getDate() : null;
		const to = this.toDate ? this.toDate.getDate() : null;
		this.loadingMask.addLoading();
		this.availabilityReportService.getAvailabilityReport(from, to)
			.subscribe((records: AvailabilityRecord[]) => {
				this.records = records;
				this.loadingMask.removeLoading();
			}, (err) => {
				this.logger.error(err);
				this.loadingMask.removeLoading();
			});
	}

	sendReport() {
		this.loadingMask.addLoading();
		this.availabilityReportService.sendReport()
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
