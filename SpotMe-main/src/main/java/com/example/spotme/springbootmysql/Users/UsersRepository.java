package com.example.spotme.springbootmysql.Users;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.List;
import org.springframework.jdbc.core.RowMapper;
import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UsersRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public static class UsersRowMapper implements RowMapper<Users> {
        @Override
        public Users mapRow(ResultSet resultSet,int i) throws SQLException {
            Users user = new Users();
            user.setId(resultSet.getInt("ID"));
            user.setUserName(resultSet.getString("user_name"));
            user.setUserPassword(resultSet.getString("user_password"));
            user.setFirstName(resultSet.getString("first_name"));
            user.setLastName(resultSet.getString("last_name"));
            user.setEmail(resultSet.getString("email"));
            return user;
        }



    }
    public static class LocationRowMapper implements RowMapper<Location> {
        @Override
        public Location mapRow(ResultSet resultSet,int i) throws SQLException {
            Location location = new Location();
            location.setId(resultSet.getInt("ID"));
            location.setEmail(resultSet.getString("email"));
            location.setPrice(resultSet.getString("price"));
            location.setCar_type(resultSet.getString("car_type"));
            location.setParking_name(resultSet.getString("parking_name"));
            location.setDescription(resultSet.getString("description"));
            location.setStreet(resultSet.getString("street"));
            location.setCity(resultSet.getString("city"));
            location.setState(resultSet.getString("state"));
            location.setZipcode(resultSet.getString("zipcode"));
            location.setLatitude(resultSet.getString("latitude"));
            location.setLongitude(resultSet.getString("longitude"));
            location.setPictures(resultSet.getBytes("pictures"));
            return location;
        }
    }

    public static class BookingsRowMapper implements RowMapper<Bookings> {
        @Override
        public Bookings mapRow(ResultSet resultSet,int i) throws SQLException {
            Bookings booking = new Bookings();
            booking.setId(resultSet.getInt("ID"));
            booking.setEmail(resultSet.getString("email"));
            booking.setLocation(resultSet.getString("location"));
            booking.setStart_time(resultSet.getString("start_time"));
            booking.setEnd_time(resultSet.getString("end_time"));
            booking.setParking_date(resultSet.getString("parking_date"));
            booking.setPaymentId(resultSet.getString("payment_id"));
            return booking;
        }
    }

    public static class ParkingRowMapper implements RowMapper<Parking> {
        @Override
        public Parking mapRow(ResultSet resultSet,int i) throws SQLException {
            Parking parking = new Parking();
            parking.setId(resultSet.getInt("ID"));
            parking.setLocation(resultSet.getString("location"));
            parking.setTotal_spots(resultSet.getInt("total_spots"));
            parking.setOccupied_spots(resultSet.getInt("occupied_spots"));
            parking.setTime_slot(resultSet.getString("time_slot"));
            return parking;
        }
    }
    public static class ReviewsRowMapper implements RowMapper<Reviews> {
        @Override
        public Reviews mapRow(ResultSet resultSet,int i) throws SQLException {
            Reviews reviews = new Reviews();
            reviews.setId(resultSet.getInt("ID"));
            reviews.setEmail(resultSet.getString("email"));
            reviews.setRating(resultSet.getString("rating"));
            reviews.setComments(resultSet.getString("comments"));
            return reviews;
        }
    }
    public static class CreditsRowMapper implements RowMapper<Credits> {
        @Override
        public Credits mapRow(ResultSet resultSet,int i) throws SQLException {
            Credits credits = new Credits();
            credits.setId(resultSet.getInt("ID"));
            credits.setEmail(resultSet.getString("email"));
            credits.setAmount(resultSet.getString("amount"));
            return credits;
        }
    }
    public static class ParkingReviewsRowMapper implements RowMapper<ParkingReviews> {
        @Override
        public ParkingReviews mapRow(ResultSet resultSet,int i) throws SQLException {
            ParkingReviews parkingReviews = new ParkingReviews();
            parkingReviews.setId(resultSet.getInt("ID"));
            parkingReviews.setParking_name(resultSet.getString("parking_name"));
            parkingReviews.setRating(resultSet.getString("rating"));
            return parkingReviews;
        }
    }
    public int save(Users user) {
        return jdbcTemplate.update(
                "insert into users (user_name,user_password, first_name, last_name, email) values(?,?,?,?,?)",
                user.getUserName(),user.getUserPassword(), user.getFirstName(), user.getLastName(), user.getEmail());
    }
    public List<Users> findbyUsername(String email) {
        final String sql = "SELECT * FROM users WHERE email = ?";
        List<Users> user = jdbcTemplate.query(sql, new UsersRepository.UsersRowMapper(), email);
        return user;
    }
    public List<Users> getAllUsers() {
        final String sql = "SELECT * FROM users";
        List<Users> allusers = jdbcTemplate.query(sql, new UsersRowMapper());
        return allusers;
    }
    public int updatePassword(String newPassword, String email) {
        return jdbcTemplate.update("UPDATE users SET user_password = ? WHERE email = ?", newPassword, email);
    }
    public int remove(String email) {
        return jdbcTemplate.update("DELETE FROM users WHERE email = ?", email);
    }
    public int updateProf(String email, String username, String password, String firstname, String lastname) {
        return jdbcTemplate.update("UPDATE users SET user_name = ?, user_password = ?, first_name = ?, last_name = ? WHERE email = ?", username, password, firstname, lastname, email);
    }
    public int insertLocation(Location location) throws IOException {

        return jdbcTemplate.update(
                "insert into location (email, price, car_type, parking_name, description, street, city, state, zipcode, latitude, longitude, pictures) values(?,?,?,?,?,?,?,?,?,?,?,?)",
                location.getEmail(), location.getPrice(), location.getCar_type(), location.getParking_name(), location.getDescription(), location.getStreet(), location.getCity(), location.getState(), location.getZipcode(), location.getLatitude(), location.getLongitude(), location.getPictures());
    }
    public int deleteLocation(String email, String parking_name) {
        return jdbcTemplate.update("DELETE FROM location WHERE email = ? AND parking_name = ?", email, parking_name);
    }
    public int updateLocation(String email, String price, String car_type, String parking_name, String description) {
        return jdbcTemplate.update("UPDATE location SET price = ?, car_type = ?, parking_name = ?, description = ? WHERE email = ?", price, car_type, parking_name, description, email);
    }
    public List<Location> getLocation(String email, String parking_name) {
        final String sql = "SELECT * FROM location WHERE email = ? AND parking_name = ?";
        List<Location> location = jdbcTemplate.query(sql, new UsersRepository.LocationRowMapper(), email, parking_name);
        return location;
    }
    public List<Location> getLocationByEmail(String email) {
        final String sql = "SELECT * FROM location WHERE email = ?";
        List<Location> location = jdbcTemplate.query(sql, new UsersRepository.LocationRowMapper(), email);
        return location;
    }
    public int insertBooking(Bookings booking) {
        return jdbcTemplate.update(
                "insert into Bookings (email, location, start_time, end_time, parking_date,payment_id) values(?,?,?,?,?,?)",
                booking.getEmail(), booking.getLocation(), booking.getStart_time(), booking.getEnd_time(), booking.getParking_date(),booking.getPaymentId());
    }

    public List<Bookings> findBookings(String email) {
        final String sql = "SELECT * FROM Bookings WHERE email = ?";
        List<Bookings> spots = jdbcTemplate.query(sql, new UsersRepository.BookingsRowMapper(), email);
        return spots;
    }

    public List<Bookings> findDateBookings(String location, String parking_date) {
        final String sql = "SELECT * FROM Bookings WHERE location = ? AND parking_date = ?";
        List<Bookings> spots = jdbcTemplate.query(sql, new UsersRepository.BookingsRowMapper(), location,parking_date);
        return spots;
    }
    public int deleteBooking(String email, String location, String start_time, String end_time, String parking_date) {
        return jdbcTemplate.update("DELETE FROM Bookings WHERE email = ? AND location = ? AND start_time = ? AND end_time = ? AND parking_date = ?", email, location, start_time, end_time, parking_date);
    }
    public List<Location> getNearbyListings() {
        final String sql = "SELECT * FROM location";
        List<Location> spots = jdbcTemplate.query(sql, new UsersRepository.LocationRowMapper());
        return spots;
    }
    public int insertImage(byte[] data, String email) {
        return jdbcTemplate.update(
                "UPDATE location SET pictures = ? WHERE email = ?",
                data, email);
    }
    public int addReviews(Reviews reviews) {
        return jdbcTemplate.update(
                "insert into Reviews (email,rating, comments) values(?,?,?)",
                reviews.getEmail(),reviews.getRating(), reviews.getComments());
    }
    public List<Reviews> getReviews() {
        final String sql = "SELECT * FROM Reviews";
        List<Reviews> reviews = jdbcTemplate.query(sql, new UsersRepository.ReviewsRowMapper());
        return reviews;
    }
    public int addCredits(String email) {
        String money = "100";
        return jdbcTemplate.update(
                "insert into Credits (email,amount) values(?,?)",
                email, money);
    }
    public int getCredits(String email) {
        final String sql = "SELECT * FROM Credits WHERE email = ?";
        List<Credits> credits = jdbcTemplate.query(sql, new UsersRepository.CreditsRowMapper(), email);
        int ret = Integer.parseInt(credits.get(0).getAmount());
        return ret;
    }
    public int updateCredits(String email, String amount) {
        return jdbcTemplate.update("UPDATE Credits SET amount = ? WHERE email = ?", amount, email);
    }
    public int addParkingReviews(ParkingReviews parkingReviews) {
        return jdbcTemplate.update(
                "insert into ParkingReviews (parking_name,rating) values(?,?)",
                parkingReviews.getParking_name(), parkingReviews.getRating());
    }
    public List<ParkingReviews> getParkingReviews(String parking_name) {
        final String sql = "SELECT * FROM ParkingReviews WHERE parking_name = ?";
        List<ParkingReviews> parkingReviews = jdbcTemplate.query(sql, new UsersRepository.ParkingReviewsRowMapper(), parking_name);
        return parkingReviews;
    }

    public int saveAuth(Auth auth) {
        return jdbcTemplate.update(
                "insert into auth (email,password,token,verified) values(?,?,?,?)",
                auth.getEmail(),auth.getPassword(), auth.getToken(),auth.isCreated());
    }

    public int updateIsCreated(Auth auth) {
        return jdbcTemplate.update(
                "update auth set verified = ? where email = ?",
                auth.isCreated(), auth.getEmail());
    }


    public Optional<Auth> findbyEmail(String email) {
        final String sql = "SELECT * FROM auth WHERE email = ?";
        List<Auth> authList = jdbcTemplate.query(sql, new RowMapper<Auth>() {
            @Override
            public Auth mapRow(ResultSet resultSet, int i) throws SQLException {
                Auth auth = new Auth();
                auth.setId(resultSet.getInt("ID"));
                auth.setEmail(resultSet.getString("email"));
                auth.setPassword(resultSet.getString("password"));
                auth.setToken(resultSet.getString("token"));
                auth.setCreated(resultSet.getBoolean("verified"));
                return auth;
            }
        }, email);

        return authList.isEmpty() ? Optional.empty() : Optional.of(authList.get(0));
    }

    public class PaymentsDetailsRowMapper implements RowMapper<PaymentsDetails> {
        @Override
        public PaymentsDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
            PaymentsDetails payment = new PaymentsDetails();
            payment.setId(rs.getInt("id"));

            // Convert java.sql.Time to java.time.LocalTime
            Time sqlTime = rs.getTime("time");
            if (sqlTime != null) {
                payment.setTime(sqlTime.toLocalTime());
            }

            payment.setAmount(BigDecimal.valueOf(rs.getDouble("amount")));
            payment.setPaymentStatus(rs.getString("status"));
            payment.setDate(rs.getDate("date"));
            payment.setPaymentId(rs.getString("payment_id"));
            return payment;
        }
    }


    public void savePaymentDetails(PaymentsDetails payment) {
        String sql = "INSERT INTO payments (time, amount, status, date, payment_id) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, payment.getTime(), payment.getAmount(), payment.getPaymentStatus(),
                payment.getDate(), payment.getPaymentId());
    }



}
 