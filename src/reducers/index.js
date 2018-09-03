import { combineReducers } from 'redux';
import booklistReducer from './reducer-BookList';
import hui from './loading';
import selectBookReducer from './reducer-selectBook';

const rootReducer = combineReducers({
  books: booklistReducer,
  currentBook: selectBookReducer,
});

export default rootReducer;
