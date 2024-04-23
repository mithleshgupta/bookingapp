import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

const ParkingRating = ({ navigation }) => {
  const [rating, setRating] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function adduser() {
    fetch("http://192.168.1.33:8080" + "/users/addParkingReviews", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parking_name: parkingname,
        rating: rating,
      }),
    })
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
          // Successful POST
          console.log("good");
          setModalVisible(true);
        } else {
          // Examine the text in the response
          console.log("issue");
        }
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });

    // Additional styling improvements can be made here if needed

    setModalVisible(true);
  }

  function closeModalAndGoBack() {
    setModalVisible(false);
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.headerText}>Parking Reviews</Text>

        {/* Rating Input */}
        <Text style={styles.inputLabel}>Rating</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Rating"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setRating(text)}
            keyboardType="numeric"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={adduser}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Successful</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeModalAndGoBack}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 50,
    paddingBottom: 20,
  },
  inputLabel: {
    fontSize: 20,
    paddingBottom: 10,
  },
  inputContainer: {
    width: "70%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  textInput: {
    flex: 1,
  },
  submitButton: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "green",
  },
  submitText: {
    color: "white",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ParkingRating;
