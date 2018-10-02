import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  ScrollView,
  TouchableOpacity
} from "react-native";
import SwipeCards from "react-native-deck-swiper";
import FlipCard from "react-native-flip-card";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { rejectCard } from "App/Store/decks/actions";
import Button from "App/Screens/Cards/Play/button";
import review from "App/Screens/Cards/Play/reviewFunc";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: 300,
    height: 450,
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowColor: "#333",
    shadowOffset: { height: 3, width: 0 },
    elevation: 3,
    margin: 10,
    padding: 15
  },
  label: {
    fontSize: 25,
    fontFamily: "System",
    color: "#333",
    backgroundColor: "transparent"
  },
  footer: {
    flex: 1,
    bottom: 0,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center"
  },
  buttonContainer: {
    width: 220,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  flip: {
    width: 320,
    height: 470,
    borderWidth: 0
  },
  noMoreCards: {
    alignItems: "center",
    justifyContent: "center"
  },
  congratulationsText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "gray"
  },
  finishedDeckText: {
    marginVertical: 5,
    fontSize: 14,
    color: "gray"
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: height / 2 - 40,
    backgroundColor: "#cfd8dc"
  },
  backButtonText: {
    fontSize: 14,
    color: "#36a7ef"
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  }
});

class PlayCards extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    rejectCardAction: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired
  };

  state = {
    swipedAll: false,
    opacityToHide: new Animated.Value(1),
    opacityToShow: new Animated.Value(0),
    translateY: new Animated.Value(0),
    noMoreScale: new Animated.Value(1.1)
  };

  handleSwiping = x => {
    if (x > 0) {
      this.acceptButton.handleButtonSwiping(x);
    } else if (x < 0) {
      this.rejectButton.handleButtonSwiping(Math.abs(x));
    } else {
      this.acceptButton.handleButtonSwipingEnd();
      this.rejectButton.handleButtonSwipingEnd();
    }
  };

  handleSwipedAll = () => {
    const {
      opacityToHide,
      opacityToShow,
      translateY,
      noMoreScale
    } = this.state;
    this.setState({ swipedAll: true });
    Animated.parallel([
      Animated.timing(opacityToHide, {
        toValue: 0,
        duration: 200
      }),
      Animated.timing(opacityToShow, {
        toValue: 1,
        duration: 200
      }),
      Animated.timing(noMoreScale, {
        toValue: 1,
        duration: 200
      }),
      Animated.timing(translateY, {
        toValue: -50,
        duration: 200
      })
    ]).start();
  };

  handleCardReview = (status, index) => {
    const { rejectCardAction, cards } = this.props;
    switch (status) {
      case "reject":
        review.reject(cards[index], newCard => {
          rejectCardAction({ newCard, index });
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { cards, navigation } = this.props;
    const {
      opacityToHide,
      opacityToShow,
      translateY,
      noMoreScale,
      swipedAll
    } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Animated.View
          style={[
            styles.bg,
            {
              opacity: opacityToHide,
              transform: [{ translateY }]
            }
          ]}
        />
        <SwipeCards
          cards={cards}
          keyExtractor={card => card.id}
          backgroundColor="transparent"
          stackSize={3}
          showSecondCard
          verticalSwipe={false}
          marginTop={25}
          marginBottom={0}
          stackSeparation={-18}
          ref={el => {
            this.SwipeCards = el;
          }}
          cardStyle={{
            alignItems: "center",
            justifyContent: "center"
          }}
          onSwipedAborted={() => this.handleSwiping(0)}
          onSwiped={() => this.handleSwiping(0)}
          onSwipedLeft={index => this.handleCardReview("reject", index)}
          onSwiping={x => this.handleSwiping(x)}
          onSwipedAll={() => this.handleSwipedAll()}
          renderCard={card => (
            <FlipCard
              style={styles.flip}
              friction={6}
              perspective={1000}
              flipHorizontal
              flipVertical={false}
              flip={false}
            >
              <ScrollView contentContainerStyle={styles.card}>
                <Text style={styles.label}>{card.front.text}</Text>
              </ScrollView>
              <ScrollView contentContainerStyle={styles.card}>
                <Text style={styles.label}>{card.back.text}</Text>
              </ScrollView>
            </FlipCard>
          )}
        />
        {swipedAll && (
          <Animated.View
            style={[
              styles.noMoreCards,
              {
                opacity: opacityToShow,
                transform: [{ scale: noMoreScale }]
              }
            ]}
          >
            <MaterialCommunity name="cards-outline" size={90} color="#999" />
            <Text style={styles.congratulationsText}> Congratulations! </Text>
            <Text style={styles.finishedDeckText}>
              You have finished this deck for now.
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backButton}>
                <MaterialCommunity
                  name="chevron-left"
                  size={24}
                  color="#36a7ef"
                />
                <Text style={styles.backButtonText}>back to deck</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        <View style={styles.footer}>
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: opacityToHide,
                transform: [{ translateY }]
              }
            ]}
          >
            <Button
              ref={el => {
                this.rejectButton = el;
              }}
              color="#FE474C"
              onPress={() => {
                this.SwipeCards.swipeLeft();
                this.rejectButton.handleButtonAnimation();
              }}
            >
              <Ionicons name="ios-close" color="#FE474C" size={48} />
            </Button>
            <Button
              ref={el => {
                this.acceptButton = el;
              }}
              color="#3ED66F"
              onPress={() => {
                this.SwipeCards.swipeRight();
                this.acceptButton.handleButtonAnimation();
              }}
            >
              <Ionicons name="ios-checkmark" color="#3ED66F" size={48} />
            </Button>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      rejectCardAction: rejectCard
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(PlayCards);
