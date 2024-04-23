import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

class SPTPostParkingSpotAddressComponent extends Component {
    state = {};

    formData = this.props.formData;

    renderInputField(title, formDataKey) {
        return (
            <View style={styles.inputContainer}>
            <Text style={styles.fieldTitle}>{title}</Text>
            <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
            this.formData[formDataKey] = text;
            this.props.setFormData(this.formData);
        }}
        value={this.formData[formDataKey]}
        />
        </View>
    );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
            <Text style={styles.pageTitle}>Parking Spot Information</Text>
        {this.renderInputField("Spot Name", "name")}
        {this.renderInputField("Street Address", "streetAddress")}
        {this.renderInputField("City", "city")}
        {this.renderInputField("State", "state")}
        {this.renderInputField("Country", "country")}
        {this.renderInputField("ZIP Code", "zipcode")}
    </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    inputContainer: {
        marginBottom: 20,
    },
    fieldTitle: {
        fontSize: 18,
        marginBottom: 5,
        color: "#555",
    },
    textInput: {
        backgroundColor: "#f0f0f0",
        height: 45,
        borderWidth: 1.5,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingLeft: 10,
    },
});

export default SPTPostParkingSpotAddressComponent;
