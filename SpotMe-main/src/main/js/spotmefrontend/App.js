import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native";
import Listings from "./Listings";
import History from "./History";
import Timings from "./Timings";
import SignIn from "./SignIn";
import Profile from "./Profile";
import Password from "./Password";
import UploadImage from "./UploadImage";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import SPTSidebarComponent from "./SPTSidebarComponent/SPTSidebarComponent";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Book from "./Book";
import Navigator from "./Navigator";

// import SPTPostParkingSpotComponent from './SPTShareParkingSpotComponent/SPTPostParkingSpotComponent';
// import Applet from './Components/Applet'

global.localhost =
  "https://310c-2401-4900-1ca9-75f7-294a-a40a-1f83-fe1d.ngrok-free.app";

global.emailparking = " ";
global.dateslot = " ";
global.parkingname = " ";
global.stime = " ";
global.etime = " ";
global.price = " ";
// global.im = " ";

export default class App extends React.Component {
  render() {
    return (
      // <SafeAreaView style={styles.container}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StripeProvider publishableKey="pk_test_51OcRTySGojgWCtVAnMSapc6COsStYwE4t9D0Qgcg3GJDUY3wH0dMvzN7iKCAutAZ4RygWGm5spfb94ySxISxkN2t00pQVSVdbP">
            <AppContainer />
          </StripeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
      // </SafeAreaView>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: SignIn,
    },
    About: {
      screen: SPTSidebarComponent,
      navigationOptions: {
        headerShown: false,
      },
    },
    Password: {
      screen: Password,
    },
    Register: {
      screen: SignUp,
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
