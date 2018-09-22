import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import DecksList from 'App/Components/Decks/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 8
  },
  decks: {
    flex: 1
  },
  button: {
    backgroundColor: '#3ed66f',
    alignItems: 'center',
    padding: 15,
    borderRadius: 3,
    elevation: 4,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: '#3ed66f',
    shadowOffset: { height: 3, width: 0 },
  },
  buttonText: {
    color: "#fff"
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
    color: "#999",
  }
})

class FlashCards extends React.Component {
  state = {
    decks: []
  }
  async componentDidMount() {
    const decks = await AsyncStorage.getItem("flashCards")
    if (decks) this.setState({ decks: JSON.parse(decks) })
  }
  render() {
    const { decks } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.decks}>
          {decks.length > 0 ? (
            <DecksList
              decks={decks}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Entypo name="archive" size={120} color="#999" />
              <Text style={styles.nothingText}>NOTHING!!</Text>
              <Text style={styles.emptyText}>you have no deck yet</Text>
            </View>
          )}
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate('CreateDeck')}
          underlayColor="#3dce6c"
        >
          <View>
            <Text style={styles.buttonText}>create a new deck</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default FlashCards