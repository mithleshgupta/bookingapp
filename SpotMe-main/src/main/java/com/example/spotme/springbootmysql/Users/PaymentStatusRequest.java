package com.example.spotme.springbootmysql.Users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentStatusRequest {
    private String PaymentStatus;
    private String PaymentIntent;
}
