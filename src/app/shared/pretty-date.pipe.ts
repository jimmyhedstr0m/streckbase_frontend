import { Pipe, PipeTransform } from '@angular/core';
import * as distanceInWords from "date-fns/distance_in_words"
import * as svLocale from "date-fns/locale/sv";

@Pipe({ name: "prettyDate" })
export class PrettyDatePipe implements PipeTransform {
  transform(value: any): string {
    return distanceInWords(new Date(), value, { locale: svLocale, addSuffix: true });
  }
}