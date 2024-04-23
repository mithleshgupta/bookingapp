import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";

class SPTMapPinComponent extends Component {
  state = {};
  render() {
    return (
      <Marker
        key={0}
        coordinate={{
          latitude: this.props.position.lat,
          longitude: this.props.position.lng,
        }}
        onPress={() => {this.props.pinPressed(this.props.spotInfo)}}
        
        // description={"Hello chicken"}
      >
        <TouchableOpacity style={styles.pinContainer} onPress={() => {this.props.pinPressed(this.props.spotInfo)}}>
          <View style={styles.pinShape}>
            <View style={styles.pinContentArea}>
              <Image
                source={require("../assets/SpotMeCarLogo.png")}
                style={styles.spotMeCarLogo}
              />
              {/* <Text style={styles.pinText}>$25</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </Marker>
    );
  }
}

const styles = StyleSheet.create({
  pinContainer: {
    width: 50,
    height: 60,
  },
  pinShape: {
    width: 40,
    height: 40,
    backgroundColor: "green",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 5,

    transform: [{ rotateZ: "45deg" }],

    marginTop: "auto",
    marginBottom: "auto",
    alignSelf: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,

    borderColor: "green",
    borderWidth: 2,
  },
  pinContentArea: {
    marginTop: "auto",
    marginBottom: "auto",

    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: 'rgba(197, 241, 250, 1)',

    width: 36,
    height: 36,
    borderRadius: 45,
    transform: [{ rotateZ: "-45deg" }],
  },
  pinText: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
  spotMeCarLogo: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop:'auto',
    marginBottom:'auto',
    width: 25,
    height: 25,
    // backgroundColor: 'green',
    // marginTop: 5,
    borderRadius: 45,
  },
});

export default SPTMapPinComponent;
