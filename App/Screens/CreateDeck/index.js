import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: height
  },
  image: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: width,
    height: width * 4/5,
  },
  imageButton: {
    marginTop: -20,
    borderRadius: 50,
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3ed66f',   
    elevation: 4,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: '#3ed66f',
    shadowOffset: { height: 3, width: 0 },
  },
  imageButtonText: {
    color: '#fff'
  }
})

class CreateDeck extends React.Component {
  state = {
    image: null,
    title: '',
    description: ''
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <FontAwesome name="image" size={85} color="#ececec" />
        </View>
        <TouchableHighlight
          onPress={() => console.log("are...")}
          underlayColor="#3dce6c"
          style={styles.imageButton}
        >
          <View>
            <Text style={styles.imageButtonText}>CHOOSE IMAGE</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default CreateDeck