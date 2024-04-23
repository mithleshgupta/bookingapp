import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import ComponentWithFocus from "./ComponentWithFocus";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Timings extends Component {
  state = {
    data: [],
    timeSlots: [
      { id: 1, start: "12am", end: "2am", stateKey: "time1", isBooked: false },
      { id: 2, start: "2am", end: "4am", stateKey: "time2" },
      { id: 3, start: "4am", end: "6am", stateKey: "time3" },
      { id: 4, start: "6am", end: "8am", stateKey: "time4" },
      { id: 5, start: "8am", end: "10am", stateKey: "time5" },
      { id: 6, start: "10am", end: "12pm", stateKey: "time6" },
      { id: 7, start: "12pm", end: "2pm", stateKey: "time7" },
      { id: 8, start: "2pm", end: "4pm", stateKey: "time8" },
      { id: 9, start: "4pm", end: "6pm", stateKey: "time9" },
      { id: 10, start: "6pm", end: "8pm", stateKey: "time10" },
      { id: 11, start: "8pm", end: "10pm", stateKey: "time11" },
      { id: 12, start: "10pm", end: "12am", stateKey: "time12" },
    ],
    modalVisible: false,
    currentTime: new Date().getTime(),
    formattedDate: ''
  };



  fetchDate = async () => {
    try {
      const date = await AsyncStorage.getItem('date');
      if (date) {
        console.log("this is date in timings ", date);
        return date; 
      } else {
        console.error('No date found in AsyncStorage');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving date from AsyncStorage:', error);
      return null;
    }
  };





  onFocus = async () => {
    const route = useRoute();
    const { longitude, latitude } = route.params || {};
    console.log("Longitude:", longitude);
    console.log("Latitude:", latitude);
    console.log("this is the location of the ", latitude + longitude)
    const location = latitude + longitude
    const dateStr = await this.fetchDate();
    console.log("this is the dateStr:", dateStr);

    const [datePart] = dateStr.split('T');
    const [year, month, day] = datePart.split('-');

    const formattedDay = day.padStart(2, '0');
    const formattedMonth = month.padStart(2, '0');

    let formattedDate = formattedDay + formattedMonth + year;
    formattedDate = formattedDate.replace(/"/g, '');
    console.log("Parsed and Formatted Date:", formattedDate);
    this.setState({ formattedDate });



    fetch(
      "https://d0bb-103-57-87-7.ngrok-free.app" +
      "/users/findDateBookings/" +
      location +
      "/" +
      formattedDate,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("this is the json response ", json);
        const bookedTimes = json.map((booking) => booking.start_time);
        console.log("Booked Times:", bookedTimes);
        const updatedTimeSlots = this.state.timeSlots.map((slot) => {
          const isBooked = bookedTimes.includes(slot.start);
          return { ...slot, isBooked };
        });
        console.log("Updated Time Slots:", updatedTimeSlots);
        this.setState({ data: json, timeSlots: updatedTimeSlots });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  renderTimeSlot = ({ id, start, end, stateKey, isBooked }) => {
    console.log("End Time:", end);
    const { currentTime } = this.state;
    const { formattedDate } = this.state;
    console.log("Formatted Date in render:", formattedDate);


    const formattedDay = parseInt(formattedDate.substring(0, 2), 10);
    const formattedMonth = parseInt(formattedDate.substring(2, 4), 10);
    const formattedYear = parseInt(formattedDate.substring(4, 8), 10);

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();


    const convertToTime = (timeString) => {
      const time = timeString.match(/(\d+)(?::(\d+))?\s*(\w{2})?/);
      let hours = parseInt(time[1], 10);
      if (time[3] && time[3].toLowerCase() === "pm" && hours !== 12) {
        hours += 12;
      } else if (time[3] && time[3].toLowerCase() === "am" && hours === 12) {
        hours = 0;
      }
      const minutes = time[2] ? parseInt(time[2], 10) : 0;
      return new Date().setHours(hours, minutes, 0, 0);
    };

    let slotEndTime;
    if (end !== "12am") {
      slotEndTime = convertToTime(end);
      console.log("Slot End Time:", slotEndTime);
    }

    
    const isCurrentDate = formattedDay === currentDay && formattedMonth === currentMonth && formattedYear === currentYear;

    
    const isDisabled = isBooked || (slotEndTime && slotEndTime < currentTime && isCurrentDate);

    return (
      <TouchableOpacity
        style={[
          styles.timeSlot,
          { backgroundColor: isBooked ? "red" : (isDisabled ? "#ccc" : "green") },
        ]}
        disabled={isDisabled}
        onPress={() => {
          const startTime = start;
          const endTime = end;
          console.log("Selected Time Slot:", startTime, endTime);
          AsyncStorage.setItem('startTime', startTime);
          AsyncStorage.setItem('endTime', endTime);
          this.setModalVisible(true);
        }}
        key={id}
      >
        <Text style={styles.timeSlotText}>{`${start} - ${end}`}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ComponentWithFocus onFocus={() => this.onFocus()}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.inputText}>
            Select from available time slots:
          </Text>
          <View style={styles.timeSlotsContainer}>
            {this.state.timeSlots.map((slot) => this.renderTimeSlot(slot))}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Selection Completed. Go back to the bookings page and complete
                  the booking.
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </ComponentWithFocus>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  inputText: {
    fontSize: 20,
    paddingBottom: 10,
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  timeSlot: {
    width: "30%",
    height: 100,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
  },
  timeSlotText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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

export default Timings;
