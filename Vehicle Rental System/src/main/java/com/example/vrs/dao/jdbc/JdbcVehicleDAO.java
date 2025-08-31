package com.example.vrs.dao.jdbc;

import com.example.vrs.dao.VehicleDAO;
import com.example.vrs.model.Vehicle;
import com.example.vrs.util.DBUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class JdbcVehicleDAO implements VehicleDAO {
    private final DBUtil db;

    public JdbcVehicleDAO(DBUtil db) { this.db = db; }

    @Override
    public List<Vehicle> findAll() {
        List<Vehicle> list = new ArrayList<>();
        String sql = "SELECT id, name, type, status FROM vehicles ORDER BY id";
        try (Connection conn = db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(map(rs));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return list;
    }

    @Override
    public Vehicle findById(int id) {
        String sql = "SELECT id, name, type, status FROM vehicles WHERE id=?";
        try (Connection conn = db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return map(rs);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public void create(Vehicle v) {
        String sql = "INSERT INTO vehicles(name, type, status) VALUES(?,?,?)";
        try (Connection conn = db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, v.getName());
            ps.setString(2, v.getType());
            ps.setString(3, v.getStatus());
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) v.setId(keys.getInt(1));
            }
        } catch (SQLException e) { throw new RuntimeException(e); }
    }

    @Override
    public void update(Vehicle v) {
        String sql = "UPDATE vehicles SET name=?, type=?, status=? WHERE id=?";
        try (Connection conn = db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, v.getName());
            ps.setString(2, v.getType());
            ps.setString(3, v.getStatus());
            ps.setInt(4, v.getId());
            ps.executeUpdate();
        } catch (SQLException e) { throw new RuntimeException(e); }
    }

    @Override
    public void delete(int id) {
        String sql = "DELETE FROM vehicles WHERE id=?";
        try (Connection conn = db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { throw new RuntimeException(e); }
    }

    private Vehicle map(ResultSet rs) throws SQLException {
        return new Vehicle(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("type"),
                rs.getString("status")
        );
    }
}
