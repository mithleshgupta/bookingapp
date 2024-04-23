import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Alert,

} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [showOtpField, setShowOtpField] = useState(false);

  useEffect(() => {
    setImageSource(require("./assets/SpotMeLogo.png"));
  }, []);


  const handleSignIn = async () => {

    try {
      await AsyncStorage.setItem('email', email);
    } catch (error) {
      console.error('Error storing email:', error);
    }
  };

  function checkUser(email, password) {

    const url = `https://d0bb-103-57-87-7.ngrok-free.app/users/login?email=${email}&password=${password}`;

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData === true) {
          navigation.navigate("About");
          handleSignIn();

        } else {
          setShowOtpField(true);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "An error occurred while checking the user.");
      });
  }

  function verifyOtp() {
    const url = `https://d0bb-103-57-87-7.ngrok-free.app/users/verify?email=${email}&otp=${otp}`;

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData === true) {
          navigation.navigate("About");

        } else {
          Alert.alert("Error", "Invalid OTP. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "An error occurred while verifying the OTP.");
      });
  }




  return (
    <View style={styles.container}>
      {imageSource && <Image source={imageSource} style={styles.signInIcon} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
        />
        <TextInput
          style={styles.inputText}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
        />
        {showOtpField && (
          <>
            <TextInput
              style={styles.inputText}
              onChangeText={(otp) => setOtp(otp)}
              placeholder="OTP"
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => verifyOtp(email, otp)}
            >
              <Text style={styles.loginButtonWord}>Verify</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            checkUser(email, password);
          }}
        >
          <Text style={styles.loginButtonWord}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Password")}>
          <Text style={styles.other}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.other}>Don't have an account? Sign up!</Text>
        </TouchableOpacity>
      </View>
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
            <Text style={styles.modalText}>Wrong Login details</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  signInIcon: {
    resizeMode: "center",
    width: "80%",
    height: "20%",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
  },
  inputText: {
    fontSize: 16,
    height: 50,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#e5e5e5",
    borderRadius: 25,
  },
  loginButton: {
    backgroundColor: "green",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonWord: {
    color: "white",
    fontSize: 18,
  },
  other: {
    color: "grey",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: "blue",
    textAlign: "right",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SignIn;
