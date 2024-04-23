package com.example.spotme.springbootmysql.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private GenerateCode getCode;

    @Autowired
    private GenerateEmail generateEmail;

    @Autowired
    private UsersRepository usersRepository;

    public String setter(String email, String password){
        String otp = getCode.generateOtp();
        System.out.println("Generated OTP: " + otp);

        try {
            generateEmail.sendOtpEmail(email,otp);
        }catch (MessagingException e){
            throw new RuntimeException("Unable to send OTP");
        }
        Auth values = new Auth();
        values.setEmail(email);
        values.setPassword(password);
        values.setToken(otp);
        values.setCreated(false);
        usersRepository.saveAuth(values);
        return "Setup Done";
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<Auth> optionalUsers = usersRepository.findbyEmail(email);
        Auth auth = optionalUsers.get();
        System.out.println("I have entered the verfifyotp trying to send email");
        if (!auth.isCreated()) {
            System.out.println("Generated OTP in verifyOtp: " + auth.getToken());

            if (auth.getToken().equals(otp)) {
                auth.setCreated(true);
                usersRepository.updateIsCreated(auth);
                return true;
            }
            System.out.println("I have sent the otp");
        }
        return false;
    }

    public boolean loginUser(String email, String password) {
        Optional<Auth> optionalUsers = usersRepository.findbyEmail(email);
        System.out.println("Entered the login in services");

        if (optionalUsers.isPresent()) {
            Auth auth = optionalUsers.get();
            if (auth.isCreated()) {
                return true;
            }
        } else {
            System.out.println("Entered in login func to set the values");
            setter(email, password);
            return false;
        }

        return true;
    }


}
