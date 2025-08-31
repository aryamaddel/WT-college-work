package com.example.vrs.dao.jdbc;

import com.example.vrs.dao.RentalDAO;
import com.example.vrs.model.Rental;
import com.example.vrs.util.DBUtil;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class JdbcRentalDAO implements RentalDAO {
    private final DBUtil db;

    public JdbcRentalDAO(DBUtil db) { this.db = db; }

    @Override
    public List<Rental> findAll() {
        List<Rental> list = new ArrayList<>();
        String sql = "SELECT id, vehicle_id, user_name, rental_date, return_date FROM rentals ORDER BY id";
        try (Connection conn = db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql); ResultSet rs = ps.executeQuery()) {
            while (rs.next()) list.add(map(rs));
        } catch (SQLException e) { throw new RuntimeException(e); }
        return list;
    }

    @Override
    public Rental findById(int id) {
        String sql = "SELECT id, vehicle_id, user_name, rental_date, return_date FROM rentals WHERE id=?";
        try (Connection conn = db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { if (rs.next()) return map(rs); }
        } catch (SQLException e) { throw new RuntimeException(e); }
        return null;
    }

    @Override
    public void create(Rental r) {
        String sql = "INSERT INTO rentals(vehicle_id, user_name, rental_date, return_date) VALUES(?,?,?,?)";
        try (Connection conn = db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, r.getVehicleId());
            ps.setString(2, r.getUserName());
            ps.setDate(3, Date.valueOf(r.getRentalDate()));
            if (r.getReturnDate() != null) {
                ps.setDate(4, Date.valueOf(r.getReturnDate()));
            } else {
                ps.setNull(4, Types.DATE);
            }
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) { if (keys.next()) r.setId(keys.getInt(1)); }
        } catch (SQLException e) { throw new RuntimeException(e); }
    }

    @Override
    public void update(Rental r) {
        String sql = "UPDATE rentals SET vehicle_id=?, user_name=?, rental_date=?, return_date=? WHERE id=?";
        try (Connection conn = db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, r.getVehicleId());
            ps.setString(2, r.getUserName());
            ps.setDate(3, Date.valueOf(r.getRentalDate()));
            if (r.getReturnDate() != null) {
                ps.setDate(4, Date.valueOf(r.getReturnDate()));
            } else {
                ps.setNull(4, Types.DATE);
            }
            ps.setInt(5, r.getId());
            ps.executeUpdate();
        } catch (SQLException e) { throw new RuntimeException(e); }
    }

    @Override
    public void delete(int id) {
        String sql = "DELETE FROM rentals WHERE id=?";
        try (Connection conn = db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { throw new RuntimeException(e); }
    }

    private Rental map(ResultSet rs) throws SQLException {
        Date ret = rs.getDate("return_date");
        LocalDate retDate = ret != null ? ret.toLocalDate() : null;
        return new Rental(
                rs.getInt("id"),
                rs.getInt("vehicle_id"),
                rs.getString("user_name"),
                rs.getDate("rental_date").toLocalDate(),
                retDate
        );
    }
}
