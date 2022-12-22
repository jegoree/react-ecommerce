import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocument } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './categories.action';

import CATEGORIES_ACTION_TYPES from './categories.types';

export function* fetchCategoriesAsync() {
  try {
    // Call is used for generator effect. Callable method and param.
    const categoriesArray = yield call(getCategoriesAndDocument, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// First generator that triggers when fetchCategoriesStart is called
// it responds to action
export function* onFetchCategories() {
  // Takelatest where we recieve action, call the last one
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// Accumulator that hold all of the saga that are related to categories
export function* categoriesSaga() {
  // Run all that is inside and only complete when all is done
  yield all([call(onFetchCategories)]);
}
