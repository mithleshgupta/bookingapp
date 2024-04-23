import React, { useState, useEffect, Component } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { StackActions } from '@react-navigation/native';
// import {
//   BrowserRouter as Router,
//   Route
// } from "react-router-dom";
import ComponentWithFocus from "./ComponentWithFocus";

export class ParkingPic extends React.Component {
  state = {
    data: [],
  };

  onFocus = () => {
    fetch(
      "http://192.168.1.33:8080" + "/users/getLocationByEmail/" + emailparking,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      });
  };

  render() {
    //   const {navigate} = this.props.navigation;

    return (
      <ComponentWithFocus onFocus={this.onFocus}>
        <View>
          <Text style={styles.baseText} paddingVertical>
            {" "}
            My Parking Slots{" "}
          </Text>
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{ uri: "data:image/png;base64," + item.pictures }}
                  style={{ width: 200, height: 200 }}
                />
                <TouchableOpacity>
                  <Text>Location:{item.parking_name + " " + item.street}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ComponentWithFocus>
    );
  }
}
export default ParkingPic;

// export default MyTabs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  baseText: {
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 50,
    paddingLeft: 10,
    paddingBottom: 1,
  },
  inputText: {
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  TextInput: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 10,

    marginLeft: 20,
  },
  signBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginLeft: 90,
    borderWidth: 1,
  },
  signText: {
    color: "black",
    fontSize: 20,
    borderRadius: 25,
  },
  backBtn: {
    alignItems: "flex-start",
    width: "30%",
    marginTop: 50,
    marginLeft: 10,
  },
  logText: {
    fontSize: 14,
    paddingTop: 2,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  loginBtn: {
    width: "15%",
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "gold",
  },
  backText: {
    fontSize: 15,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
