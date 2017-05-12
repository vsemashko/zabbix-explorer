import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class LoggerService {
	constructor(private toastr: ToastsManager) {}

	log(message: string | any, showToast: boolean = true) {
		console.log(message);
		if (showToast) {
			this.toastr.info(message, 'Info');
		}
	}

	success(message: string | any, showToast: boolean = true) {
		console.log(message);
		if (showToast) {
			this.toastr.success(message, 'Sucess');
		}
	}

	warn(message: string | any, showToast: boolean = true) {
		console.log(message);
		if (showToast) {
			this.toastr.warning(message, 'Warning');
		}

	}

	error(error: string | any, showToast: boolean = true) {
		console.error(error);
		if (showToast) {
			this.toastr.error(error, 'Error');
		}
	}

	debug(message: string | any, showToast: boolean = true) {
		if (!environment.production) {
			console.log(message);
			if (showToast) {
				this.toastr.info(message, 'Debug');
			}
		}
	}
}