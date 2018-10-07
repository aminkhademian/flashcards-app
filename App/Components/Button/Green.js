import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3ed66f",
    alignItems: "center",
    padding: 15,
    borderRadius: 40,
    elevation: 3,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: "#3ed66f",
    shadowOffset: { height: 3, width: 0 },
    marginHorizontal: 4,
    marginVertical: 8
  },
  button: {
    flexDirection: "row",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    marginHorizontal: 5
  }
});

const Button = props => {
  const { onPress, text, icon, disabled, style } = props;
  return (
    <TouchableHighlight
      disabled={disabled}
      style={[
        styles.container,
        style,
        disabled
          ? [
              {
                opacity: 0.8,
                backgroundColor: "#c1c1c1",
                elevation: 0,
                shadowOpacity: 0
              }
            ]
          : []
      ]}
      onPress={() => onPress()}
      underlayColor="#36ba60"
    >
      <View style={styles.button}>
        {icon}
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableHighlight>
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
