import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DailyWeather, Weather } from 'src/app/shared/models/weather.model';

import * as moment from 'moment-timezone';

@Component({
  selector: 'jv-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherComponent {

  @Input() dailyWeather: DailyWeather;
  @Input() timeZone: string;

  get weather(): Weather {
    return this.dailyWeather.weather;
  }

  get date(): string {
    return moment.unix(this.dailyWeather.date).format('DD MM - dddd');
  }

  get icon(): string {
    return `http://openweathermap.org/img/wn${this.weather.icon}@2x.png`;
  }

  unixToHourMinute(value: number): string {
    return moment.unix(value).tz(this.timeZone).format('HH:mm');
  }

}
