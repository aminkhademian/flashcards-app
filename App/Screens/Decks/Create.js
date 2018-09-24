import React from 'react'
import { AsyncStorage, View, Text, ScrollView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunity from '@expo/vector-icons/MaterialCommunityIcons'
import PickImage from 'App/Services/Utilities/PickImage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addDeck } from 'App/Store/decks/actions'
import UUID from "uuid/v4"

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    position: "relative",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: width,
    height: width * 4/5,
  },
  image:{
    position: "absolute",
    top: 0,
    left:0,
    width: width,
    height: width * 4 / 5,
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
  },
  inputContainer: {
    flex: 1,
    width: "90%",
    marginTop: 30,
  },
  textInput: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "#fff"
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20
  }
})

class CreateDeck extends React.Component {
  state = {
    image: null,
    title: null,
    description: null
  }
  handleChangeTextInput = (name, text) => {
    this.setState({[name]: text})
  }
  createDeck = async () => {
    const { image, title, description } = this.state
    const deckToBeSaved = { cards: [], image, title, description, id: UUID()}
    this.props.addDeck(deckToBeSaved)
    this.props.navigation.goBack()
  }
  render() {
    const { image, title, description } = this.state
    const disabledCreateDeckButton = (!image || !title || !description)
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <FontAwesome name="image" size={85} color="#ececec" />
            {image && <Image style={styles.image} source={{ uri: image }} />}
          </View>
          <TouchableHighlight
            onPress={() => PickImage(image => {
              this.setState({ image })
            })}
            underlayColor="#3dce6c"
            style={styles.imageButton}
          >
            <View>
              <Text style={styles.imageButtonText}>CHOOSE IMAGE</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.inputContainer}>
            <TextInput
              value={title}
              placeholder="Title"
              underlineColorAndroid="transparent"
              style={styles.textInput}
              onChangeText={text => this.handleChangeTextInput("title", text)}
            />
            <TextInput
              value={description}
              placeholder="Description"
              underlineColorAndroid="transparent"
              style={styles.textInput}
              onChangeText={text => this.handleChangeTextInput("description", text)}
            />
          </View>
          <TouchableOpacity
            disabled={disabledCreateDeckButton}
            {...(disabledCreateDeckButton ? {style: {
              opacity: 0.2
            }} : {})}
            onPress={() => this.createDeck()}
          >
            <View style={styles.createButton}>
              <MaterialCommunity name="chevron-double-left" size={35} color="#333" />
              <Text>Create Deck</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDeck
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(CreateDeck)