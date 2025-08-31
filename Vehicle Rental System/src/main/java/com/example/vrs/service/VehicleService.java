package com.example.vrs.service;

import com.example.vrs.dao.VehicleDAO;
import com.example.vrs.model.Vehicle;

import java.util.List;

public class VehicleService {
    private final VehicleDAO dao;
    public VehicleService(VehicleDAO dao) { this.dao = dao; }
    public List<Vehicle> list() { return dao.findAll(); }
    public Vehicle get(int id) { return dao.findById(id); }
    public void create(Vehicle v) { dao.create(v); }
    public void update(Vehicle v) { dao.update(v); }
    public void delete(int id) { dao.delete(id); }
}
