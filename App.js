import React from 'react'

import Feed from './src/Views/Feed/Feed';
import Login from "./src/Views/Login/Login";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation"

const navigator = createStackNavigator({
  Login: { screen: Login },
  Feed: { screen: Feed }
})

const AppContainer = createAppContainer(navigator)

export default function App() {
  return (
    <AppContainer />
  );
}
