import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { formsActions, ngrxFormsQuery } from '@realworld/core/forms';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';
import { articleEditActions } from './article-edit.actions';

export const publishArticle$ = createEffect(
  (
    actions$ = inject(Actions),
    articlesService = inject(ArticlesService),
    store = inject(Store),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(articleEditActions.publishArticle),
      concatLatestFrom(() => store.select(ngrxFormsQuery.selectData)),
      concatMap(([_, data]) => {
        // Convert the tagList string into an array of tags
        const tagsArray = data.tagList.split(',').map((tag: string) => tag.trim());

        const updatedData = { ...data, tagList: tagsArray };

        return articlesService.publishArticle(updatedData).pipe(
          tap((result) => router.navigate(['article', result.article.slug])),
          map(() => {
            console.log("hi there");
            return articleEditActions.publishArticleSuccess()
          }),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        );
      }),
    );
  },
  { functional: true },
);
