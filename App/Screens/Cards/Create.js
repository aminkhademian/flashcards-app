import React from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { addCard } from "App/Store/decks/actions";
import ButtonBlue from "App/Components/Button/Blue";
import PickImage from "App/Services/Utilities/PickImage";
import FlipCard from "react-native-flip-card";
import includes from "lodash/includes";
import PropTypes from "prop-types";
import UUID from "uuid/v4";

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  card: {
    width: width - 60,
    height: height - 190,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowColor: "#333",
    shadowOffset: { height: 3, width: 0 },
    elevation: 3,
    margin: 10
  },
  contentCard: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 45
  },
  label: {
    fontSize: 18,
    fontFamily: "System",
    color: "#333"
  },
  description: {
    fontSize: 14,
    fontFamily: "System",
    color: "#999"
  },
  flip: {
    height,
    paddingTop: 80,
    borderWidth: 0,
    alignItems: "center"
  },
  headerCard: {
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between"
  },
  flipButton: {
    bottom: 0,
    padding: 16,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center"
  },
  flipText: {
    marginHorizontal: 5,
    color: "#57aefa"
  },
  pickImage: {
    padding: 18
  },
  textInput: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 15
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    marginHorizontal: 16,
    marginTop: 18,
    width: width - 32,
    marginBottom: 8
  }
});

class CreateDeck extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    addCardAction: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired
  };

  state = {
    flip: false,
    front: {
      text: null,
      image: null
    },
    back: {
      text: null,
      image: null
    }
  };

  handleChangeTextInput = (name, text) => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        text
      }
    }));
  };

  handlePickImage = name => {
    PickImage(image => {
      this.ImageSize(name, image);
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

  ImageSize = (name, image) => {
    Image.getSize(image, (w, h) => {
      const ratio = ((width / 3) * 2) / w;
      this.setState(prevState => ({
        [name]: {
          ...prevState[name],
          image: {
            uri: image,
            width: (width / 3) * 2,
            height: h * ratio
          }
        }
      }));
    });
  };

  render() {
    const { front, back, flip } = this.state;
    const disabledCreateCardButton = includes(
      [!!front.text || !!front.image, !!back.text || !!back.image],
      false
    );
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlipCard
              clickable={false}
              style={styles.flip}
              friction={6}
              perspective={1000}
              flipHorizontal
              flipVertical={false}
              flip={flip}
            >
              <View style={styles.card}>
                <View style={styles.headerCard}>
                  <View>
                    <Text style={styles.label}>Front</Text>
                    <Text style={styles.description}>card front view</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.handlePickImage("front")}
                    style={styles.pickImage}
                  >
                    <FontAwesome
                      size={24}
                      color="#c1c1c1"
                      name="camera-retro"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.contentCard}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: "center" }}
                  >
                    <TextInput
                      multiline
                      value={front.text}
                      style={styles.textInput}
                      placeholder="enter some text"
                      underlineColorAndroid="transparent"
                      onChangeText={text =>
                        this.handleChangeTextInput("front", text)
                      }
                    />
                    {front.image && (
                      <Image
                        resizeMode="cover"
                        style={{ borderRadius: 5 }}
                        source={{ ...front.image }}
                      />
                    )}
                  </ScrollView>
                </View>
                <TouchableOpacity
                  style={[
                    styles.flipButton,
                    {
                      right: 0
                    }
                  ]}
                  onPress={() => this.setState({ flip: true })}
                >
                  <Text style={styles.flipText}>back view</Text>
                  <FontAwesome
                    name="reply"
                    size={16}
                    color="#a4d0f6"
                    style={{
                      transform: [{ scale: -1 }]
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.card}>
                <View style={styles.headerCard}>
                  <View>
                    <Text style={styles.label}>Back</Text>
                    <Text style={styles.description}>card back view</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.handlePickImage("back")}
                    style={styles.pickImage}
                  >
                    <FontAwesome
                      size={24}
                      color="#c1c1c1"
                      name="camera-retro"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.contentCard}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: "center" }}
                  >
                    <TextInput
                      multiline
                      value={back.text}
                      style={styles.textInput}
                      placeholder="enter some text"
                      underlineColorAndroid="transparent"
                      onChangeText={text =>
                        this.handleChangeTextInput("back", text)
                      }
                    />
                    {back.image && (
                      <Image
                        resizeMode="cover"
                        style={{ borderRadius: 5 }}
                        source={{ ...back.image }}
                      />
                    )}
                  </ScrollView>
                </View>
                <TouchableOpacity
                  style={[
                    styles.flipButton,
                    {
                      left: 0
                    }
                  ]}
                  onPress={() => this.setState({ flip: false })}
                >
                  <FontAwesome name="reply" size={16} color="#a4d0f6" />
                  <Text style={styles.flipText}>front view</Text>
                </TouchableOpacity>
              </View>
            </FlipCard>
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <ButtonBlue
            text="Create Card"
            icon={
              <FontAwesome name="angle-double-left" size={24} color="#fff" />
            }
            disabled={disabledCreateCardButton}
            onPress={() => this.createCard()}
          />
        </View>
      </View>
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
