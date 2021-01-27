import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookmarksPage } from './containers/bookmarks.page';
import { bookmarkReducer } from './state/bookmarks.reducer';

import { ComponentsModule } from 'src/app/shared/components/components.module';
import { BookmarkEffects } from './state/bookmark.effects';

@NgModule({
  declarations: [BookmarksPage],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('bookmarks',bookmarkReducer),
    EffectsModule.forFeature([BookmarkEffects]),
    ComponentsModule,
  ],
})
export class BookmarksModule { };
