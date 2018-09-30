import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import firebase from 'firebase';
// import 'firebase/firestore';
import firebase from '@firebase/app';
import '@firebase/firestore';
// import 'firebase/auth'

import {
  reactReduxFirebase,
  firebaseReducer,
  getFirebase
} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import booklistReducer from './reducers/reducer-BookList';
import selectBookReducer from './reducers/reducer-selectBook';
import watchListReducer from './reducers/reducer-watchlist';
import loadingReducer from './reducers/loading';

const firebaseConfig = {
  apiKey: 'AIzaSyAmnuaDDvsE2MO2h-lI4sLZji1AGyjjNcs',
  authDomain: 'bookworm-cbdae.firebaseapp.com',
  databaseURL: 'https://bookworm-cbdae.firebaseio.com',
  projectId: 'bookworm-cbdae',
  storageBucket: 'bookworm-cbdae.appspot.com',
  messagingSenderId: '96076398651'
};

//react-redux-firebase config
const rrConfig = {
  userProfile: 'books',
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  books: booklistReducer,
  currentBook: selectBookReducer,
  watchList: watchListReducer,
  loading: loadingReducer
});

const initialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
