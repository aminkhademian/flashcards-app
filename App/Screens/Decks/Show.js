import React from 'react'
import { Alert, AsyncStorage, View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons"
import filter from 'lodash/filter'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addDeckToState } from 'App/Store/decks/actions'

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: width,
    height: height / 4,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height / 4,
  },
  imageBlur: {
    width: width,
    height: height / 4,
    backgroundColor: "rgba(0,0,0,.4)",
  },
  cardsContainer: {
    flex: 1,
    elevation: 3,
    marginTop: -50,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowColor: '#333',
    shadowOffset: { height: 3, width: 0 },
  },
  cardsHeader: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#eee", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: "space-around"
  },
  addCardsButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  newText: {
    fontSize: 10,
    color: "#999",
    position: "absolute",
    right: -13,
    bottom: 8
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  nothingText: {
    fontSize: 20,
    color: "#999",
    marginVertical: 8
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  }
})

class ShowDeck extends React.Component {
  confirmation = () => {
    const { title } = this.props
    Alert.alert(
      'Delete Deck',
      `Are you sure delete ${title} ?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Ok', onPress: () => this.removeDeck() },
      ],
      { cancelable: false }
    )
  }
  removeDeck = async () => {
    const { id } = this.props
    const existingFlashCards = await AsyncStorage.getItem("flashCards")
    let newDeck = JSON.parse(existingFlashCards);
    if (!newDeck) {
      newDeck = []
    }
    const decksToBeSaved = filter(newDeck, deck => deck.id !== id)
    await AsyncStorage.setItem("flashCards", JSON.stringify(decksToBeSaved))
      .then(() => {
        this.props.addDeckToState(decksToBeSaved)
        this.props.navigation.goBack()
      })
      .catch(() => {
        console.warn("There was an error saving the deck")
      })
  }
  render() {
    const { image, cards, navigation } = this.props
    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.imageBlur} />
          </View>
          <View style={styles.cardsContainer}>
            <View style={styles.cardsHeader}>
              <Text>{`All - ${cards.length}`}</Text>
              <Text>Learning - 0</Text>
            </View>
            {cards.length > 0 ? (
              <View/>
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialCommunity name="cards-outline" size={90} color="#999" />
                <Text style={styles.nothingText}>NOTHING!!</Text>
                <Text style={styles.emptyText}>you have no card yet</Text>
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.addCardsButton}>
              <TouchableOpacity onPress={() => navigation.navigate("CreateCard")}>
                  <MaterialCommunity name="cards-outline" size={40} color="#999" />
              </TouchableOpacity>
              <Text style={styles.newText}>new</Text>
            </View>
          <TouchableOpacity onPress={() => console.log("play all")}>
            <MaterialCommunity name="play-circle-outline" size={40} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.confirmation()}>
            <MaterialCommunity name="delete" size={40} color="#999" />
          </TouchableOpacity>
          </View>
        </View>
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDeckToState
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(ShowDeck)