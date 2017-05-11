import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {
	private _baseUrl = environment.baseUrl;

	get baseUrl(): string {
		return this._baseUrl;
	}
}
