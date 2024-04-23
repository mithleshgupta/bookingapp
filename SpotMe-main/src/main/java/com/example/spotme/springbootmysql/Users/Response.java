package com.example.spotme.springbootmysql.Users;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private String intentID;
    private String clientSecret;

}
