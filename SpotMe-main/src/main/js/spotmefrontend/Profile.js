import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const updatepass = () => {
    fetch(
      "http://192.168.1.33:8080" +
        "/users/updateProfile/" +
        emailparking +
        "/" +
        username +
        "/" +
        password +
        "/" +
        firstName +
        "/" +
        lastName,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          // Successful PUT
          console.log("good");
          setModalVisible(true);
        } else {
          // Unsuccessful PUT
          console.log("issue");
        }
      })
      .catch((error) => {
        console.log("Fetch Error :-S", error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.logo}>Update Profile</Text>
        <Text style={styles.inputLabel}>Username*</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
        />
        <Text style={styles.inputLabel}>Password*</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
        />
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => setFirstName(text)}
          placeholder="First Name"
        />
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => setLastName(text)}
          placeholder="Last Name"
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => updatepass()}
        >
          <Text style={styles.loginButtonWord}>Update</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 20,
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

export default Profile;
