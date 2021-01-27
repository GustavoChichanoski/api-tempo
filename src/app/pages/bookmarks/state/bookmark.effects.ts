import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";

import { map, mergeMap, withLatestFrom } from "rxjs/operators";

import { AppState } from "src/app/shared/state/app.reducer";
import { WeatherService } from "src/app/shared/services/weather.service";
import { Bookmark } from "src/app/shared/models/bookmark.model";
import { CityWeather } from "src/app/shared/models/weather.model";

import * as fromBookmarksActions from './bookmarks.actions';
import * as fromBookmarksSelects from './bookmarks.selectors';

@Injectable()
export class BookmarkEffects {
  toggleBookmarksById$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromBookmarksActions.toggleBookmarkById),
      withLatestFrom(this.store.pipe(select(fromBookmarksSelects.selectBookmarksList))),
      mergeMap(([{ id }, bookmarks]: [{ id: number }, Bookmark[]]) => {
        if (bookmarks.some(bookmarks => bookmarks.id === id)) {
          return of(bookmarks.filter(bookmarks => bookmarks.id !== id));
        }
        return this.weatherService.getCityWeatherById(id.toString())
          .pipe(
            map((cityWeather: CityWeather) => {
              const bookmark = new Bookmark();
              bookmark.id = cityWeather.city.id;
              bookmark.coord = cityWeather.city.coord;
              bookmark.name = cityWeather.city.name;
              bookmark.country = cityWeather.city.country;
              return [...bookmarks, bookmark];
            }),
          );
      }),
      map((list: Bookmark[]) => fromBookmarksActions.updateBookmarksList({ list })),
    )
  );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private weatherService: WeatherService) { };
}