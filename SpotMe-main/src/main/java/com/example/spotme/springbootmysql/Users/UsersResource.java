package com.example.spotme.springbootmysql.Users;

import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.io.IOException;

import com.google.gson.Gson;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/users")

public class UsersResource {

    @Autowired
    UsersRepository usersRepository;

    @PostMapping(value = "/addUser")
    public List<Users> addUser(@RequestBody Users user) {
            int ret = usersRepository.save(user);
            if (ret == 0) {
                return null;
            }
        return null;
    }
    @GetMapping(value = "/getAllUsers")
    public List<Users> getAllUsers() {
        return usersRepository.getAllUsers();
    }
    @PutMapping(value = "/forgotpassword/{password}/{email}")
    public String updatePassword( @PathVariable String password, @PathVariable String email) {
        // String email = user.getEmail();
        int ret = usersRepository.updatePassword(password, email);
        if (ret == -1) {
            return "Error";
        }
        return "Password has been changed successfully!";
    }
    @DeleteMapping(value = "/deleteAccount/{email}") 
    public String deleteAccount(@PathVariable String email) {
        // String username = user.getUserName();
        int ret = usersRepository.remove(email);
        if (ret == -1) {
            return "Error";
        }
        return "Account has been deleted successfully!";
    }
    @PutMapping(value = "/updateProfile/{email}/{username}/{password}/{firstname}/{lastname}")
    public String updateProfile(@PathVariable String email, @PathVariable String username,
            @PathVariable String password, @PathVariable String firstname, @PathVariable String lastname) {
        // String email = user.getEmail();
        int ret = usersRepository.updateProf(email, username, password, firstname, lastname);
        if (ret == 0) {
            return "Error";
        }
        return "Profile has been successfully updated!";
    }
    @GetMapping(value = "/getAll/{email}")
    public List<Users> findbyUsername(@PathVariable String email) {
        return usersRepository.findbyUsername(email);
    }
    @GetMapping(value = "/logIn/{email}/{password}")
    public int logIn(@PathVariable String email, @PathVariable String password) {
        List<Users> users = findbyUsername(email);
        if(users.size() != 0) {
            for(int i = 0; i < users.size(); i++) {
                if(users.get(i).getUserPassword().equals(password)) {
                    System.out.println("here!!!");
                    return 0;
                } 
            }
            
        }
        return 1;
    }
    @PostMapping(value = "/insertLocation",
    produces={ "application/json" },
    consumes={ "multipart/form-data" })
    public List<Location> insertLocation(
            @RequestParam("image") MultipartFile file,
            @RequestParam("location") String location
    ) throws IOException {
            System.out.println(location);
            Gson gson = new Gson();
            Location loc = gson.fromJson(location, Location.class);
            System.out.println(loc.toString());
            loc.setPictures(file.getBytes());
        System.out.println(file.getSize());
            int ret = usersRepository.insertLocation(loc);
            if (ret == 0) {
                return null;
            }
        return null;
    }

    @DeleteMapping(value = "/deleteLocation/{email}/{parking_name}")
    public int deleteLocation(@PathVariable String email, @PathVariable String parking_name) {
        int ret = usersRepository.deleteLocation(email, parking_name);
        return ret;
    }

    @RequestMapping(value = "/updateLocation/{email}/{price}/{car_type}/{parking_name}/{description}", method ={RequestMethod.GET, RequestMethod.PUT})
    public int updateLocation(@PathVariable String email, @PathVariable String price, @PathVariable String car_type, @PathVariable String parking_name, @PathVariable String description) {
        List<Location> location = usersRepository.getLocation(email, parking_name);
        if(price.equals("null")) {
            price = location.get(0).getPrice();
        }
        if(car_type.equals("null")) {
            car_type = location.get(0).getCar_type();
        }
        if(description.equals("null")) {
            description = location.get(0).getDescription();
        }
        int ret = usersRepository.updateLocation(email, price, car_type, parking_name, description);
        return ret;
    }
    @GetMapping(value = "/getLocation/{email}/{parking_name}")
    public List<Location> getLocation(@PathVariable String email, @PathVariable String parking_name) {
        return usersRepository.getLocation(email, parking_name);
    }
    @GetMapping(value = "/getLocationByEmail/{email}")
    public List<Location> getLocationByEmail(@PathVariable String email) {
        return usersRepository.getLocationByEmail(email);
    }

    @GetMapping(value = "/findBookings/{email}")
    public List<Bookings> findBookings(@PathVariable String email) {
        return usersRepository.findBookings(email);
    }

    @GetMapping(value = "/findDateBookings/{location}/{parking_date}")
    public List<Bookings> findDateBookings(@PathVariable String location, @PathVariable String parking_date) {
        System.out.println("I am here");
        return usersRepository.findDateBookings(location,parking_date);
    }

    @DeleteMapping(value = "deleteBooking/{email}/{location}/{start_time}/{end_time}/{parking_date}")
    public int deleteBooking(@PathVariable String email, @PathVariable String location, @PathVariable String start_time, @PathVariable String end_time, @PathVariable String parking_date) {
        return usersRepository.deleteBooking(email, location, start_time, end_time, parking_date);
    }

    @PostMapping(value = "/insertImage", 
    produces = { "application/json" }, 
    consumes = { "multipart/form-data" })
    public int insertImage(
        @RequestParam("image")
        MultipartFile file,
        @RequestParam("email")
        String email
        ) throws IOException {
        byte[] data = file.getBytes();
        System.out.println(data);
        return usersRepository.insertImage(data, email);
    }
    @PostMapping(value = "/addReviews")
    public List<Reviews> addReviews(@RequestBody Reviews reviews) {
            int ret = usersRepository.addReviews(reviews);
            if (ret == 0) {
                return null;
            }
        return null;
    }
    @GetMapping(value = "/getReviews")
    public List<Reviews> getReviews() {
        return usersRepository.getReviews();
    }
    @PostMapping(value = "/addCredits/{email}")
    public List<Credits> addCredits(@PathVariable String email) {
            int ret = usersRepository.addCredits(email);
            if (ret == 0) {
                return null;
            }
        return null;
    }
    @GetMapping(value = "/getCredits/{email}")
    public int getCredits(@PathVariable String email) {
        return usersRepository.getCredits(email);
    }
    @PutMapping(value = "/updateCredits/{email}/{amount}")
    public String updateCredits(@PathVariable String email, @PathVariable String amount) {
        // String email = user.getEmail();
        int sum = getCredits(email) - Integer.parseInt(amount);
        int ret = usersRepository.updateCredits(email, String.valueOf(sum));
        if (ret == 0) {
            return "Error";
        }
        return "Credits has been successfully updated!";
    }
    @PostMapping(value = "/addParkingReviews")
    public List<ParkingReviews> addParkingReviews(@RequestBody ParkingReviews parkingReviews) {
            int ret = usersRepository.addParkingReviews(parkingReviews);
            if (ret == 0) {
                return null;
            }
        return null;
    }
    @GetMapping(value = "/getParkingReviews/{parking_name}")
    public double getParkingReviews(@PathVariable String parking_name) {
        List<ParkingReviews> abc = usersRepository.getParkingReviews(parking_name);
        double a = 0;
        double b = 0;
        for(int i = 0; i < abc.size(); i++) {
            a += Integer.parseInt(abc.get(i).getRating());
            b++;
        }
        double c = a/b;
        return c;
    }

    @GetMapping(value = "/getNearbyListings")
    public List<Location> getNearbyListings() {
        return usersRepository.getNearbyListings();
    }


    @Autowired
    private AuthService authService;

    @PostMapping(value = "/login")
    public ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {
        try {
            boolean loginSuccess = authService.loginUser(email, password);
            System.out.println("I have entered the login api");

            if (loginSuccess) {
                return ResponseEntity.ok("true");
            } else {
                return ResponseEntity.badRequest().body("false");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }


    @PostMapping(value = "/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        System.out.println("Received email: " + email);
        System.out.println("Received OTP: " + otp);

        if (authService.verifyOtp(email, otp)) {
            System.out.println("I have received the otp");
            return ResponseEntity.ok("true");
        } else {
            return ResponseEntity.badRequest().body("false");
        }
    }
    @Autowired
    private  PaymentServices paymentServices;

    @PostMapping("/create/{amount}")
    public TransactionDetails createTransaction(@PathVariable(name = "amount") Double amount) throws RazorpayException {
        System.out.println("I entered here");
        return paymentServices.createTransaction(amount);
    }
    Bookings booking = new Bookings();

    @PostMapping("/order/validate")
    public ResponseEntity<String> validateOrder(@RequestBody Map<String, Object> requestData) {
        try {
            String razorpayOrderId = (String) requestData.get("razorpay_order_id");
            String razorpayPaymentId = (String) requestData.get("razorpay_payment_id");
            String razorpaySignature = (String) requestData.get("razorpay_signature");

            String secretKey = "jZh7NlCXfxdAqVqItZupOdyv";
            String expectedSignature = calculateRazorpaySignature(razorpayOrderId, razorpayPaymentId, secretKey);

            if (expectedSignature.equals(razorpaySignature)) {
                paymentServices.savePaymentDetails("success", razorpayPaymentId);

                booking.setPaymentId(razorpayPaymentId);
                usersRepository.insertBooking(booking);

                return ResponseEntity.ok("Success");
            } else {
                paymentServices.savePaymentDetails("failure", "failure");
                booking.setPaymentId("Failed");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transaction is not legit!");
            }
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    public static String calculateRazorpaySignature(String orderId, String paymentId, String secretKey) {
        try {
            String payload = orderId + "|" + paymentId;
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(secretKeySpec);
            byte[] signatureBytes = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));

            StringBuilder signature = new StringBuilder();
            for (byte b : signatureBytes) {
                signature.append(String.format("%02x", b));
            }

            return signature.toString();
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
            return null;
        }
    }


    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public Response createPaymentIntent(@RequestBody Request request) {
        try {
            System.out.println("Creating PaymentIntent...");
            PaymentIntent intent = stripeService.createPaymentIntent(request.getAmount(), request.getEmail());

            System.out.println("Processing PaymentIntent...");
            stripeService.processPaymentIntent(intent);
            System.out.println("PaymentIntent processed successfully.");


            return new Response(intent.getId(), intent.getClientSecret());
        } catch (StripeException e) {
            e.printStackTrace();
            return new Response("Error", "Error");
        }

    }

    @PostMapping("/payment-status")
    public Response handlePaymentStatus(@RequestBody PaymentStatusRequest request) {
        String paymentStatus = request.getPaymentStatus();
        String paymentId = request.getPaymentIntent();
        System.out.println("This is the payment status form frontend " + paymentStatus);

        if ("success".equals(paymentStatus)) {
            System.out.println("Yess i got it");
            stripeService.saveIntentDetails(request);

            booking.setPaymentId(paymentId);
            usersRepository.insertBooking(booking);

            return new Response("Success", "Payment received successfully");
        } else if ("fail".equals(paymentStatus)) {

            return new Response("Failure", "Payment failed");
        } else {

            return new Response("Error", "Invalid payment status");
        }
    }

    @PostMapping(value = "/insertBooking")

    public int insertBooking(@RequestBody Map<String, Object> bookingData) {
        try {
            String email = (String) bookingData.get("email");
            String locationStr = (String) bookingData.get("location");
            String startTime = (String) bookingData.get("startTime");
            String endTime = (String) bookingData.get("endTime");
            String parkingDate = (String) bookingData.get("parkingDate");

            SimpleDateFormat inputDateFormat = new SimpleDateFormat("MMM dd yyyy");
            Date parsedDate = inputDateFormat.parse(parkingDate);

            SimpleDateFormat outputDateFormat = new SimpleDateFormat("ddMMyyyy");
            String formattedDate = outputDateFormat.format(parsedDate);

            System.out.println("Formatted Date: " + formattedDate);
            System.out.println("EMAIL "+ email);
            System.out.println("LOCATION "+ locationStr);
            System.out.println("STARTTIME "+ startTime);
            System.out.println("ENDTIME "+ endTime);


            booking.setEmail(email);
            booking.setLocation(locationStr);
            booking.setEnd_time(endTime);
            booking.setParking_date(formattedDate);
            booking.setStart_time(startTime);

            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }



}





