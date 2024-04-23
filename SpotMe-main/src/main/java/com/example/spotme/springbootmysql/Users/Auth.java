package com.example.spotme.springbootmysql.Users;

import javax.persistence.*;

@Entity
@Table(name = "auth")
public class Auth {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "Email")
    private String email;
    @Column(name = "Password")
    private String password;

    @Column(name = "Token")
    private String token;
    @Column(name = "Verified")
    private boolean isCreated;

    public Auth() {
    }

    public Auth(Integer id, String email, String password, String token, boolean isCreated) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.token = token;
        this.isCreated = isCreated;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isCreated() {
        return isCreated;
    }

    public void setCreated(boolean created) {
        isCreated = created;
    }

    @Override
    public String toString() {
        return "Auth{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", token=" + token +
                ", isCreated=" + isCreated +
                '}';
    }
}
