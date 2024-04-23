package com.example.spotme.springbootmysql.Users;

import javax.xml.crypto.Data;
import java.sql.Time;
import java.util.Date;

public class TransactionDetails {

    private String orderId;
    private String currency;
    private Integer amount;
    private String Key;

    private String status;

    private Date date;

    private Time time;


    public TransactionDetails(String orderId, String currency, Integer amount, String key, String status, Date date, Time time) {
        this.orderId = orderId;
        this.currency = currency;
        this.amount = amount;
        Key = key;
        this.status = status;
        this.date = date;
        this.time = time;
    }

    public TransactionDetails() {
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getKey() {
        return Key;
    }

    public void setKey(String key) {
        Key = key;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}