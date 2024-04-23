import React, { Component } from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

class SPTPostParkingSpotQuestionsComponent extends Component {

  formData = this.props.formData;

  render() {
    return (
      <ScrollView style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Text style={[styles.fieldTitle, { marginBottom: 5 }]}>
          What is the hourly rate? (In $/hr)
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            this.formData.hourlyRate = text;
            this.props.setFormData(this.formData);
          }}
          value={this.formData.hourlyRate}
        />

        <Text style={[styles.fieldTitle, { marginBottom: 5 }]}>
          How many cars can fit in this spot?
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            this.formData.spotCapacity = text;
            this.props.setFormData(this.formData);
          }}
          value={this.formData.spotCapacity}
        />

        <View style={{ height: 20 }} />

        <Text style={[styles.fieldTitle, { marginBottom: 5 }]}>
          What types of vehicles can fit in this spot? (Check all that apply)
        </Text>

        <SPTCheckBoxComponent
          style={{ marginBottom: 5 }}
          isChecked={this.formData.isSedanAllowed}
          handleCheck={() => {
            if (this.formData.isSedanAllowed) {
              this.formData.isSedanAllowed = "";
            } else {
              this.formData.isSedanAllowed = ",Sedan"
            }
            this.props.setFormData(this.formData);
          }}
          carName="Sedan"
        />

        <SPTCheckBoxComponent
          style={{ marginBottom: 5 }}
          isChecked={this.formData.isSUVAllowed}
          handleCheck={() => {
            if (this.formData.isSUVAllowed) {
              this.formData.isSUVAllowed = "";
            } else {
              this.formData.isSUVAllowed = ",SUV"
            }
            this.props.setFormData(this.formData);
          }}
          carName="SUV"
        />

        <SPTCheckBoxComponent
          style={{ marginBottom: 5 }}
          isChecked={this.formData.isMinivanAllowed}
          handleCheck={() => {
            if (this.formData.isMinivanAllowed) {
              this.formData.isMinivanAllowed = "";
            } else {
              this.formData.isMinivanAllowed = ",Minivan"
            }
            this.props.setFormData(this.formData);
          }}
          carName="Minivan"
        />

        <SPTCheckBoxComponent
          style={{ marginBottom: 5 }}
          isChecked={this.formData.isPickupAllowed}
          handleCheck={() => {
            if (this.formData.isPickupAllowed) {
              this.formData.isPickupAllowed = "";
            } else {
              this.formData.isPickupAllowed = ",Pickup"
            }
            this.props.setFormData(this.formData);
          }}
          carName="Pickup"
        />

        <SPTCheckBoxComponent
          style={{ marginBottom: 5 }}
          isChecked={this.formData.isVanAllowed}
          handleCheck={() => {
            if (this.formData.isVanAllowed) {
              this.formData.isVanAllowed = "";
            } else {
              this.formData.isVanAllowed = ",Van"
            }
            this.props.setFormData(this.formData);
          }}
          carName="Van"
        />

        <SPTCheckBoxComponent
          isChecked={this.formData.isTruckAllowed}
          handleCheck={() => {
            if (this.formData.isTruckAllowed) {
              this.formData.isTruckAllowed = "";
            } else {
              this.formData.isTruckAllowed = ",Truck"
            }
            this.props.setFormData(this.formData);
          }}
          carName="Truck"
        />
      </ScrollView>
    );
  }
}

const SPTCheckBoxComponent = (props) => {
  return (
    <View style={[{ flexDirection: "row" }, props.style]}>
      <TouchableOpacity
        style={{
          marginRight: 5,

          width: 20,
          height: 20,
          borderRadius: 5,
          borderColor: "black",
          borderWidth: 1,
          backgroundColor: props.isChecked ? "green" : "white",
        }}
        onPress={() => {
          props.handleCheck();
        }}
      />

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          props.handleCheck();
        }}
      >
        <Text style={{ marginTop: "auto", marginBottom: "auto", fontSize: 16 }}>
          {props.carName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  textInput: {
    backgroundColor: "white",

    height: 30,
    width: 50,

    borderWidth: 1.5,
    borderLeftColor: "rgba(120, 121, 130, 0.8)",
    borderTopColor: "rgba(120, 121, 130, 0.8)",
    borderRightColor: "rgba(120, 121, 130, 0.8)",

    borderBottomWidth: 2.5,
    borderColor: "rgba(120, 121, 130, 1)",

    borderRadius: 5,
  },
});

export default SPTPostParkingSpotQuestionsComponent;
