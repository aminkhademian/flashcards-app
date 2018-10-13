import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import ButtonBlue from "App/Components/Button/Blue";
import Ionicons from "@expo/vector-icons/Ionicons";
import DecksList from "App/Components/Decks/List";
import { showDeck } from "App/Store/decks/actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    marginTop: 75,
    marginBottom: 8
  },
  decks: {
    flex: 1
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  nothingText: {
    fontSize: 24,
    color: "#999",
    marginVertical: 15
  },
  emptyText: {
    fontSize: 18,
    color: "#999"
  }
});

const FlashCards = props => {
  const { decks, navigation, showDeckAction } = props;
  return (
    <View style={styles.container}>
      <View style={styles.decks}>
        {decks.length > 0 ? (
          <DecksList
            decks={decks}
            onShowDeck={item => {
              showDeckAction(item);
              navigation.navigate("Deck", item);
            }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Entypo name="archive" size={120} color="#999" />
            <Text style={styles.nothingText}>NOTHING!!</Text>
            <Text style={styles.emptyText}>you have no deck yet</Text>
          </View>
        )}
        <ButtonBlue
          text="create a new deck"
          icon={
            <Ionicons name="ios-add-circle-outline" size={24} color="#fff" />
          }
          onPress={() => navigation.navigate("CreateDeck")}
        />
      </View>
    </View>
  );
};

FlashCards.propTypes = {
  decks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  showDeckAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  decks: state.decks.list
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDeckAction: showDeck
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashCards);
