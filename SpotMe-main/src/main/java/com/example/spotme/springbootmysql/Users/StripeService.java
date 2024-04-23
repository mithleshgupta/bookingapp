package com.example.spotme.springbootmysql.Users;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalTime;

@Service
public class StripeService {
    @Autowired
    UsersRepository usersRepository;
    PaymentsDetails paymentsDetails = new PaymentsDetails();
    Response response = new Response();
    public PaymentIntent createPaymentIntent(Long amount, String email) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount * 100L)
                .setCurrency("INR")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .setPaymentMethod("pm_card_visa")
                .build();
        paymentsDetails.setAmount(BigDecimal.valueOf(amount));
        return PaymentIntent.create(params);
    }

    public void processPaymentIntent(PaymentIntent intent) {
        String intentID = intent.getId();

    }


    public void saveIntentDetails(PaymentStatusRequest request){
        String val = request.getPaymentStatus();

        if(val.equals("success")){
            savePaymentDetails("Success",request.getPaymentIntent());
        }
        else {
            savePaymentDetails("Failed","");
        }
    }



    Request request = new Request();
    public void savePaymentDetails(String status, String intentID) {

        paymentsDetails.setTime(LocalTime.now());
        paymentsDetails.setTime(LocalTime.now());
        paymentsDetails.setPaymentStatus(status);
        paymentsDetails.setPaymentId(intentID);
        usersRepository.savePaymentDetails(paymentsDetails);
    }
}

