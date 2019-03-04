import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  UIManager,
  LayoutAnimation,
  Image,
  View
} from "react-native";
import jake from "./jake.png";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { position: "flex-start" };
  }

  changePosition = position => {
    LayoutAnimation.spring();
    this.setState({
      position
    });
  };

  render() {
    return (
      <View style={[styles.container, { justifyContent: this.state.position }]}>
        <Image source={jake} />
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            title="Top"
            onPress={() => this.changePosition("flex-start")}
          />
          <Button
            style={styles.button}
            title="Middle"
            onPress={() => this.changePosition("center")}
          />
          <Button
            style={styles.button}
            title="Bottom"
            onPress={() => this.changePosition("flex-end")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 64,
    paddingBottom: 32
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 16,
    width: "100%"
  },
  button: {
    width: 100
  }
});
