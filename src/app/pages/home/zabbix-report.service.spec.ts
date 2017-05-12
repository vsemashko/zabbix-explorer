import { TestBed, inject } from '@angular/core/testing';

import { ZabbixReportService } from './zabbix-report.service';

describe('ZabbixReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZabbixReportService]
    });
  });

  it('should ...', inject([ZabbixReportService], (service: ZabbixReportService) => {
    expect(service).toBeTruthy();
  }));
});
