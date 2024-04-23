import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      },
      (response) => {
        if (response) {
          console.log(response);
          setImage(response);
        }
      }
    );

    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });

    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  };

  return (
    <View>
      <View style={imageUploaderStyles.container}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}

        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity onPress={handleUploadPhoto(image)}>
            <Text style={imageUploaderStyles.membersList}>Save Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addImage}
            style={imageUploaderStyles.uploadBtn}
          >
            <Text>{image ? "Edit" : "Upload"} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity onPress={handleUploadPhoto(image)}>
                        <Text style={imageUploaderStyles.membersList}>Save Image</Text>
                    </TouchableOpacity> */}
      </View>
      {/* <TouchableOpacity onPress={handleUploadPhoto(image)}>
                        <Text style={imageUploaderStyles.membersList}>Save Image</Text>
                    </TouchableOpacity> */}
    </View>
  );
}

function handleUploadPhoto(im) {
  fetch(
    "http://192.168.1.33:8080" + "/users/addPhotos/" + im + "/" + emailparking,
    {
      method: "POST",
      body: createFormData(im, { userId: "123" }),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log("upload success", response);
      // alert('Upload success!');
      setImage(im);
    })
    .catch((error) => {
      console.log("upload error", error);
      // alert('Upload failed!');
    });
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
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
