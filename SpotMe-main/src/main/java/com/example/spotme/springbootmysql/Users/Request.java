package com.example.spotme.springbootmysql.Users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Request {

    private Long amount;
    @Email
    private String email;


}
