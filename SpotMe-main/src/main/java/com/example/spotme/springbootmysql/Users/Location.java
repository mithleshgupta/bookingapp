package com.example.spotme.springbootmysql.Users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.IOException;

@Entity
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "Email")
    private String email;
    @Column(name = "Price")
    private String price;
    @Column(name = "car_type")
    private String car_type;
    @Column(name = "parking_name")
    private String parking_name;
    @Column(name = "Description")
    private String description;
    @Column(name = "street")
    private String street;
    @Column(name = "city")
    private String city;
    @Column(name = "state")
    private String state;
    @Column(name = "zipcode")
    private String zipcode;
    @Column(name = "latitude")
    private String latitude;
    @Column(name = "longitude")
    private String longitude;
    @Column(name = "pictures", columnDefinition="BINARY(500000)")
    private byte[] pictures;
    

    public Location() {
    }


    public Location(Integer id, String email, String price, String car_type, String parking_name, String description,
            String street, String city, String state, String zipcode, String latitude, String longitude,
            byte[] pictures) throws IOException{
        this.id = id;
        this.email = email;
        this.price = price;
        this.car_type = car_type;
        this.parking_name = parking_name;
        this.description = description;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.latitude = latitude;
        this.longitude = longitude;
        this.pictures = pictures;
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


    public String getPrice() {
        return price;
    }


    public void setPrice(String price) {
        this.price = price;
    }


    public String getCar_type() {
        return car_type;
    }


    public void setCar_type(String car_type) {
        this.car_type = car_type;
    }


    public String getParking_name() {
        return parking_name;
    }


    public void setParking_name(String parking_name) {
        this.parking_name = parking_name;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public String getStreet() {
        return street;
    }


    public void setStreet(String street) {
        this.street = street;
    }


    public String getCity() {
        return city;
    }


    public void setCity(String city) {
        this.city = city;
    }


    public String getState() {
        return state;
    }


    public void setState(String state) {
        this.state = state;
    }


    public String getZipcode() {
        return zipcode;
    }


    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }


    public String getLatitude() {
        return latitude;
    }


    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }


    public String getLongitude() {
        return longitude;
    }


    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }


    public byte[] getPictures() throws IOException {
        return pictures;
    }


    public void setPictures(byte[] pictures) {
        this.pictures = pictures;
    }


    @Override
    public String toString() {
        return "Location{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", price='" + price + '\'' +
                ", car_type='" + car_type + '\'' +
                ", parking_name='" + parking_name + '\'' +
                ", description='" + description + '\'' +
                ", street='" + street + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", pictures='" + pictures + '\'' +
                '}';
    }
    
    
}
