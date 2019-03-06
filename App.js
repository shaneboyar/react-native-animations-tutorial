import React, { Component } from "react";
import { Animated, Button, StyleSheet, Easing, View } from "react-native";
import jake from "./jake.png";

export default class App extends Component {
  constructor(props) {
    super(props);

    this._rotationAnimation = new Animated.Value(0);
    this._rotationOffset = 0;

    this.state = {
      spinning: false
    };
  }

  startLoopAnimation = () => {
    this._rotationAnimation.setOffset(this._rotationOffset);
    Animated.loop(
      Animated.timing(this._rotationAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      })
    ).start();
  };

  stopLoopAnimation = () => {
    this._rotationAnimation.stopAnimation(currentValue => {
      this._rotationOffset = currentValue;
    });
  };

  toggleSpinning = () => {
    this.setState({ spinning: !this.state.spinning }, () => {
      this.state.spinning
        ? this.startLoopAnimation()
        : this.stopLoopAnimation();
    });
  };

  getRotationAnimation = () => {
    const rotate = this._rotationAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return { rotate };
  };

  render() {
    return (
      <View style={[styles.container]}>
        <Animated.Image
          source={jake}
          style={{ transform: [this.getRotationAnimation()] }}
        />
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            title={
              this.state.spinning ? "Turn Spinning Off" : "Turn Spinning On"
            }
            onPress={() => this.toggleSpinning()}
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
