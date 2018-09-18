import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import FlashCards from 'App/Screens/FlashCards'
import CreateDeck from 'App/Screens/CreateDeck'

const headerStyle = {
  backgroundColor: 'transparent',
  ...(Platform.OS === 'ios' ? { borderBottomWidth: 0 } : {})
}

export const Root = createStackNavigator({
  FlashCards: {
    screen: FlashCards,
    navigationOptions: {
      title: 'Flashcards',
      headerStyle
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      title: 'New Deck',
      headerStyle
    }
  }
})