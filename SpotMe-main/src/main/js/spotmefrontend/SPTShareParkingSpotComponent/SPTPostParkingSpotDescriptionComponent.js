import React, { Component } from "react";
import { ScrollView, TextInput, Text, View } from "react-native";

class SPTPostParkingSpotDescriptionComponent extends Component {
  state = {};

  formData = this.props.formData;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{marginBottom: 5, marginTop: 5, alignSelf:'center',  fontSize: 14, fontWeight:'600'}}>
          Can you provide a description of the parking spot?
        </Text>
        <TextInput
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            width: "100%",
            height: "90%",
            alignSelf: "center",
            padding: 5,
          }}
          multiline={true}
          onChangeText={(text) => {
            this.formData.description = text;
            this.props.setFormData(this.formData);
          }}
          value={this.formData.description}
        />
      </View>
    );
  }
}

export default SPTPostParkingSpotDescriptionComponent;
