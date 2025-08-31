package com.example.vrs.dao;

import com.example.vrs.model.Vehicle;

import java.util.List;

public interface VehicleDAO {
    List<Vehicle> findAll();
    Vehicle findById(int id);
    void create(Vehicle v);
    void update(Vehicle v);
    void delete(int id);
}
