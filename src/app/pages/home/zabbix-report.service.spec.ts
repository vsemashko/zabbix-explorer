import { TestBed, inject } from '@angular/core/testing';

import { AvailabilityReportService } from './availability-report.service';

describe('AvailabilityReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityReportService]
    });
  });

  it('should ...', inject([AvailabilityReportService], (service: AvailabilityReportService) => {
    expect(service).toBeTruthy();
  }));
});
