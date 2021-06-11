import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
})
export class StarRatingPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    if (parseInt(args[0]) >= parseInt(value) + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
