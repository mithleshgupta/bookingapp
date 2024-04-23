package com.example.spotme.springbootmysql.Users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Reviews")
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "Email")
    private String email;
    @Column(name = "Rating")
    private String rating;
    @Column(name = "comments")
    private String comments;
    
    public Reviews() {
    }
    public Reviews(Integer id, String email, String rating, String comments) {
        this.id = id;
        this.email = email;
        this.rating = rating;
        this.comments = comments;
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
    public String getRating() {
        return rating;
    }
    public void setRating(String rating) {
        this.rating = rating;
    }
    public String getComments() {
        return comments;
    }
    public void setComments(String comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "Reviews{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", rating='" + rating + '\'' +
                ", comments='" + comments + '\'' +
                '}';
    }
}
