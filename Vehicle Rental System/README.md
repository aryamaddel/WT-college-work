# Vehicle Rental System (JDBC + Servlets + Jetty)

A simple MVC Java web app using Servlets/JSP and JDBC to perform CRUD on Vehicles and Rentals. Runs quickly using the Jetty Maven plugin.

## Features
- MVC: Servlets (controllers), JSP/JSTL (views), DAO/service (model)
- JDBC connectivity to MySQL or PostgreSQL
- CRUD for Vehicles and Rentals
- Minimal, clean UI

## Prerequisites
- Java 8+ (JDK)
- Maven 3.8+
- MySQL or PostgreSQL running locally with the following schema

## Database schema
```sql
CREATE DATABASE vehicle_rental;
USE vehicle_rental;

CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    status VARCHAR(20)
);

CREATE TABLE rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    user_name VARCHAR(100),
    rental_date DATE,
    return_date DATE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);
```

For PostgreSQL, adapt types and identity to:
```sql
CREATE DATABASE vehicle_rental;
\c vehicle_rental;
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    status VARCHAR(20)
);
CREATE TABLE rentals (
    id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES vehicles(id),
    user_name VARCHAR(100),
    rental_date DATE,
    return_date DATE
);
```

## Configure database
Edit `src/main/webapp/WEB-INF/database.properties` with your DB, username, and password. For MySQL, the default is pre-filled; for PostgreSQL, comment/uncomment accordingly.

## Run on Jetty
Windows (cmd.exe):

```
mvn -q clean package
mvn -q jetty:run
```

Then open http://localhost:8080/

## Endpoints
- `/vehicles` - list, add, edit, delete vehicles
- `/rentals` - list, add, edit, delete rentals

## Notes
- This sample uses basic JDBC without connection pooling for clarity. For production, use a pool (e.g., HikariCP) and JNDI DataSource.
- Input validation is minimal; add as needed.

## Project layout
- `com.example.vrs.web` - Servlets
- `com.example.vrs.service` - Services
- `com.example.vrs.dao` - DAO interfaces
- `com.example.vrs.dao.jdbc` - JDBC implementations
- `com.example.vrs.model` - Entities
- `src/main/webapp/WEB-INF/views` - JSP views

## Switching DB driver
Both MySQL and PostgreSQL drivers are included at runtime. Point `database.properties` to the DB you want to use and ensure the corresponding server is running.

## Troubleshooting
- If Jetty fails to start with port in use, change port in `pom.xml` (`jetty-maven-plugin` configuration).
- If you get `Access denied` or `authentication failed`, verify credentials in `database.properties` and that the DB user has rights to `vehicle_rental`.
- If you see date parse errors, ensure the HTML `date` fields submit in `YYYY-MM-DD`.

---
Made for quick demos and coursework.