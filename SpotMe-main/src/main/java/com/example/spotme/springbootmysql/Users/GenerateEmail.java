package com.example.spotme.springbootmysql.Users;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class GenerateEmail {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendOtpEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Verify OTP");

        String emailContent = "<div>" +
                "<p>Hello,</p>" +
                "<p>Your OTP is: <strong>%s</strong></p>" +
                "<p>Click the following link to verify:</p>" +
                "<a href=\"http://localhost:8080/verify/email=%s&otp=%s\" target=\"_blank\">Click to verify</a>" +
                "</div>";

        mimeMessageHelper.setText(String.format(emailContent, otp, email, otp), true);

        javaMailSender.send(mimeMessage);
    }

}
