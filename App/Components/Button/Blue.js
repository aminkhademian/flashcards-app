import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginVertical: 8,
    padding: 8,
    borderRadius: 40,
    backgroundColor: "#0099ff33"
  },
  button: {
    padding: 15,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#69c9ff"
  },
  buttonText: {
    color: "#fff",
    marginHorizontal: 8
  }
});

const Button = props => {
  const { onPress, text, icon, disabled, style } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      style={[
        styles.container,
        style,
        disabled
          ? {
              backgroundColor: "#c1c1c144"
            }
          : {}
      ]}
      onPress={() => onPress()}
    >
      <View
        style={[
          styles.button,
          disabled
            ? {
                backgroundColor: "#c1c1c144"
              }
            : {}
        ]}
      >
        {disabled ? <Ionicons name="ios-lock" size={24} color="#fff" /> : icon}
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  style: PropTypes.shape({})
};

Button.defaultProps = {
  icon: <View />,
  disabled: false,
  style: {}
};

export default Button;
