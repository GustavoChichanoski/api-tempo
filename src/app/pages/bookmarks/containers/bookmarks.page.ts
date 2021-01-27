import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Actions } from '@ngrx/store-devtools/src/reducer';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/shared/state/app.reducer';

import * as fromBookmarksSelectors from '../state/bookmarks.selectors';
import * as fromBookmarkActions from '../state/bookmarks.actions';
import { CityTypeaheadItem } from 'src/app/shared/models/city-typeahead-item.model';
import { Bookmark } from 'src/app/shared/models/bookmark.model';

@Component({
  selector: 'jv-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})
export class BookmarksPage implements OnInit, OnDestroy {

  bookmarks$: Observable<Bookmark[]>
  searchTypeaheadControl = new FormControl(undefined);
  private componentDestroyed$ = new Subject();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.bookmarks$ = this.store.pipe(select(fromBookmarksSelectors.selectBookmarksList));
    this.searchTypeaheadControl.valueChanges
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((value: CityTypeaheadItem) =>
      this.store.dispatch(fromBookmarkActions.toggleBookmarkById({ id: value.geonameid})));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  removeBookmark(id: number) { this.store.dispatch(fromBookmarkActions.removeBookmark({id})); }

}
