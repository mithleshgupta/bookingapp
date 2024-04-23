import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import OcticonIcon from "react-native-vector-icons/Octicons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

class SPTMapParkingSpotDetailsComponent extends Component {
  state = {};

  //   getCarTypes() {
  //     const carTypes = this.props.spotInfo.car_type.split(",");
  //     carTypes.sort();

  //     var ans = "";

  //     if (carTypes.length == 0) {
  //       // do nothing
  //     } else if (carTypes.length == 1) {
  //       ans = "Fits " + carTypes[0];
  //     } else if (carTypes.length == 2) {
  //       ans = "Fits " + carTypes[0] + " and " + carTypes[1];
  //     } else {
  //       ans = "Fits";
  //       for (let i = 0; i < carTypes.length - 1; i++) {
  //         ans += " " + carTypes[i] + ","
  //       }

  //       ans += " and " + carTypes[carTypes.length - 1];
  //     }

  //     return ans;
  //   }

  loginclick = () => {
    this.props.navigation.navigate("Bookings");
  };

  render() {
    return (
      <ScrollView
        style={{ flex: 1, flexDirection: "row", marginLeft: 2 }}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            left: 0,
            right: 0,
          }}
        >
          <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: 5 }} onPress={() => {this.props.closeSpotInfoBottomSheet()}}>
            <OcticonIcon name="x" color="black" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", }}>
          {/* <Image style={[styles.image]} source={this.props.pic} /> */}
          <View style={{ marginLeft: 'auto', marginRight:'auto'}}>
            <Text style={styles.address}>{this.props.spotInfo.street}</Text>
            {/* <Text style={styles.address}>{"254 charles court"}</Text> */}
            <View style={styles.inlineConfig}>
              <OcticonIcon
                name="star-fill"
                color="gold"
                style={styles.icon}
                size={14}
              />
              <Text style={styles.inlineText}>&#8226;</Text>
              {/* <Text style={styles.inlineText}>{this.props.spotInfo.rating}</Text> */}
              <Text style={styles.inlineText}>{"No ratings"}</Text>

              <Text style={styles.inlineText}>&#8226;</Text>
              {/* <Text style={styles.inlineText}>{"Orange" + ", " + "06477"}</Text> */}
              <Text style={styles.inlineText}>
              {this.props.spotInfo.city + ", " + this.props.spotInfo.zipcode}
            </Text>
            </View>
            <View style={styles.inlineConfig}>
              <FontAwesome5Icon
                name="dollar-sign"
                color="green"
                style={styles.icon}
                size={14}
              />
              <Text style={styles.inlineText}>&#8226;</Text>
              <Text style={styles.inlineText}>
              {this.props.spotInfo.price + "/hr"}
            </Text>
              {/* <Text style={styles.inlineText}>{"10" + "/hr"}</Text> */}
              <Text style={styles.inlineText}>&#8226;</Text>
              <Text style={styles.inlineText}>
                {this.props.distanceApart + " miles away"}
              </Text>
              <Text style={styles.inlineText}>&#8226;</Text>
              <Text style={[styles.inlineText, styles.availableNow]}>
                {"Available now"}
              </Text>
            </View>
            {/* <Text style={styles.carInfo}>{this.getCarTypes()}</Text> */}
          </View>
        </View>
        <Text style={{ marginTop: 20, paddingHorizontal: 10, fontWeight:'700' }}>Description</Text>
        <Text style={{ paddingHorizontal: 10, }}>
          {
            this.props.spotInfo.description
          }
        </Text>
      </ScrollView>
    );
  }
}

export default SPTMapParkingSpotDetailsComponent;

const styles = StyleSheet.create({
  address: {
    fontWeight: "bold",
    fontSize: 20,
  },
  carInfo: {
    fontStyle: "italic",
    fontSize: 12,
    margin: 2,
  },
  inlineConfig: {
    flexDirection: "row",
  },
  inlineText: {
    fontSize: 14,
    margin: 1,
  },
  availableNow: {
    fontWeight: "600",
    color: "green",
  },
  image: {
    width: 80,
    height: 80,
  },
  icon: {
    textAlign: "center",
    margin: 1,
    width: 14,
    height: 14,
  },
});
