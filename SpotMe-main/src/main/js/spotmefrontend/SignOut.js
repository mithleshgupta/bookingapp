// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

// Your SignOut component
function SignOut() {
    const [modalVisible, setModalVisible] = useState(false);
    const [imageSource, setImageSource] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        setImageSource(require("./assets/SpotMeLogo.png"));
    }, []);

    function confirmSignOut() {
        setModalVisible(true);
    }

    function handleSignOut() {
        // Sign out the user here
        // Replace with your actual sign out logic

        console.log("User signed out");
        setModalVisible(false); // Close the modal
        navigation.navigate('SignIn'); // Navigate to the SignIn screen
    }

    return (
        <View style={styles.container}>
        {imageSource && <Image source={imageSource} style={styles.signOutIcon} />}
    <TouchableOpacity style={styles.signOutButton} onPress={() => confirmSignOut()}>
<Text style={styles.signOutButtonWord}>Sign Out</Text>
    </TouchableOpacity>
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(false);
    }}
>
<View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalText}>Are you sure you want to sign out?</Text>
    <TouchableOpacity
    style={[styles.button, styles.buttonConfirm]}
    onPress={() => handleSignOut()}>
<Text style={styles.textStyle}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
    style={[styles.button, styles.buttonCancel]}
    onPress={() => setModalVisible(false)}>
<Text style={styles.textStyle}>No</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutIcon: {
        resizeMode: 'center',
        width: '80%',
        height: '20%',
        marginBottom: 20,
    },
    signOutButton: {
        backgroundColor: 'red',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signOutButtonWord: {
        color: 'white',
        fontSize: 18,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
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
        marginTop: 10,
    },
    buttonConfirm: {
        backgroundColor: 'green',
    },
    buttonCancel: {
        backgroundColor: 'red',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
});

// Export your SignOut component
export default SignOut;
