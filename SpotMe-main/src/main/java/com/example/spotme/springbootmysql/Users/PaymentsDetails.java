package com.example.spotme.springbootmysql.Users;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(name = "payments")
public class PaymentsDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "time")
    private LocalTime time;
    @Column(name = "amount")
    private BigDecimal amount;
    @Column(name = "status")
    private String paymentStatus;
    @Column(name = "date")
    private Date date;
    @Column(name = "payment_id")
    private String paymentId;

    public PaymentsDetails(Integer id, LocalTime time, BigDecimal amount, String paymentStatus, Date date, String paymentId) {
        this.id = id;
        this.time = time;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
        this.date = date;
        this.paymentId = paymentId;
    }

    public PaymentsDetails() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
}