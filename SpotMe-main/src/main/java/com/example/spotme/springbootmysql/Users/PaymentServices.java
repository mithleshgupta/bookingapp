package com.example.spotme.springbootmysql.Users;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
@Service
public class PaymentServices {
    @Autowired
    UsersRepository usersRepository;

    private static final String KEY = "rzp_test_DUMdO3CJ6aDwtI";
    private static final String KEY_SECRET = "jZh7NlCXfxdAqVqItZupOdyv";

    private static final String CURRENCY = "INR";

    PaymentsDetails paymentsDetails = new PaymentsDetails();

    public TransactionDetails createTransaction(Double amount) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(KEY,KEY_SECRET);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("amount",(amount*100));
        jsonObject.put("currency",CURRENCY);
        Order order = razorpayClient.orders.create(jsonObject);
        TransactionDetails transactionDetails =  prepareTransactionDetails(order);
        return transactionDetails;
    }

    public TransactionDetails prepareTransactionDetails(Order order) {
        String orderId = order.get("id");
        String currency = order.get("currency");
        Integer amount = order.get("amount");
        String status = order.get("status");
        //Long createdAtTimestamp = order.get("created_at");
        //Instant instant = Instant.ofEpochSecond(createdAtTimestamp);
//     Date utilDate = Date.from(instant);


        LocalTime localTime = LocalTime.now();
        Time time = Time.valueOf(localTime);

        paymentsDetails.setTime(localTime);
//        paymentsDetails.setDate(utilDate);
        paymentsDetails.setAmount(BigDecimal.valueOf(amount));


        TransactionDetails transactionDetails = new TransactionDetails(orderId, currency, amount.intValue(), KEY, status, null, time);
        return transactionDetails;
    }


    public void savePaymentDetails(String status, String paymentId) {
       paymentsDetails.setPaymentStatus(status);
       paymentsDetails.setPaymentId(paymentId);

       usersRepository.savePaymentDetails(paymentsDetails);
    }



}
