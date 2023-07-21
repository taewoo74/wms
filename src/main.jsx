import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/views/App';
import logger from 'redux-logger';
import { PersistGate } from "redux-persist/integration/react"; 
import { persistStore } from "redux-persist"; 
import { Provider } from 'react-redux';
import rootReducer from '../src/store/index'
import ReduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  middleware: [ReduxThunk],
}); 

const persistor = persistStore(store); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
