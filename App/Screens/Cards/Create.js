import React from 'react'
import { AsyncStorage, View, Text, ScrollView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunity from '@expo/vector-icons/MaterialCommunityIcons'
import PickImage from 'App/Services/Utilities/PickImage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addDeckToState } from 'App/Store/decks/actions'
import UUID from "uuid/v4"

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20
  }
})

class CreateDeck extends React.Component {
  state = {
    front: null,
    back: null,
  }
  handleChangeTextInput = (name, text) => {
    this.setState({ [name]: text })
  }
  render() {
    const { image, title, description } = this.state
    const disabledCreateDeckButton = (!image || !title || !description)
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.container}>
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
            {...(disabledCreateDeckButton ? {
              style: {
                opacity: 0.2
              }
            } : {})}
            onPress={() => this.createDeck()}
          >
            <View style={styles.createButton}>
              <MaterialCommunity name="chevron-double-left" size={35} color="#333" />
              <Text>Create Card</Text>
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
      addDeckToState
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(CreateDeck)