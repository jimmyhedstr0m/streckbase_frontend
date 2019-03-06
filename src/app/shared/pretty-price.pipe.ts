import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "prettyPrice"
})
export class PrettyPricePipe implements PipeTransform {
  private formatter: Intl.NumberFormat = new Intl.NumberFormat("sv-SE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  transform(value: any): string {
    return this.formatter.format(value) + " kr";
  }
}