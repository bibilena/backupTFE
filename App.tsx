import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import "./config/firebase";
import RootNavigation from "./navigation";
import store from "./redux/store";
import { RootSiblingParent } from "react-native-root-siblings";
import { StripeProvider } from "@stripe/stripe-react-native";
import Checkout from "./screens/CheckoutScreen";

export default function App() {
  return (
    <RootSiblingParent>
      <StripeProvider publishableKey="pk_test_51L8JnrHFcyb5feIxnFFsvw97goy2WERgWFeMll36umoWinQsirv354Jhss71T3e9InheAMVwnZ2Tjn6fvsqeDLzo00dngA5jku">
        <Provider store={store}>
          <RootNavigation />
        </Provider>
      </StripeProvider>
    </RootSiblingParent>
  );
}
