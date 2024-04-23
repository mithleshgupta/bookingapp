package com.example.spotme.springbootmysql.Users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ParkingReviews")
public class ParkingReviews{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "parking_name")
    private String parking_name;
    @Column(name = "Rating")
    private String rating;
    public ParkingReviews() {
    }
    public ParkingReviews(Integer id, String parking_name, String rating) {
        this.id = id;
        this.parking_name = parking_name;
        this.rating = rating;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getParking_name() {
        return parking_name;
    }
    public void setParking_name(String parking_name) {
        this.parking_name = parking_name;
    }
    public String getRating() {
        return rating;
    }
    public void setRating(String rating) {
        this.rating = rating;
    }
    @Override
    public String toString() {
        return "ParkingReviews{" +
                "id=" + id +
                ", parking_name='" + parking_name + '\'' +
                ", rating='" + rating + '\'' +
                '}';
    }
    
}