import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingMaskService } from './loading-mask.service';

@Component({
	selector: 'app-loading-mask',
	templateUrl: 'loading-mask.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingMaskComponent implements OnInit {
	showMask: boolean;

	constructor(public service: LoadingMaskService,
	            private ref: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.service.onChange.subscribe((showMask) => {
			this.showMask = showMask;
			this.ref.markForCheck();
		});
	}
}