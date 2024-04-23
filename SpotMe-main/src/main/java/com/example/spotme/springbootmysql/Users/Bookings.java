package com.example.spotme.springbootmysql.Users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Bookings")
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "Email")
    private String email;
    @Column(name = "Location")
    private String location;
    @Column(name = "start_time")
    private String start_time;
    @Column(name = "end_time")
    private String end_time;
    @Column(name = "parking_date")
    private String parking_date;

    @Column(name = "payment_Id")
    private String paymentId;

    public Bookings() {
    }

    public Bookings(Integer id, String email, String location, String start_time, String end_time, String parking_date, String paymentId) {
        this.id = id;
        this.email = email;
        this.location = location;
        this.start_time = start_time;
        this.end_time = end_time;
        this.parking_date = parking_date;
        this.paymentId = paymentId;
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



    public String getLocation() {
        return location;
    }



    public void setLocation(String location) {
        this.location = location;
    }



    public String getStart_time() {
        return start_time;
    }



    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }



    public String getEnd_time() {
        return end_time;
    }



    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }



    public String getParking_date() {
        return parking_date;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public void setParking_date(String parking_date) {
        this.parking_date = parking_date;
    }

    @Override
    public String toString() {
        return "Bookings{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", location='" + location + '\'' +
                ", start_time='" + start_time + '\'' +
                ", end_time='" + end_time + '\'' +
                ", parking_date='" + parking_date + '\'' +
                ", paymentId='" + paymentId + '\'' +
                '}';
    }
}
