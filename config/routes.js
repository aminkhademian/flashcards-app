import React from 'react'
import { Platform, TouchableWithoutFeedback, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import DecksList from 'App/Screens/Decks/List'
import ShowDeck from 'App/Screens/Decks/Show'
import CreateDeck from 'App/Screens/Decks/Create'
import CreateCard from 'App/Screens/Cards/Create'
import FontAwesome from "@expo/vector-icons/FontAwesome"

const headerStyle = {
  backgroundColor: 'transparent',
  ...(Platform.OS === 'ios' ? { borderBottomWidth: 0 } : {})
}

const mapNavigationStateParamsToProps = SomeComponent =>
  class extends React.Component {
    static navigationOptions = SomeComponent.navigationOptions;

    render() {
      const {
        navigation: {
          state: { params }
        }
      } = this.props;
      return <SomeComponent {...params} {...this.props} />;
    }
  };

export const Root = createStackNavigator({
  Decks: {
    screen: DecksList,
    navigationOptions: {
      title: 'Decks',
      headerStyle,
      headerTransparent: true,
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      title: 'New Deck',
      headerTransparent: true,
      headerStyle
    }
  },
  CreateCard: {
    screen: mapNavigationStateParamsToProps(CreateCard),
    navigationOptions: {
      title: 'New Card',
      headerStyle
    }
  },
  Deck: {
    screen: mapNavigationStateParamsToProps(ShowDeck),
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerTransparent: true,
      headerStyle,
      headerLeftContainerStyle: {
        marginHorizontal: 16
      },
      headerTintColor: 'white',
      headerLeft: (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} color="#fff" />
        </TouchableWithoutFeedback>
      )
    })
  }
})