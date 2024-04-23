import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import OcticonIcon from "react-native-vector-icons/Octicons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import Book from "../Book";

class SPTMapListCelComponent extends Component {
  state = {};

  getAvailableTimes() {
    const times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",];

    const date = new Date();

    // const hours = date.getHours;
    // const minutes = date.getMinutes;

    const currentTime = toLocaleTimeString();

    var i = 0;
    var q = 0;
    while (i < times.length && q < chicken.length) {
      if (times[i] == chicken[q]) {

      } else if (times[i] < chicken[q]) {

      } else {

      }
    }
  }

  getCarTypes() {
    const carTypes = this.props.spotInfo.car_type.split(",");
    carTypes.sort();

    var ans = "";

    if (carTypes.length == 0) {
      // do nothing
    } else if (carTypes.length == 1) {
      ans = "Fits " + carTypes[0];
    } else if (carTypes.length == 2) {
      ans = "Fits " + carTypes[0] + " and " + carTypes[1];
    } else {
      ans = "Fits";
      for (let i = 0; i < carTypes.length - 1; i++) {
        ans += " " + carTypes[i] + ","
      }

      ans += " and " + carTypes[carTypes.length - 1];
    }

    return ans;
  }

  // loginclick = () => {
  //   this.props.navigation.navigate('Bookings');
  // }

  render = () => {
    // const {navigate} = this.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('Navigating to Navigator:', {
            info: this.props.spotInfo,
            parkingName: this.props.spotInfo.parking_name,
            price: this.props.spotInfo.price,
            latitude: this.props.spotInfo.latitude,
            longitude: this.props.spotInfo.longitude,
            email: this.props.spotInfo.email

          });

          this.props.navigator.navigate('Navigator', {
            parkingName: this.props.spotInfo.parking_name,
            price: this.props.spotInfo.price,
            latitude: this.props.spotInfo.latitude,
            longitude: this.props.spotInfo.longitude,
            email: this.props.spotInfo.email
          });
        }}
      >
        <Image
          style={styles.image}
          source={this.props.pic}
        />
        <View style={{ marginLeft: 5 }}>
          {/* {this.state.variable = this.props.spotInfo.parking_name} */}
          <Text style={styles.address}>{this.props.spotInfo.street}</Text>
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
            <Text style={styles.inlineText}>{this.props.spotInfo.price + "/hr"}</Text>
            <Text style={styles.inlineText}>&#8226;</Text>
            <Text style={styles.inlineText}>
              {this.props.distanceApart + " miles away"}
            </Text>
            <Text style={styles.inlineText}>&#8226;</Text>
            {/* <ScrollView horizontal={true} alwaysBounceVertical={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems:'flex-start', flexDirection:'row',}} style={{width: 40}} >
              <View style={{height: 20, backgroundColor: 'rgba(0, 128, 0, 0.5)', marginRight: 5, borderRadius: 5}}>
              <Text style={{marginTop:'auto', marginBottom:'auto', fontWeight:'600'}}>3:00pm</Text>
                </View>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
              <View style={{height: 20, width: 20, backgroundColor: 'green', marginRight: 5}}/>
            </ScrollView> */}
            <Text style={[styles.inlineText, styles.availableNow]}>
              {"Available now"}
            </Text>
          </View>
          <Text style={styles.carInfo}>{this.getCarTypes()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SPTMapListCelComponent;

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