import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";

const SignUp = ({ navigation }) => {
  const [userName, setuname] = useState("");
  const [firstName, setfname] = useState("");
  const [lastName, setlname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function adduser() {
    fetch("http://192.168.1.33:8080" + "/users/addUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        userPassword: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
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

  function addCredits() {
    fetch("http://192.168.1.33:8080" + "/users/addCredits/" + email, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
        console.log("Fetch Error :-S", err);
      });
  }

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

      <Text style={styles.sectionTitle}>Already have an account?</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.loginButtonText}>Login Here</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>User Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="User Name"
          onChangeText={(userName) => setuname(userName)}
        />

        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={(firstName) => setfname(firstName)}
        />

        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={(lastName) => setlname(lastName)}
        />

        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email Address"
          onChangeText={(email) => setEmail(email)}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            adduser();
            addCredits();
            setModalVisible(true);
          }}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            navigation.navigate("SignIn"); // Navigate back to the SignIn screen
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Registration Successful</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingTop: 50,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    color: "gray",
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: "transparent",
  },
  loginButtonText: {
    color: "green",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "green",
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#f3f3f3",
  },
  signUpButton: {
    width: "95%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
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
    backgroundColor: "green",
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

export default SignUp;
