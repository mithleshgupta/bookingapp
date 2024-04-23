import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

class SPTMapSearchBarComponent extends Component {
  state = {
    showAddressVerification: false,
  };

  address = "";

  render() {
    let textVerification;
    if (this.state.showAddressVerification) {
      textVerification = (
        <Text style={styles.textInputValidation}>
          We could not find that address
        </Text>
      );
    }

    return (
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          selectionColor={"white"}
          placeholder="Search for a location"
          placeholderTextColor={"white"}
          onChangeText={(text) => (this.address = text)}
          onSubmitEditing={(done) => this.moveToLocation()}
          autoCapitalize="words"
        />
        {textVerification}
      </View>
    );
  }

  moveToLocation() {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        this.address +
        "&key=AIzaSyDgRXr1bTTXx6JwEZHAyZ29Razfs7uyezo"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "OK") {
          let location = responseJson?.results?.[0]?.geometry.location;
          console.log(location);
          this.props.updateMapLocationHandler(location);
        } else {
          this.setState({
            showAddressVerification: true,
          });

          setTimeout(
            function () {
              this.setState({
                showAddressVerification: false,
              });
            }.bind(this),
            3000
          );

          console.log("not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    // flex: 1,
    width: "90%",
  },
  textInput: {
    height: 40,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",

    fontSize: 20,
    width: "100%",
    paddingStart: 20,
  },
  textInputValidation: {
    // paddingLeft: 20,
    color: "red",
  },
});

export default SPTMapSearchBarComponent;
