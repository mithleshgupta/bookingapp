import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

class SPTPostParkingSpotUploadImageComponent extends Component {

  keyCount = 0;

  formData = this.props.formData;

  addImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.cancelled) {
      this.formData.images = this.formData.images.concat([image])
      this.props.setFormData(this.formData);
    }
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Text>Can you share a few pictures of the parking spot?</Text>
        <View style={styles.photoGrid}>
          {this.formData.images.map((image) => {
            return <Image key={this.keyCount++} source={{uri: image.uri}} style={styles.square} />;
          })}

          <TouchableOpacity onPress={this.addImage}>
            <View
              style={[
                styles.square,
                { backgroundColor: "rgba(50, 50, 50, 0.2)" },
              ]}
            >
              <AntDesignIcon
                name="plus"
                size={100}
                style={{
                  color: "gray",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  photoGrid: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",

    // marginLeft: 5,
    // marginRight: 5,
    // backgroundColor: 'yellow',

    flex: 1,
  },
  square: {
    width: 180,
    height: 180,
    backgroundColor: "green",
    margin: 1,
  },
});

export default SPTPostParkingSpotUploadImageComponent;
