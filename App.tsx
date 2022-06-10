import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import "./config/firebase";
import RootNavigation from "./navigation";
import store from "./redux/store";
import { RootSiblingParent } from 'react-native-root-siblings';


export default function App() {
  return (
    <RootSiblingParent>
    <Provider store={store}>
        <RootNavigation />
      </Provider>
    </RootSiblingParent>
  );
}
