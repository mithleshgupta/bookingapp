import "react-native-gesture-handler";

import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SPTMapComponent from "../SPTMapComponent/SPTMapComponent";
import Profile from "../Profile";
import Settings from "../Settings";
import UploadImage from "../UploadImage";
import Post from "../Post";
import Book from "../Book";
import Navigator from "../Navigator";
import Appnavigator from "../Appnavigator";
import History from "../History";
import SPTPostParkingSpotComponent from "../SPTShareParkingSpotComponent/SPTPostParkingSpotComponent";
import Listings from "../Listings";
import SignOut from "../SignOut";
// import ParkingPic from "../ParkingPic";
import Applet from "../Components/Applet";
import Review from "../Review";

import SPTSidebarMenuComponent from "./SPTSidebarMenuComponent";

const Drawer = createDrawerNavigator();

function MapScreen({ navigation }) {
  return <SPTMapComponent drawerNavigation={navigation} />;
}

function SecondScreenStack({ navigation }) {
  return <Profile />;
}

function ThirdScreenStack({ navigation }) {
  return <Settings />;
}

function FourthScreenStack({ navigation }) {
  return <History />;
}
function ScreenStack({ navigation }) {
  return <Navigator />;
}

function FifthScreenStack({ navigation }) {
  return <SPTPostParkingSpotComponent navigation={navigation}/>;
}

function SixthScreenStack({ navigation }) {
  return <Listings navigation={navigation}/>;
}

function SeventhScreenStack({navigation}) {
  return <Applet />;
}

function EightScreenStack({navigation}) {
  return <Review />;
}

function NinthScreenStack({navigation}) {
  return <SignOut />
}



export default function SPTSidebarComponent() {
  return (
      <NavigationContainer>
      <Drawer.Navigator
  initialRouteName="Parking Locations"
  screenOptions={{
    drawerLabelStyle: { color: "black" },
    drawerActiveTintColor: "green",
  }}
  drawerContent={(props) => <SPTSidebarMenuComponent {...props} />}
  >
  <Drawer.Screen
  name="Parking Locations"
  options={{
    drawerLabel: "Map",
        headerShown: false,
        swipeEdgeWidth: 0,
  }}
  component={MapScreen}
  />
  <Drawer.Screen
  name="Profile"
  options={{ drawerLabel: "Update Profile" }}
  component={SecondScreenStack}
  />
  <Drawer.Screen
  name="Settings"
  options={{ drawerLabel: "Settings" }}
  component={ThirdScreenStack}
  />
  <Drawer.Screen
  name="History"
  options={{ drawerLabel: "History" }}
  component={FourthScreenStack}
  />
  <Drawer.Screen
  name="Post Your Parking"
  options={{ drawerLabel: "Post Parking Spot" }}
  component={FifthScreenStack}
  />
  <Drawer.Screen
  name="Your Parking Listings"
  options={{ drawerLabel: "Your Listings" }}
  component={SixthScreenStack}
  />
  <Drawer.Screen
  name = "Sign Out / Log Out"
  options={{ drawerLabel: "Sign Out"}}
  component ={NinthScreenStack}
  />
  <Drawer.Screen
  name="Navigator"
  options={{ drawerLabel: "" }}
  component={ScreenStack}
  />
  </Drawer.Navigator>
  </NavigationContainer>
);
}


/*
 Removed The chat room window after the Sixth Screen Stack

 <Drawer.Screen
  name = "Chat"
  options={{ drawerLabel: "Chat Room"}}
  component ={SeventhScreenStack}
  />

 */

/*
Removed the Give a review section
<Drawer.Screen
  name = "App Review"
  options={{ drawerLabel: "Give a review"}}
  component ={EightScreenStack}
  />
 */

