package com.example.vrs.service;

import com.example.vrs.dao.RentalDAO;
import com.example.vrs.model.Rental;

import java.util.List;

public class RentalService {
    private final RentalDAO dao;
    public RentalService(RentalDAO dao) { this.dao = dao; }
    public List<Rental> list() { return dao.findAll(); }
    public Rental get(int id) { return dao.findById(id); }
    public void create(Rental r) { dao.create(r); }
    public void update(Rental r) { dao.update(r); }
    public void delete(int id) { dao.delete(id); }
}
