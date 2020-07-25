
import React from "react"
import Homepage from "../screens/Homepage";
import { Router, Scene } from "react-native-router-flux";
import Gameplay from "../screens/Gameplay";

const AppRoutes = () => {
  return (
    <Router>
      <Scene key = "root">
         <Scene key = "home" component = {Homepage} title = "Truth and Dare" initial />
         <Scene key = "game" component = {Gameplay} title = "Game" />
      </Scene>
    </Router>
  );
};

export default AppRoutes;
