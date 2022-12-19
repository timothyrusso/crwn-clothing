import { CATEGORIES_ACTION_TYPES } from './categoriy.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
