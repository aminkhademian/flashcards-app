import React from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import PropTypes from "prop-types";

import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textContainer: {
    justifyContent: "space-around"
  },
  frontText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555"
  },
  infoText: {
    fontSize: 10,
    color: "#999"
  },
  iconCheck: {
    marginRight: 8
  }
});

const DecksList = props => {
  const { cards } = props;
  return (
    <FlatList
      extraData={props}
      data={cards}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <MaterialCommunity
            style={styles.iconCheck}
            name="check"
            color="#dadada"
            size={16}
          />
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => console.log(item.id)}
          >
            <View style={styles.item}>
              <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.frontText}>
                  {item.front.text}
                </Text>
                <Text numberOfLines={1} style={styles.infoText}>
                  {`step: 0  next: 5 day`}
                </Text>
              </View>
              <MaterialCommunity
                name="chevron-right"
                color="#dadada"
                size={24}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

DecksList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default DecksList;
