package com.example.spotme.springbootmysql.Users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Credits")
public class Credits {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "Email")
    private String email;
    @Column(name = "Amount")
    private String amount;
    public Credits() {
    }
    public Credits(Integer id, String email, String amount) {
        this.id = id;
        this.email = email;
        this.amount = amount;
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
    public String getAmount() {
        return amount;
    }
    public void setAmount(String amount) {
        this.amount = amount;
    }
    @Override
    public String toString() {
        return "Credits{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", amount='" + amount + '\'' +
                '}';
    }

}
