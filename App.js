import React, { Component } from 'react';
import {
  Animated,
  Button,
  StyleSheet,
  Easing,
  View,
  PanResponder,
} from 'react-native';
import jake from './jake.png';

export default class App extends Component {
  constructor(props) {
    super(props);

    this._rotationAnimation = new Animated.Value(0);
    this._rotationOffset = 0;

    this._gestureOffset = { x: 0, y: 0 };
    this._gestureValue = new Animated.ValueXY();
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        this._gestureValue.setValue({
          x: this._gestureOffset.x + gestureState.dx,
          y: this._gestureOffset.y + gestureState.dy
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this._gestureOffset.x += gestureState.dx;
        this._gestureOffset.y += gestureState.dy;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });

    this.state = {
      spinning: false,
    };
  }

  startLoopAnimation = () => {
    this._rotationAnimation.setOffset(this._rotationOffset);
    Animated.loop(
      Animated.timing(this._rotationAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
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
      outputRange: ['0deg', '360deg'],
    });
    return { rotate };
  };

  render() {
    return (
      <View style={[styles.container]}>
        <Animated.Image
          source={jake}
          style={{
            transform: [
              this.getRotationAnimation(),
              { translateX: this._gestureValue.x },
              { translateY: this._gestureValue.y },
            ],
          }}
          {...this._panResponder.panHandlers}
        />
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            title={
              this.state.spinning ? 'Turn Spinning Off' : 'Turn Spinning On'
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 64,
    paddingBottom: 32,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  button: {
    width: 100,
  },
});
