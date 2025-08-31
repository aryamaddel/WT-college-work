package com.example.vrs.dao;

import com.example.vrs.model.Rental;

import java.util.List;

public interface RentalDAO {
    List<Rental> findAll();
    Rental findById(int id);
    void create(Rental r);
    void update(Rental r);
    void delete(int id);
}
