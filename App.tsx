import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import './config/firebase';
import RootNavigation from './navigation';
import store from "./redux/store"

export default function App() {
  return (
    <Provider store={store}>
    <RootNavigation />
    </Provider>
  );
}