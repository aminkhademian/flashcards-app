import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import DecksList from 'App/Components/Decks/List';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addDeckToState } from 'App/Store/decks/actions'

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
    marginHorizontal: 4
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
  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.decks}>
          {decks.length > 0 ? (
            <DecksList
              decks={decks}
              onShowDeck={item => this.props.navigation.navigate("Deck", item)}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Entypo name="archive" size={120} color="#999" />
              <Text style={styles.nothingText}>NOTHING!!</Text>
              <Text style={styles.emptyText}>you have no card yet</Text>
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
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDeckToState
    },
    dispatch
  );

const mapStateToProps = state => ({
  decks: state.decks.list
})

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards)  