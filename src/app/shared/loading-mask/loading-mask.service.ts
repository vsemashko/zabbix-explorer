import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class LoadingMaskService {
	@Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	private waitingCount = 0;
	private isShown = false;

	addLoading() {
		this.waitingCount++;
		this.updateLoadingMask();
	}

	removeLoading() {
		this.waitingCount--;
		this.updateLoadingMask();
	}

	isLoading(): boolean {
		return this.isShown;
	}

	private updateLoadingMask() {
		if (this.waitingCount === 0 && this.isShown) {
			this.isShown = false;
			this.onChange.emit(this.isShown);
		} else if (!this.isShown) {
			this.isShown = true;
			this.onChange.emit(this.isShown);
		}
	}

}