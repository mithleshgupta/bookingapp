import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

const Password = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function updatePassword() {
    // Replace '"http://192.168.1.33:8080"' with your actual server URL
    fetch(
      "http://192.168.1.33:8080" +
        "/users/forgotpassword/" +
        password +
        "/" +
        email,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
          // Successful POST
          console.log("Password updated successfully");
        } else {
          // Examine the text in the response
          console.log("Issue with the request");
        }
      })
      .catch(function (err) {
        console.log("Fetch Error: ", err);
      });
  }

  const handleSaveChanges = () => {
    if (password !== confirm) {
      alert("Passwords do not match");
    } else {
      updatePassword();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.innerContainer}>
          <Image
            source={require("./assets/SpotMeLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.label}>Email*</Text>
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
          />
          <Text style={styles.label}>New Password*</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
          />
          <Text style={styles.label}>Confirm Password*</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(confirm) => setConfirm(confirm)}
            placeholder="Confirm Password"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSaveChanges();
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 5,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "green",
  },
  input: {
    fontSize: 16,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 25,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Password;
