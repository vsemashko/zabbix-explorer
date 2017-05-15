import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'appTimeString', pure: true})
export class TimeStringPipe implements PipeTransform {
	transform(milliseconds: number): any {
		const oneSecond = 1000;
		const oneMinute = oneSecond * 60;
		const oneHour = oneMinute * 60;
		const oneDay = oneHour * 24;

		const seconds = Math.floor((milliseconds % oneMinute) / oneSecond);
		const minutes = Math.floor((milliseconds % oneHour) / oneMinute);
		const hours = Math.floor((milliseconds % oneDay) / oneHour);
		const days = Math.floor(milliseconds / oneDay);

		let timeString = '';
		if (days !== 0) {
			timeString += (days !== 1) ? (days + ' days ') : (days + ' day ');
		}
		if (hours !== 0) {
			timeString += (hours !== 1) ? (hours + ' hours ') : (hours + ' hour ');
		}
		if (minutes !== 0) {
			timeString += (minutes !== 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
		}
		if (seconds !== 0 || milliseconds < 1000) {
			timeString += (seconds !== 1) ? (seconds + ' seconds ') : (seconds + ' second ');
		}
		return timeString;
	}
}
