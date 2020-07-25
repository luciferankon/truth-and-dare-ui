import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage,
} from "react-native";
import React, { useState } from "react";
import { Actions } from "react-native-router-flux";

export default function Homepage() {
  const [playerName, setPlayerName] = useState("");

  const savePlayer = async (name) => {
    try {
      await AsyncStorage.setItem("name", name);
      await fetch(`http://localhost:3000/add_player?player=${name}`)
    } catch (e) {
      console.log(e);
    }
  };

  const goToGame = async () => {
    await savePlayer(playerName);
    Actions.game();
  };
  return (
    <TouchableOpacity style={{ margin: 128 }}>
      <Text>Welcome to Truth and Dare!!!</Text>
      <Text>Enter your name</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setPlayerName(text)}
        value={playerName}
      />
      <Button title="Play" onPress={goToGame} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
