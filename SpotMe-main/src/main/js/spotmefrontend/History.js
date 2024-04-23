import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,

} from "react-native";
import ComponentWithFocus from "./ComponentWithFocus";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from 'react-navigation';
export class History extends React.Component {

  state = {
    data: [],
    data1: 0,

  };

  componentDidMount() {
    this.getEmailFromStorage();
    this.props.navigation.addListener('didFocus', this.onScreenFocus);
  }

  onScreenFocus = () => {
    this.getEmailFromStorage();
    this.forceUpdate();
  };



  getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail !== null) {
        this.setState({ email: storedEmail });
        console.log("this is the email i received ", storedEmail)
        this.onFocus();
      }
    } catch (error) {
      console.error('Error retrieving email:', error);
    }
  };


  onFocus = async () => {
    const { email } = this.state;
    console.log("email in onfoucs ", email)
    try {
      const response = await fetch(
        "https://eadd-103-57-87-7.ngrok-free.app" + "/users/findBookings/" + email,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.error(error);
    }
  };

  onFocus1 = async () => {
    try {
      const response = await fetch(
        "https://eadd-103-57-87-7.ngrok-free.app" + "/users/getCredits/" + emailparking,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      this.setState({ data1: json });
    } catch (error) {
      console.error(error);
    }
  };

  delete = (location, start_time, end_time, parking_date) => {
    fetch(
      "https://eadd-103-57-87-7.ngrok-free.app" +
      `/users/deleteBooking/<span class="math-inline">\{emailparking\}/</span>{location}/<span class="math-inline">\{start\_time\}/</span>{end_time}/${parking_date}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          // Successful DELETE
          console.log("Booking canceled successfully");
        } else {
          console.log("Error canceling booking");
        }
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  };

  renderItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingText}>{`Location: ${item.location}`}</Text>
      <Text style={styles.bookingText}>{`Date: ${item.parking_date}`}</Text>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() =>
          this.delete(
            item.location,
            item.start_time,
            item.end_time,
            item.parking_date
          )
        }
      >
        <Text style={styles.cancelButtonText}>CANCEL</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <ComponentWithFocus
        onFocus={() => {
          this.onFocus();
          this.onFocus1();
        }}
      >
        <View style={styles.container}>
          <Text style={styles.baseText}>Your Bookings</Text>
          {this.state.data.length === 0 ? (
            <Text style={styles.baseText}>No bookings found.</Text>
          ) : (
            <FlatList
              data={this.state.data}
              keyExtractor={({ id }) => id.toString()}
              renderItem={this.renderItem}
            />
          )}
          <Text style={styles.baseText}>Your Credits</Text>
          <Text
            style={styles.creditText}
          >{`Credits: ${this.state.data1.Credits}`}</Text>
        </View>
      </ComponentWithFocus>
    );
  }
}

export default withNavigation(History);;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  baseText: {
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: 10,
  },
  bookingItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  creditText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
