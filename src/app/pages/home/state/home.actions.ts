import { createAction, props } from '@ngrx/store';
import { Bookmark } from 'src/app/shared/models/bookmark.model';

export const clearHomeState = createAction('[Home] Cler Home State');

export const loadCurrentWeather = createAction(
    '[HOME] Load Current Weather',
    props<{ query: string }>(),
);

export const loadCurrentWeatherById = createAction(
    '[HOME] Load Current Weather By Id',
    props<{ id: string }>(),
);

export const loadCurrentWeatherSuccess = createAction(
    '[Weather API] Load Current Weather Success',
    props<{ entity: any }>(),
);

export const loadCurrentWeatherFailure = createAction(
    '[Weather API] Load Current Weather Failure'
);

export const toggleBookmark = createAction(
    '[Home] Toggle Bookmark',
    props<{ entity: Bookmark }>(),
);