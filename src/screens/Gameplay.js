import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  AsyncStorage,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Gameplay() {
  const [game, setGame] = useState({});
  const [question, setQuestion] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    async function startGame() {
      fetch("http://localhost:3000/play")
        .then((res) => res.json())
        .then((game) => setGame(game));

      setPlayerName(await AsyncStorage.getItem("name"));
      setInterval(
        () =>
          fetch("http://localhost:3000/game")
            .then((res) => res.json())
            .then((game) => setGame(game)),
        2000
      );
    }
    startGame();
  }, []);

  const submitQuestion = (question) => {
    fetch(`http://localhost:3000/question?question=${question}`);
  };

  const submitAnswer = (answer) => {
    fetch(`http://localhost:3000/answer?answer=${answer}`);
  };

  const isEvenLength = (list = []) => !!(list.length % 2);

  return (
    <TouchableOpacity style={styles.container}>
      <Text>It's {game.turn}'s turn.</Text>
      <Text>Questioner is {game.questioner}</Text>
      {game["question-answers"] &&
        game["question-answers"].map((s, i) => {
          let statement = `${game.questioner} asked ${s}`;
          if (i % 2 != 0) {
            statement = `${game.turn} answered ${s}`;
          }
          return <Text>{statement}</Text>;
        })}
      {!isEvenLength(game["question-answers"]) && playerName != game.turn && (
        <View>
          <Text>Ask question?</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => setQuestion(text)}
            value={question}
          />
          <Button title="Submit" onPress={() => submitQuestion(question)} />
        </View>
      )}
      {isEvenLength(game["question-answers"]) && game.turn == playerName && (
        <View>
          <Text>Enter Answer</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => setAnswer(text)}
            value={answer}
          />
          <Button title="Submit" onPress={() => submitAnswer(answer)} />
        </View>
      )}
      <StatusBar style="auto" />
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
