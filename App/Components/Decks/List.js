import React from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import PropTypes from "prop-types";

import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginVertical: 5,
    overflow: "hidden",
    elevation: 3
  },
  shadowIos: {
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowColor: "#333",
    shadowOffset: { height: 3, width: 0 },
    paddingHorizontal: 4
  },
  textContainer: {
    paddingHorizontal: 20,
    maxWidth: 200
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    color: "#999",
    flexWrap: "nowrap"
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center"
  },
  countCards: {
    margin: 3
  },
  image: {
    marginLeft: 15
  }
});

const DecksList = props => {
  const { decks, onShowDeck } = props;
  return (
    <FlatList
      data={decks}
      extraData={props}
      style={{ marginBottom: 8 }}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.shadowIos}>
          <TouchableOpacity
            onPress={() => onShowDeck(item)}
            style={styles.container}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text numberOfLines={1} style={styles.description}>
                {item.description}
              </Text>
            </View>
            <View style={styles.rowCenter}>
              <MaterialCommunity size={24} name="cards-outline" color="#333" />
              <Text style={styles.countCards}>{item.cards.length}</Text>
              <Image
                style={styles.image}
                source={{ uri: item.image, width: 90, height: 90 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

DecksList.propTypes = {
  decks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onShowDeck: PropTypes.func.isRequired
};

export default DecksList;
