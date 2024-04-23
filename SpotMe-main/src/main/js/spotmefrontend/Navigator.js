import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import Book from './Book';
import Timings from './Timings';
import ParkingRating from './ParkingRating';
import CheckoutScreen from './CheckoutScreen';
import SPTMapListCelComponent from './SPTMapComponent/SPTMapListCellComponent';
const RootStack = createStackNavigator(
  {
    Bookings: {
      screen: Book,
      navigationOptions: {
        headerShown: false,
      }
    },
    Timing: {
      screen: Timings
    },
    Rate: {
      screen: ParkingRating
    },
    // Locations: {
    //   screen: SPTMapListCelComponent
    // },
    CheckoutScreen: {
      screen: CheckoutScreen
    },
  },

  {
    initialRouteName: "Bookings"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Navigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}