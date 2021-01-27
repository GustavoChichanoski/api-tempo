import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { dispatch } from "rxjs/internal/observable/pairs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromHomeActions from './home.actions';
import { WeatherService } from "src/app/shared/services/weather.service";

@Injectable()
export class HomeEffects {

  loadCurrentWeather$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromHomeActions.loadCurrentWeather),
      mergeMap(({ query }) =>
        this.WeatherService.getCityWeatherByQuery(query)),
      catchError((err, caught$) => {
        this.store.dispatch(fromHomeActions
          .loadCurrentWeatherFailure());
        return caught$;
      }),
      map((entity: any) => fromHomeActions.loadCurrentWeatherSuccess({ entity })),
    ),

  );

  constructor(private actions$: Actions, private store: Store, private WeatherService: WeatherService) { }
}