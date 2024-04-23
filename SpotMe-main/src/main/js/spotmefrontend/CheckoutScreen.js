import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import Stripe from '@stripe/stripe-react-native'
import { useRoute } from '@react-navigation/native';
const CheckoutScreen = ({ navigation }) => {
    const { confirmPayment } = useStripe();
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvc, setCvc] = useState('');
    const route = useRoute();
    const { price } = route.params || {};
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handlePayPress = async () => {
        try {
            const response = await fetch('https://d0bb-103-57-87-7.ngrok-free.app/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    cardNumber,
                    expiryMonth,
                    expiryYear,
                    cvc,
                    amount: parseFloat(price) * 100,
                }),
            });

            const responseData = await response.json();
            console.log(responseData);
            console.log(responseData.clientSecret, "this is client secret");
            if (response.ok) {
                console.log("trying to enter here ")
                const { intentID, clientSecret } = responseData;

                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    paymentMethodType: 'Card',

                });


                if (error) {
                    console.error('Payment confirmation error:', error);
                    alert('Payment failed. Please try again.');
                } else {
                    console.log('Payment successful:', paymentIntent);

                    if (paymentIntent.status === 'Succeeded') {
                        setPaymentStatus('success');

                        await sendPaymentStatusToBackend('success', paymentIntent.id);
                    } else {
                        setPaymentStatus('failure');
                    }
                }
            } else {
                console.error('Payment initiation failed:', responseData);
                alert('Payment initiation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };


    const sendPaymentStatusToBackend = async (status, intentId) => {
        console.log("Enter in the second api")
        try {
            const response = await fetch('https://d0bb-103-57-87-7.ngrok-free.app/payment-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentStatus: status,
                    paymentIntent: intentId,
                }),
            });
            const responseData = await response.json();
            console.log(responseData);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={price}
                editable={false}
            />
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={styles.cardField}
                onCardChange={(cardDetails) => {
                    setCardNumber(cardDetails.number ?? '');
                    setExpiryMonth(cardDetails.expMonth ?? '');
                    setExpiryYear(cardDetails.expYear ?? '');
                    setCvc(cardDetails.cvc ?? '');
                }}
            />
            <Button title="Pay" onPress={handlePayPress} />

            {paymentStatus === 'success' && (
                <View style={styles.successContainer}>
                    <Text style={styles.successText}>Payment Successful!</Text>
                </View>
            )}

            {paymentStatus === 'failure' && (
                <View style={styles.failureContainer}>
                    <Text style={styles.failureText}>Payment Failed. Please try again.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    cardField: {
        width: '100%',
        height: 50,
        marginVertical: 30,
    },
    successContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    successText: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
    },
    failureContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    failureText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;
