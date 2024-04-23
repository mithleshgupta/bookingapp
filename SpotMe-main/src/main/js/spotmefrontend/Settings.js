import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Header,
  FlatList,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  Image,
  View,
  Platform,
  StatusBar,
  Button,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
// import { TouchableOpacity } from 'react-native-gesture-handler';
//import { Header } from 'react-native-elements';
// import axios from 'axios';

const Settings = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function del(email) {
    fetch("http://192.168.1.33:8080" + "/users/deleteAccount/" + email, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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

  function remove(email, name) {
    fetch(
      "http://192.168.1.33:8080" +
        "/users/deleteLocation/" +
        email +
        "/" +
        name,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
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
          <Text style={styles.logo}>Delete Account</Text>
          <Text style={styles.inputLabel}>Email*</Text>
          <TextInput
            style={styles.inputText}
            // secureTextEntry={true}
            onChangeText={(email) => setEmail(email)}
            // value={email}
            placeholder="Email"
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonWord} onPress={() => del(email)}>
              DELETE
            </Text>
          </TouchableOpacity>
          <Text style={styles.logo}>Remove a Parking </Text>
          <Text style={styles.inputLabel}>Parking Name*</Text>
          <TextInput
            style={styles.inputText}
            // secureTextEntry={true}
            onChangeText={(name) => setName(name)}
            // value={email}
            placeholder="Name"
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text
              style={styles.loginButtonWord}
              onPress={() => remove(emailparking, name)}
            >
              REMOVE
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 40,
    // backgroundColor: 'pink',
    borderRadius: 15,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  inputLabel: {
    fontSize: 20,
    alignItems: "flex-start",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "green",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    marginBottom: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  loginButtonWord: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  other: {
    fontWeight: "bold",
    fontSize: 15,
    color: "grey",
  },
  inputText: {
    textAlign: "left",
    fontSize: 15,
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
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

export default Settings;
