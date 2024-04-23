package com.example.spotme.springbootmysql.Users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Parking")
public class Parking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "Location")
    private String location;
    @Column(name = "total_spots")
    private Integer total_spots;
    @Column(name = "occupied_spots")
    private Integer occupied_spots;
    @Column(name = "time_slot")
    private String time_slot;
    
    public Parking() {
    }
    public Parking(Integer id, String location, Integer total_spots, Integer occupied_spots, String time_slot) {
        this.id = id;
        this.location = location;
        this.total_spots = total_spots;
        this.occupied_spots = occupied_spots;
        this.time_slot = time_slot;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public Integer getTotal_spots() {
        return total_spots;
    }
    public void setTotal_spots(Integer total_spots) {
        this.total_spots = total_spots;
    }
    public Integer getOccupied_spots() {
        return occupied_spots;
    }
    public void setOccupied_spots(Integer occupied_spots) {
        this.occupied_spots = occupied_spots;
    }
    public String getTime_slot() {
        return time_slot;
    }
    public void setTime_slot(String time_slot) {
        this.time_slot = time_slot;
    }

    @Override
    public String toString() {
        return "Parking{" +
                "id=" + id +
                ", location='" + location + '\'' +
                ", total_spots='" + total_spots + '\'' +
                ", occupied_spots='" + occupied_spots + '\'' +
                ", time_slot='" + time_slot + '\'' +
                '}';
    }

}
