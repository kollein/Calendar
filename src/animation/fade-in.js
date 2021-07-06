import React from "react";
import { Animated } from "react-native";

export default class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  };

  componentDidMount() {
    console.log("didmount");

    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 2000 // Make it take a while
      }
    ).start(); // Starts the animation
  }

  componentDidUpdate(prevProps) {
    console.log("didupdate", this.props.style, prevProps.style);
    if (this.props.style != prevProps.style) {
      console.log("Color", this.props.style.color, prevProps.style.color);
      this.state.fadeAnim.setValue(0);
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 1, // Animate to opacity: 1 (opaque)
          duration: 1000 // Make it take a while
        }
      ).start(); // Starts the animation
    }
  }

  render() {
    console.log("this.props.style", this.state, this.props.style);
    let { fadeAnim } = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
