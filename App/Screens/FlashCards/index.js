import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8
  },
  decks: {
    flex: 1
  },
  button: {
    backgroundColor: '#3ed66f',
      alignItems: 'center',
      padding: 15,
      borderRadius: 3
  },
  buttonText: {
    color: "#fff"
  }
})

class FlashCards extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.decks}>
          <FlatList
            data={[{ key: 'a' }, { key: 'b' }]}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />
        </View>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('CreateDeck')}
          underlayColor="#fff"
        >
          <View style={styles.button}>
              <Text style={styles.buttonText}>create a new deck</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default FlashCards