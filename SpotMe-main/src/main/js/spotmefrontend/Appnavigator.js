// Import necessary dependencies
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import SignIn from './SignIn'; // Adjust the path as needed
import SignOut from './SignOut'; // Adjust the path as needed

// Create a Stack Navigator
const Stack = createStackNavigator();

// Create a component for your navigation
const Appnavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn"> {/* Set SignIn as the initial screen */}
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignOut" component={SignOut} />

                {/* Add more screens as needed */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// Export your navigation component
export default Appnavigator;
