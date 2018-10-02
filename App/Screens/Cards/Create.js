import React from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCard } from "App/Store/decks/actions";
import UUID from "uuid/v4";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    justifyContent: "space-around",
    flex: 1,
    elevation: 3,
    margin: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowColor: "#333",
    shadowOffset: { height: 3, width: 0 }
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20
  },
  textInput: {
    flex: 1,
    textAlign: "center"
  },
  line: {
    height: 1,
    backgroundColor: "#eee"
  }
});

class CreateDeck extends React.Component {
  state = {
    front: {
      text: null,
      images: []
    },
    back: {
      text: null,
      images: []
    }
  };

  handleChangeTextInput = (name, text) => {
    this.setState({
      [name]: {
        images: [],
        text
      }
    });
  };

  createCard = () => {
    const { id, addCardAction, navigation } = this.props;
    const { front, back } = this.state;
    const cardToBeSaved = {
      back,
      front,
      step: 0,
      id: UUID(),
      isDone: false,
      countRejected: 0,
      nextReviewAt: Date.now()
    };
    addCardAction(id, cardToBeSaved);
    navigation.goBack();
  };

  render() {
    const { front, back } = this.state;
    const disabledCreateCardButton = !front.text || !back.text;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              value={front.text}
              style={styles.textInput}
              placeholder="Front"
              underlineColorAndroid="transparent"
              onChangeText={text => this.handleChangeTextInput("front", text)}
            />
            <View style={styles.line} />
            <TextInput
              value={back.text}
              style={styles.textInput}
              placeholder="Back"
              underlineColorAndroid="transparent"
              onChangeText={text => this.handleChangeTextInput("back", text)}
            />
          </View>
          <TouchableOpacity
            disabled={disabledCreateCardButton}
            {...(disabledCreateCardButton
              ? {
                  style: {
                    opacity: 0.2
                  }
                }
              : {})}
            onPress={() => this.createCard()}
          >
            <View style={styles.createButton}>
              <MaterialCommunity
                name="chevron-double-left"
                size={35}
                color="#333"
              />
              <Text>Create Card</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addCardAction: addCard
    },
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(CreateDeck);
