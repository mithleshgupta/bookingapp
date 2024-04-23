import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { LocationAccuracy } from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import SPTMapListCelComponent from "./SPTMapListCellComponent";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import SPTMapSearchBarComponent from "./SPTMapSearchBarComponent";
import SPTMapPinComponent from "./SPTMapPinComponent";
import SPTMapParkingSpotDetailsComponent from "./SPTMapParkingSpotDetailsComponent";

class SPTMapComponent extends Component {
  state = {
    position: {
      lat: 0.0, 
      lng: 0.0,
    },
    listings: [],
    radius: 0.1,
    showRadiusVerification: false,
    radiusVerificationTimeout: null,
    currentSpotInfo: {},
    drawingMode: false,
    drawnCoordinates: [],
    length: 0,
  };

  pinPressed(spotInfo) {
    console.log("Hello");
    this.setState({ currentSpotInfo: spotInfo });
    console.log(spotInfo, "thi is current spot info")
    this.showSpotInfoBottomSheet()
  }

  handleMapPress = (event) => {
    const { drawingMode, drawnCoordinates } = this.state;
    if (drawingMode) {
      const { coordinate } = event.nativeEvent;
      this.setState({
        drawnCoordinates: [...drawnCoordinates, coordinate],
      });
    }
  };

  userLocation = { lat: 0.0, lng: 0.0 };

  snapPoints = ["1%", "10%", "40%", "89%"];
  sheetRef = React.createRef();
  spotInfoSheetRef = React.createRef();
  mapRef = React.createRef();

  showSpotInfoBottomSheet() {
    this.sheetRef.current.snapToIndex(0);
    this.spotInfoSheetRef.current.snapToIndex(2);
  }

  closeSpotInfoBottomSheet() {
    this.spotInfoSheetRef.current.snapToIndex(0);
    this.sheetRef.current.snapToIndex(2);
  }

  constructor(props) {
    super(props);
    this.updateMapLocationHandler = this.updateMapLocationHandler.bind(this);
    this.goBackToUserLocation = this.goBackToUserLocation.bind(this);
  }

  componentDidMount() {
    (async () => {
      let enabled = await Location.hasServicesEnabledAsync();
      let foreground = Location.getForegroundPermissionsAsync();
      if (enabled && (await foreground).granted) {
        let position = await Location.getCurrentPositionAsync({
          accuracy: LocationAccuracy.Highest,
        });
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.setState({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      } else {
        let result = await Location.requestForegroundPermissionsAsync();
      }
    })();

    (async () => {
      fetch("https://d0bb-103-57-87-7.ngrok-free.app" + "/users/getNearbyListings", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Success 1");
          console.log(json);
          this.setState({ listings: json });
        })
        .catch((error) => {
          console.log("Failure");
          console.log(error);
        });
    })();
  }

  updateMapLocationHandler(location) {
    this.setState({
      position: {
        lat: location.lat,
        lng: location.lng,
      },
    });
    (async () => {
      fetch("https://d0bb-103-57-87-7.ngrok-free.app" + "/users/getNearbyListings", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Success 2");
          console.log(json);
          this.setState({ listings: json });
        })
        .catch((error) => {
          console.log("Failure");
          console.log(error);
        });
    })();
  }

  goBackToUserLocation() {
    this.mapRef.current.animateToRegion({
      latitude: this.userLocation.lat,
      longitude: this.userLocation.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });

    (async () => {
      fetch("https://d0bb-103-57-87-7.ngrok-free.app" + "/users/getNearbyListings", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Success 3");
          console.log(json);
          this.setState({ listings: json });
        })
        .catch((error) => {
          console.log("Failure");
          console.log(error);
        });
    })();

    this.setState({
      showSpotInfoBottomSheet: true,
    });
  }

  distanceApart(spotInfo) {
    const mkStart = this.state.position;
    const mkEnd = {
      lat: parseFloat(spotInfo.latitude),
      lng: parseFloat(spotInfo.longitude),
    };

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (mkEnd.lat - mkStart.lat) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (mkEnd.lng - mkStart.lng) * (Math.PI / 180); // Convert degrees to radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(mkStart.lat * (Math.PI / 180)) *
      Math.cos(mkEnd.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  }

  changeRadius() {
    if (this.state.radiusVerificationTimeout) {
      clearTimeout(this.state.radiusVerificationTimeout);
    }

    var timeout = setTimeout(
      function () {
        this.setState({
          showRadiusVerification: false,
        });
      }.bind(this),
      2000
    );

    if (this.state.radius == 0.1) {
      this.setState({
        radius: 0.2,
        showRadiusVerification: true,
        radiusVerificationTimeout: timeout,
      });
    } else if (this.state.radius == 0.2) {
      this.setState({
        radius: 0.5,
        showRadiusVerification: true,
        radiusVerificationTimeout: timeout,
      });
    } else if (this.state.radius == 0.5) {
      this.setState({
        radius: 0.1,
        showRadiusVerification: true,
        radiusVerificationTimeout: timeout,
      });
    }

    (async () => {
      fetch("https://d0bb-103-57-87-7.ngrok-free.app" + "/users/getNearbyListings", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Success 4");
          console.log(json);
          this.setState({ listings: json });
        })
        .catch((error) => {
          console.log("Failure");
          console.log(error);
        });
    })();
  }

  calculateLength = () => {
    const { drawnCoordinates } = this.state;
    let totalLength = 0;

    for (let i = 0; i < drawnCoordinates.length - 1; i++) {
      const lat1 = drawnCoordinates[i].latitude;
      const lon1 = drawnCoordinates[i].longitude;
      const lat2 = drawnCoordinates[i + 1].latitude;
      const lon2 = drawnCoordinates[i + 1].longitude;


      const R = 6371;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      totalLength += distance;
    }


    return totalLength * 1000;
  };



  render() {
    const { drawingMode, drawnCoordinates } = this.state;

    return (
      <View style={styles.container}>

        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          followsUserLocation
          onPress={this.handleMapPress}
          initialRegion={{
            latitude: this.state.position.lat,
            longitude: this.state.position.lng,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
          }}
          region={{
            latitude: this.state.position.lat,
            longitude: this.state.position.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          ref={this.mapRef}

        >
          {this.state.listings.map((listing) => {
            const distanceApart =
              Math.round(this.distanceApart(listing) * 100) / 100;
            if (distanceApart <= this.state.radius) {
              return (
                <SPTMapPinComponent
                  key={listing.id}
                  pinPressed={this.pinPressed.bind(this)}
                  spotInfo={listing}
                  position={{
                    lat: parseFloat(listing.latitude),
                    lng: parseFloat(listing.longitude),
                  }}
                />
              );
            }


            return null;
          })}

          {drawingMode && drawnCoordinates.length > 1 && (
            <Polyline
              coordinates={drawnCoordinates}
              strokeWidth={2}
              strokeColor="red"
            />
          )}

        </MapView>

        <SafeAreaView style={styles.headerBar}>
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => this.props.drawerNavigation.openDrawer()}
            >
              <EntypoIcon
                name="menu"
                color="black"
                style={{ width: 30, height: 30, alignSelf: "center" }}
                size={30}
              />
            </TouchableOpacity>
            <SPTMapSearchBarComponent
              updateMapLocationHandler={this.updateMapLocationHandler}
            />
          </View>


          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => this.changeRadius()}
          >
            <View style={styles.locationIcon}>
              <MaterialCommunityIcons
                name="map-marker-radius-outline"
                color="black"
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                size={25}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => this.goBackToUserLocation()}
          >
            <View style={styles.locationIcon}>
              <MaterialIcon
                name="my-location"
                color="black"
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </SafeAreaView>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.setState((prevState) => ({
              drawingMode: !prevState.drawingMode,
              drawnCoordinates: [],
              length: 0,
            }))
          }
        >
          <Text style={styles.buttonText}>
            {drawingMode ? "Finish Drawing" : "Start Drawing"}
          </Text>
        </TouchableOpacity>
        {drawingMode && drawnCoordinates.length > 1 && (
          <Text style={styles.lengthText}>
            Length: {this.calculateLength().toFixed(2)} meters
          </Text>
        )}

        <BottomSheet ref={this.sheetRef} index={2} snapPoints={this.snapPoints}>
          <FlatList
            style={{ flex: 1 }}
            data={this.state.listings}
            renderItem={({ item }) => {
              const distanceApart = Math.round(this.distanceApart(item) * 100) / 100;
              if (distanceApart <= this.state.radius) {
                return <SPTMapListCelComponent spotInfo={item} distanceApart={distanceApart} navigator={this.props.drawerNavigation} pic={{ uri: "data:image/png;base64," + item.pictures }} />
              }

              return null;
            }}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          />
        </BottomSheet>

        <BottomSheet
          ref={this.spotInfoSheetRef}
          enableContentPanningGesture={false}
          enableHandlePanningGesture={false}
          handleComponent={null}
          index={0}
          snapPoints={this.snapPoints}
          backgroundStyle={{ borderRadius: 0 }}
        >
          <SPTMapParkingSpotDetailsComponent
            spotInfo={this.state.currentSpotInfo}
            distanceApart={Math.round(this.distanceApart(this.state.currentSpotInfo) * 100) / 100}
            navigator={this.props.drawerNavigation}
            closeSpotInfoBottomSheet={this.closeSpotInfoBottomSheet.bind(this)}
          />
        </BottomSheet>

        {this.state.showRadiusVerification && (
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              top: 100,
              alignSelf: "center",
              left: 50,
              right: 50,
              height: 50,
              backgroundColor: "rgba(200, 200, 200, 0.6)",
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: "rgba(200, 200, 200, 0.6)",
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 26 }}>
              {this.state.radius} Km Radius
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default SPTMapComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerBar: {
    width: "90%",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  menuIcon: {
    width: "10%",
    alignSelf: "center",
  },
  locationIcon: {
    width: 30,
    height: 30,
    alignSelf: "center",
    borderRadius: 45,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  loginButton: {
    backgroundColor: 'green',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonWord: {
    color: 'white',
    fontSize: 18,
  },
  drawingModeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  lengthContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  lengthText: {
    position: "absolute",
    bottom: 80,
    left: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});


const data = [
  {
    spotInfo: {
      id: 1,
      parkingSpotImagePath: require("../assets/ParkingSpot1.jpeg"),
      street: "101 Grant St",
      rating: "4.9",
      townAndZip: "West Lafayette, IN 47906",
      rate: "5/hr",
      howFarAway: "0.2 miles away",
      availableNow: "Available now",
      carInfo: "Fits SUVs and Sedans",
    },
  },
  {
    spotInfo: {
      id: 2,
      parkingSpotImagePath: require("../assets/ParkingSpot2.webp"),
      street: "305 N University St",
      rating: "5.0",
      townAndZip: "West Lafayette, IN 47906",
      rate: "7/hr",
      howFarAway: "0.5 miles away",
      availableNow: "Available now",
      carInfo: "Fits SUVs and Sedans",
    },
  },
  {
    spotInfo: {
      id: 3,
      parkingSpotImagePath: require("../assets/ParkingSpot3.jpeg"),
      street: "355 N Martin Jischke Dr",
      rating: "4.7",
      townAndZip: "West Lafayette, IN 47906",
      rate: "10/hr",
      howFarAway: "1.0 miles away",
      availableNow: "Available now",
      carInfo: "Fits SUVs and Sedans",
    },
  },
];
