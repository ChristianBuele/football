import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesSeconds'
})
export class MinutesSecondsPipe implements PipeTransform {
  transform(value: number|null): string {
    if(value!=null){
      const minutes: number = Math.floor(value / 60);
    const seconds: number = value % 60;
    const minutesString: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesString}:${secondsString}`;
    }
    return `00:00`;
  }
}