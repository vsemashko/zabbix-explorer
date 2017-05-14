import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'appDataFilter'})
export class DataFilterPipe implements PipeTransform {
	transform(array: any[], fieldName: string, query: string): any {
		return array.filter(row => row[fieldName].indexOf(query) > -1);
	}

}
