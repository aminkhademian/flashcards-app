import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  button: {
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    elevation: 3,
    width: 74,
    height: 74,
    borderRadius: 75
  },
  bg: {
    width: 74,
    height: 74,
    position: "absolute",
    borderRadius: 75
  },
  icon: {
    borderWidth: 1,
    position: "relative",
    overflow: "hidden",
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 75,
    width: 64,
    height: 64
  }
});

class Button extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    color: PropTypes.string.isRequired
  };

  state = {
    opacity: new Animated.Value(0)
  };

  handleButtonAnimation = () => {
    const { opacity } = this.state;
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200
      })
    ]).start();
  };

  handleButtonSwiping = x => {
    const { opacity } = this.state;
    opacity.setValue(x / 100);
  };

  handleButtonSwipingEnd = () => {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200
    }).start();
  };

  render() {
    const { opacity } = this.state;
    const { children, color, onPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={styles.button}>
          <View style={styles.icon}>
            <Animated.View
              style={[styles.bg, { opacity, backgroundColor: color }]}
            />
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Button;
