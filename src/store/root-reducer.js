import { combineReducers } from 'redux';

import { useReducer, userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({ user: userReducer });
