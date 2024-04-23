import React, { useState, useEffect, Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { StackActions } from '@react-navigation/native';
// import {
//   BrowserRouter as Router,
//   Route
// } from "react-router-dom";
import ComponentWithFocus from "./ComponentWithFocus";

export class Listings extends React.Component {
  state = {
    data: [],
    modalVisible: false,
    price: " ",
    car_type: " ",
    description: " ",
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
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

  edit(parking_name) {
    fetch(
      "http://192.168.1.33:8080" +
        "/users/updateLocation/" +
        emailparking +
        "/" +
        this.state.price +
        "/" +
        this.state.car_type +
        "/" +
        parking_name +
        "/" +
        this.state.description,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
          // Successful POST
          console.log("good");
        } else {
          // Examine the text in the response
          console.log("issue");
        }
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    // const {navigate} = this.props.navigation;
    // const [modalVisible, setModalVisible] = useState(false);
    const { modalVisible } = this.state;

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
                <Text style={styles.inputText}>
                  Location:{item.parking_name}
                </Text>
                <Text style={styles.inputLabel}>Price</Text>
                <TextInput
                  style={styles.inpuText}
                  onChangeText={(text) => this.setState({ price: text })}
                  // value={this.state.email}
                  placeholder={item.price}
                />
                <Text style={styles.inputLabel}>Car Type</Text>
                <TextInput
                  style={styles.inpuText}
                  onChangeText={(text) => this.setState({ car_type: text })}
                  // value={this.state.email}
                  placeholder={item.car_type}
                />
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={styles.inpuText}
                  onChangeText={(text) => this.setState({ description: text })}
                  // value={this.state.email}
                  placeholder={item.description}
                />
                <TouchableOpacity
                  style={styles.signBtn}
                  onPress={() => {
                    this.edit(item.parking_name);
                    this.setModalVisible(true);
                  }}
                >
                  <Text style={styles.signText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Successful!</Text>
                <Text></Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ComponentWithFocus>
    );
  }
}
export default Listings;

// export default MyTabs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  inpuText: {
    textAlign: "left",
    fontSize: 15,
    height: 40,
    width: 230,
    margin: 12,
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#ababab",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
    width: "60%",
    backgroundColor: "green",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginLeft: 90,
    borderWidth: 1,
  },
  signText: {
    color: "white",
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
  inputLabel: {
    fontSize: 20,
    alignItems: "center",
    marginTop: 10,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
