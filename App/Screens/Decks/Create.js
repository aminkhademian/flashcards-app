import React from "react";
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput
} from "react-native";
import ButtonGreen from "App/Components/Button/Green";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PickImage from "App/Services/Utilities/PickImage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addDeck } from "App/Store/decks/actions";
import UUID from "uuid/v4";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5
  },
  imageContainer: {
    position: "relative",
    backgroundColor: "#cfd8dc",
    alignItems: "center",
    justifyContent: "center",
    width,
    height: height / 2
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: height / 2
  },
  chooseImageText: {
    color: "#b2bcc1",
    marginTop: 5,
    marginBottom: 25
  },
  inputContainer: {
    width: "90%",
    height: height / 3,
    marginTop: -(height / 3) / 2,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowColor: "#333",
    shadowOffset: { height: 3, width: 0 },
    elevation: 2,
    marginHorizontal: 5,
    marginBottom: 5,
    zIndex: 5
  },
  inputContainerBg: {
    opacity: 0.7,
    width: "84%",
    height: 20,
    borderRadius: 5,
    marginTop: -12,
    backgroundColor: "#fff",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowColor: "#333",
    shadowOffset: { height: 3, width: 0 },
    elevation: 2,
    zIndex: 4
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    marginHorizontal: 8,
    marginTop: 18,
    width: width - 16,
    marginBottom: 8
  },
  textInput: {
    flex: 1,
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 15,
    borderRadius: 50,
    backgroundColor: "#fff"
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20
  }
});

class CreateDeck extends React.Component {
  state = {
    image: null,
    title: null,
    description: null
  };

  handleChangeTextInput = (name, text) => {
    this.setState({ [name]: text });
  };

  createDeck = async () => {
    const { image, title, description } = this.state;
    const { addDeckAction, navigation } = this.props;
    const deckToBeSaved = { cards: [], image, title, description, id: UUID() };
    addDeckAction(deckToBeSaved);
    navigation.goBack();
  };

  render() {
    const { image, title, description } = this.state;
    const disabledCreateDeckButton = !image || !title || !description;
    return (
      <View style={{ height }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView enabled behavior="position">
              <View style={styles.container}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    PickImage(img => {
                      this.setState({ image: img });
                    })
                  }
                >
                  <View style={styles.imageContainer}>
                    <FontAwesome name="image" size={50} color="#bfc9ce" />
                    <Text style={styles.chooseImageText}>choose image</Text>
                    {image && (
                      <Image style={styles.image} source={{ uri: image }} />
                    )}
                  </View>
                </TouchableOpacity>
                <View style={{ width, alignItems: "center" }}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      value={title}
                      placeholder="Title"
                      underlineColorAndroid="transparent"
                      style={styles.textInput}
                      onChangeText={text =>
                        this.handleChangeTextInput("title", text)
                      }
                    />
                    <TextInput
                      value={description}
                      placeholder="Description"
                      underlineColorAndroid="transparent"
                      style={styles.textInput}
                      onChangeText={text =>
                        this.handleChangeTextInput("description", text)
                      }
                    />
                  </View>
                  <View style={styles.inputContainerBg} />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <ButtonGreen
            text="Create Deck"
            icon={
              <FontAwesome name="angle-double-left" size={24} color="#fff" />
            }
            disabled={disabledCreateDeckButton}
            onPress={() => this.createDeck()}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDeckAction: addDeck
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(CreateDeck);
