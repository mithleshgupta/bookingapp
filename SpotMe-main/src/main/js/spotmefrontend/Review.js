// import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  Pressable,
} from "react-native";

const Review = () => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  function adduser() {
    fetch("http://192.168.1.33:8080" + "/users/addReviews", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailparking,
        rating: rating,
        comments: comment,
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
  }
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Successful</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Text style={styles.baseText}>App Reviews </Text>
        <Text style={styles.inputText}>Rating</Text>
        <View>
          <TextInput
            style={styles.TextInput}
            placeholder="Rating"
            placeholderTextColor="#003f5c"
            onChangeText={(rating) => setRating(rating)}
          />
        </View>
        <Text style={styles.inputText}>Comments</Text>
        <View>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter comments"
            placeholderTextColor="#003f5c"
            onChangeText={(comment) => setComment(comment)}
          />
        </View>
        <TouchableOpacity style={styles.signBtn} onPress={adduser}>
          <Text style={styles.signText}>SUBMIT</Text>
        </TouchableOpacity>
        {/* <Button style = {styles.signBtn} onPress={adduser}>
      <Text style={styles.signText}>SIGN UP</Text>
      </Button> */}
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
    // alignItems: "flex-start",
    // // justifyContent: "flex-start",
  },
  baseText: {
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 50,
    paddingLeft: 10,
    paddingBottom: 1,
  },
  inputText: {
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  TextInput: {
    width: "70%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 10,

    marginLeft: 20,
  },
  signBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "green",
    marginLeft: 90,
  },
  signText: {
    color: "white",
    fontSize: 20,
  },
  backBtn: {
    alignItems: "flex-start",
    width: "30%",
    marginTop: 50,
    marginLeft: 10,
  },
  logText: {
    fontSize: 14,
    paddingTop: 2,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  loginBtn: {
    // width: "15%",
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "green",
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  backText: {
    fontSize: 15,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
export default Review;
