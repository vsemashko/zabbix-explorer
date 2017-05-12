import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ZabbixReportService } from './zabbix-report.service';

@NgModule({
	imports: [
		SharedModule,
		HomeRoutingModule
	],
	declarations: [
		HomeComponent
	],
	providers: [
		ZabbixReportService
	]
})

export class HomeModule {
}
