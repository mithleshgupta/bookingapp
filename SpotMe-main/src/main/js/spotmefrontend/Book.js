import React, { useState, useEffect, } from "react";
Geocoder.init("AIzaSyDgRXr1bTTXx6JwEZHAyZ29Razfs7uyezo");
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
import * as Location from 'expo-location';
import { useRoute } from "@react-navigation/native";
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from "react-native-calendar-picker";
import RazorpayCheckout from "react-native-razorpay";
import CheckoutScreen from "./CheckoutScreen";
const baseUrl = 'https://d0bb-103-57-87-7.ngrok-free.app';

const Book = ({ navigation }) => {
  //const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const route = useRoute()

  const [date, setDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userLocationpay, setUserLocationpay] = useState(null);

  const { price, email, latitude, longitude } = route.params || {};

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const isUserInIndia = latitude >= 8.4 && latitude <= 37.6 && longitude >= 68.7 && longitude <= 97.4;

      setUserLocationpay(isUserInIndia ? 'India' : 'USA');
      console.log(userLocationpay);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const bookAction = async () => {
    console.log('userLocationpay:', userLocationpay);

    await adduser();
    await updateCredits();


    if (userLocationpay === 'India') {
      console.log('Calling handleClick');

    } else {
      console.log('Navigating to CheckoutScreen');
      navigation.navigate('CheckoutScreen', { price });
    }
  };

  const handleClick = async () => {

    try {
      const response = await fetch(`${baseUrl}/users/create/${price}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('🔥  file: App.js:15  data: ', data);

      let options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: data.currency,
        key: data.key,
        name: 'Acme Corp',
        order_id: data.orderId,
        prefill: {
          email: email,
          contact: '9191919191',
          name: 'Gaurav Kumar',
        },
        theme: { color: '#53a20e' },
      };

      RazorpayCheckout.open(options)
        .then(async data => {
          console.log('data : ', data);

          if (data && data.razorpay_payment_id) {
            console.log(`Success: ${data.razorpay_payment_id}`);
            const validateRes = await fetch(`${baseUrl}/users/order/validate`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: data.razorpay_order_id,
                razorpay_payment_id: data.razorpay_payment_id,
                razorpay_signature: data.razorpay_signature,
              }),
            });

            if (!validateRes.ok) {
              throw new Error(`HTTP error! Status: ${validateRes.status}`);
            }

            const validateData = await validateRes.json();
            console.log('🔥  file: App.js:37  validateRes: ', validateData);
          } else {
            console.log(
              'Invalid or missing data. Unable to retrieve razorpay_payment_id.'
            );
          }
        })
        .catch(error => {
          console.log('RazorpayCheckout error: ', error);
          console.log(
            `RazorpayCheckout Error: ${error.code} | ${error.description}`
          );
        });
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  };

  async function adduser() {
    const startTime = await AsyncStorage.getItem('startTime');
    const endTime = await AsyncStorage.getItem('endTime');
    console.log("End and start time: ", endTime, startTime)
    console.log("Sending data to backend:", {
      email: email,
      location: longitude + latitude,
      parkingDate: date.toString().substring(4, 15),
      startTime: startTime,
      endTime: endTime
    });

    try {
      const response = await fetch("https://d0bb-103-57-87-7.ngrok-free.app/insertBooking", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          location: longitude + latitude,
          parkingDate: date.toString().substring(4, 15),
          startTime: startTime,
          endTime: endTime
        })


      });

      if (response.ok) {
        console.log("Good");
        setModalVisible(true);
      } else {
        console.log("Issue");
      }
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  }



  async function updateCredits() {
    fetch(
      // "https://9a9c-103-57-87-107.ngrok-free.app" +
      // "/users/updateCredits/" +
      email +
      "/" +
      price,
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
          console.log("good");
        } else {
          console.log("issue");
        }
      })
      .catch((err) => {
        console.log("Fetch Error:", err);
      });
  }

  const closeModalAndNavigateBack = () => {
    setModalVisible(false);
    navigation.goBack();
  };


  console.log("date in the book ", date);


  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Book a Parking Spot</Text>

        <Text style={styles.label}>Select a Date</Text>
        <CalendarPicker
          style={styles.calendar}
          onDateChange={(selectedDate) => setDate(selectedDate)}
        />

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            AsyncStorage.setItem('date', JSON.stringify(date))
            navigation.navigate("Timing");
          }}
        >
          <Text style={styles.buttonText}>CHECK AVAILABILITY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Rate")}
        >
          <Text style={styles.buttonText}>ADD RATING</Text>
        </TouchableOpacity>

        <Text style={styles.selectedDateText}>
          Selected Date: {date.toString().substring(4, 15)}
        </Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Booking Successful!</Text>
              <Pressable
                style={[styles.button, styles.closeButton]}
                onPress={closeModalAndNavigateBack}
              >
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>


        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            bookAction()
          }}
        >
          <Text style={styles.buttonText}>BOOK NOW</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  actionButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  selectedDateText: {
    fontSize: 16,
    marginTop: 15,
    color: "#777",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#fff",
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
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
});

export default Book;
