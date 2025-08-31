package com.example.vrs.model;

import java.time.LocalDate;

public class Rental {
    private int id;
    private int vehicleId;
    private String userName;
    private LocalDate rentalDate;
    private LocalDate returnDate;

    public Rental() {}

    public Rental(int id, int vehicleId, String userName, LocalDate rentalDate, LocalDate returnDate) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.userName = userName;
        this.rentalDate = rentalDate;
        this.returnDate = returnDate;
    }

    public Rental(int vehicleId, String userName, LocalDate rentalDate, LocalDate returnDate) {
        this.vehicleId = vehicleId;
        this.userName = userName;
        this.rentalDate = rentalDate;
        this.returnDate = returnDate;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getVehicleId() { return vehicleId; }
    public void setVehicleId(int vehicleId) { this.vehicleId = vehicleId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public LocalDate getRentalDate() { return rentalDate; }
    public void setRentalDate(LocalDate rentalDate) { this.rentalDate = rentalDate; }

    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate returnDate) { this.returnDate = returnDate; }
}
