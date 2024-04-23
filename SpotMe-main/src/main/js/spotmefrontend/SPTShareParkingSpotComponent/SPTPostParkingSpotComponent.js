import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SPTPostParkingSpotAddressComponent from "./SPTPostParkingSpotAddressComponent";
import SPTPostParkingSpotUploadImageComponent from "./SPTPostParkingSpotUploadImageComponent";
import SPTPostParkingSpotDescriptionComponent from "./SPTPostParkingSpotDescriptionComponent";
import SPTPostParkingSpotQuestionsComponent from "./SPTPostParkingSpotQuestionsComponent";
import * as Progress from "react-native-progress";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { getState } from "react-native-calendars/src/day-state-manager";

class SPTPostParkingSpotComponent extends Component {
  state = {
    pageIndex: 0,
    photo: null,
    photoWithMetaData: null,
    addressForm: {
      name: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
    questionForm: {
      hourlyRate: "0.00",
      spotCapacity: "0",
      isSedanAllowed: "",
      isSUVAllowed: "",
      isMinivanAllowed: "",
      isPickupAllowed: "",
      isVanAllowed: "",
      isTruckAllowed: "",
    },
    imageForm: {
      images: [],
    },
    descriptionForm: {
      description: "",
    },
  };

  setAddressForm(formData) {
    this.setState({
      addressForm: {
        name: formData.name,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipcode: formData.zipcode,
      },
    });
  }

  setQuestionForm(formData) {
    this.setState({
      questionForm: {
        hourlyRate: formData.hourlyRate,
        spotCapacity: formData.spotCapacity,
        isSedanAllowed: formData.isSedanAllowed,
        isSUVAllowed: formData.isSUVAllowed,
        isMinivanAllowed: formData.isMinivanAllowed,
        isPickupAllowed: formData.isPickupAllowed,
        isVanAllowed: formData.isVanAllowed,
        isTruckAllowed: formData.isTruckAllowed,
      },
    });
  }

  setImageForm(formData) {
    this.setState({
      imageForm: {
        images: formData.images,
      },
    });
  }

  setDescriptionForm(formData) {
    this.setState({
      descriptionForm: {
        description: formData.description,
      },
    });
  }

  addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!_image.canceled) {
      console.log("in addImage", _image.assets[0].uri);
      this.setState({ photo: _image.assets[0].uri });
      this.setState({ photoWithMetaData: _image.assets[0] });
    }
  };

  createFormData = (img, body = {}) => {
    const data = new FormData();
    console.log(img.uri.replace("file://", ""));
    console.log(img.uri.replace("file://", ""));
    data.append("image", {
      name: "img",
      type: "image/jpeg",
      uri: img.uri.replace("file://", ""),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    console.log(data);
    return data;
  };

  getCarTypes() {
    var carTypes = "";
    if (this.state.questionForm.isMinivanAllowed) {
      carTypes += ",Minivan";
    } else if (this.state.questionForm.isSUVAllowed) {
      carTypes += ",SUV";
    } else if (this.state.questionForm.isPickupAllowed) {
      carTypes += ",Pickup";
    } else if (this.state.questionForm.isSedanAllowed) {
      carTypes += ",Sedan";
    } else if (this.state.questionForm.isTruckAllowed) {
      carTypes += ",Truck";
    }

    return carTypes.substring(1);
  }

  onFinish() {
    var abc = [1, 2, 3];

    (async () => {
      const location = await this.getCoordinates();
      var lng = location.lng;
      var lat = location.lat;
      console.log(
        this.createFormData(this.state.photoWithMetaData, {
          location: JSON.stringify({
            email: emailparking,
            price: this.state.questionForm.hourlyRate,
            car_type: this.getCarTypes(),
            parking_name: this.state.addressForm.name,
            description: this.state.descriptionForm.description,
            street: this.state.addressForm.streetAddress,
            city: this.state.addressForm.city,
            state: this.state.addressForm.state,
            zipcode: this.state.addressForm.zipcode,
            latitude: lat,
            longitude: lng,
            pictures: abc,
          }),
        })
      );
      fetch("http://10.0.2.2:8080" + "/users/insertLocation", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: this.createFormData(this.state.photoWithMetaData, {
          location: JSON.stringify({
            email: emailparking,
            price: this.state.questionForm.hourlyRate,
            car_type: this.getCarTypes(),
            parking_name: this.state.addressForm.name,
            description: this.state.descriptionForm.description,
            street: this.state.addressForm.streetAddress,
            city: this.state.addressForm.city,
            state: this.state.addressForm.state,
            zipcode: this.state.addressForm.zipcode,
            latitude: lat,
            longitude: lng,
            pictures: abc,
          }),
        }),
      })
        .then(function (response) {
          if (response.status === 200 || response.status === 201) {
            // Successful POST
            console.log("good");
            // setModalVisible(true)
          } else {
            // Examine the text in the response
            console.log("issue");
          }
        })
        .catch(function (err) {
          console.log("error: " + err)
          console.log("Fetch Error :-S", err);
        });
    })();

    this.props.navigation.navigate("Parking Locations");
  }

  async getCoordinates() {
    const { streetAddress, city, state, zipcode } = this.state.addressForm;
    return await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      streetAddress +
      "," +
      city +
      "," +
      state +
      "," +
      zipcode +
      "," +
      "&key=AIzaSyDgRXr1bTTXx6JwEZHAyZ29Razfs7uyezo"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "OK") {
          let location = responseJson?.results?.[0]?.geometry.location;
          console.log(location);
          return location;
        } else {
          console.log("not found", responseJson);
        }
      })
      .catch((error) => {
        console.log(error);
        return {};
      });
  }

  render() {
    return (
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <Progress.Bar
          borderRadius={0}
          borderWidth={0}
          progress={this.state.pageIndex / 3}
          animated={true}
          width={null}
          unfilledColor="lightgray"
        />

        {this.state.pageIndex == 0 && (
          <SPTPostParkingSpotAddressComponent
            formData={this.state.addressForm}
            setFormData={this.setAddressForm.bind(this)}
          />
        )}
        {this.state.pageIndex == 1 && (
          <SPTPostParkingSpotQuestionsComponent
            formData={this.state.questionForm}
            setFormData={this.setQuestionForm.bind(this)}
          />
        )}
        {this.state.pageIndex == 2 && (
          <ScrollView style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
            <View style={imageUploaderStyles.container}>
              {this.state.photo && (
                <Image
                  source={{ uri: this.state.photo }}
                  style={{ width: 200, height: 200 }}
                />
              )}
              <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.addImage();
                    console.log("HETRE", this.state.photo);
                  }}
                  style={imageUploaderStyles.uploadBtn}
                >
                  <Text>{this.state.photo ? "Edit" : "Upload"} Image</Text>
                  <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
        {this.state.pageIndex == 3 && (
          <SPTPostParkingSpotDescriptionComponent
            formData={this.state.descriptionForm}
            setFormData={this.setDescriptionForm.bind(this)}
          />
        )}

        <View style={styles.prevNextBar}>
          {this.state.pageIndex > 0 ? (
            <TouchableOpacity
              style={styles.barItem}
              onPress={() => {
                this.setState({ pageIndex: this.state.pageIndex - 1 });
              }}
            >
              <Text style={styles.buttonText}>Prev</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {this.state.pageIndex < 3 ? (
            <TouchableOpacity
              style={styles.barItem}
              onPress={() => {
                this.setState({ pageIndex: this.state.pageIndex + 1 });
              }}
            >
              <Text style={styles.buttonText}>
                {this.state.pageIndex === 2 ? "Upload" : "Next"}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.barItem}
              onPress={() => {
                this.onFinish();
              }}
            >
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(42, 161, 74, 1.0)",
  },
  prevNextBar: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
  },
  barItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2AA14A",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    top: 20,
    alignSelf: "center",
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  membersList: {
    fontWeight: "bold",
    fontSize: 17,
    alignItems: "center",
    color: "goldenrod",
    elevation: 3,
    textShadowColor: "#e8e8e8",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    paddingTop: 10,
  },
});

export default SPTPostParkingSpotComponent;
