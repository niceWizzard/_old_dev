import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';



@Pipe({
  name: 'readableDate'
})
export class ReadableDatePipe implements PipeTransform {

  transform(input: Date): string {
    if(input == null) {
      return "";
    }
    const dateInput = dayjs(input);

    const currentDate = dayjs(new Date());
    const isAfterWeek = dayjs(currentDate).isAfter(dateInput, "week");
    const isAfterDay = dayjs(currentDate).isAfter(dateInput, "day");
    const isWithinWeek = !isAfterWeek && isAfterDay;

    if(isAfterWeek) {
      return dateInput.format("h:m a : DD, MMMM YYYY")
    }

    if(isWithinWeek) {
      return dateInput.format("dddd, h:m a ")
    }

    const isAfterHour = dayjs(currentDate).isAfter(dateInput, "hours");

    if(isAfterHour) {
      return dateInput.format("h [hour(s)] m [minute(s)] [ago]")
    }

    const isAfterMinute = dayjs(currentDate).isAfter(dateInput, "m");

    if(isAfterMinute) {
      return dayjs(currentDate.diff(dateInput)).format("m [minute(s)] [ago]")
    }

    return dayjs(currentDate.diff(dateInput)).format("s [second(s)] [ago]")
    
  }

}
