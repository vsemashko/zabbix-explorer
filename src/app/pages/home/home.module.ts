import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AvailabilityReportService } from './availability-report.service';
import { AvailabilityReportComponent } from './availability-report/availability-report.component';
import { DataFilterPipe } from './availability-report/data-filter.pipe';

@NgModule({
	imports: [
		SharedModule,
		HomeRoutingModule
	],
	declarations: [
		HomeComponent,
		AvailabilityReportComponent,
		DataFilterPipe
	],
	providers: [
		AvailabilityReportService
	]
})

export class HomeModule {
}
