package com.example.vrs.web;

import com.example.vrs.dao.jdbc.JdbcRentalDAO;
import com.example.vrs.dao.jdbc.JdbcVehicleDAO;
import com.example.vrs.model.Rental;
import com.example.vrs.service.RentalService;
import com.example.vrs.service.VehicleService;
import com.example.vrs.util.DBUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;

public class RentalServlet extends HttpServlet {
    private RentalService rentals;
    private VehicleService vehicles;

    @Override
    public void init() throws ServletException {
        DBUtil db = new DBUtil(getServletContext());
        this.rentals = new RentalService(new JdbcRentalDAO(db));
        this.vehicles = new VehicleService(new JdbcVehicleDAO(db));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String path = req.getPathInfo();
        if (path == null || "/".equals(path) || "/list".equals(path)) {
            req.setAttribute("rentals", rentals.list());
            req.setAttribute("vehicles", vehicles.list());
            req.getRequestDispatcher("/WEB-INF/views/rental-list.jsp").forward(req, resp);
        } else if (path.startsWith("/new")) {
            req.setAttribute("vehicles", vehicles.list());
            req.getRequestDispatcher("/WEB-INF/views/rental-form.jsp").forward(req, resp);
        } else if (path.startsWith("/edit")) {
            int id = Integer.parseInt(req.getParameter("id"));
            req.setAttribute("rental", rentals.get(id));
            req.setAttribute("vehicles", vehicles.list());
            req.getRequestDispatcher("/WEB-INF/views/rental-form.jsp").forward(req, resp);
        } else if (path.startsWith("/delete")) {
            int id = Integer.parseInt(req.getParameter("id"));
            rentals.delete(id);
            resp.sendRedirect(req.getContextPath() + "/rentals");
        } else {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String idStr = req.getParameter("id");
        int vehicleId = Integer.parseInt(req.getParameter("vehicleId"));
        String userName = req.getParameter("userName");
        LocalDate rentalDate = LocalDate.parse(req.getParameter("rentalDate"));
        String returnDateStr = req.getParameter("returnDate");
        LocalDate returnDate = (returnDateStr == null || returnDateStr.isEmpty()) ? null : LocalDate.parse(returnDateStr);

        if (idStr == null || idStr.isEmpty()) {
            rentals.create(new Rental(vehicleId, userName, rentalDate, returnDate));
        } else {
            Rental r = new Rental(Integer.parseInt(idStr), vehicleId, userName, rentalDate, returnDate);
            rentals.update(r);
        }
        resp.sendRedirect(req.getContextPath() + "/rentals");
    }
}
