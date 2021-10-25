import { combineReducers } from 'redux'
import ui_status from './ui_status'
import home from './home'

export const rootReducer = combineReducers({
  ui_status,
  home,
});

export type RootState = Readonly<ReturnType<typeof rootReducer>>;