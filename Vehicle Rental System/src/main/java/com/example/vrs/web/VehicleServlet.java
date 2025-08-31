package com.example.vrs.web;

import com.example.vrs.dao.jdbc.JdbcVehicleDAO;
import com.example.vrs.model.Vehicle;
import com.example.vrs.service.VehicleService;
import com.example.vrs.util.DBUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class VehicleServlet extends HttpServlet {
    private VehicleService service;

    @Override
    public void init() throws ServletException {
        DBUtil db = new DBUtil(getServletContext());
        this.service = new VehicleService(new JdbcVehicleDAO(db));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String path = req.getPathInfo();
        if (path == null || "/".equals(path) || "/list".equals(path)) {
            req.setAttribute("vehicles", service.list());
            req.getRequestDispatcher("/WEB-INF/views/vehicle-list.jsp").forward(req, resp);
        } else if (path.startsWith("/new")) {
            req.getRequestDispatcher("/WEB-INF/views/vehicle-form.jsp").forward(req, resp);
        } else if (path.startsWith("/edit")) {
            int id = Integer.parseInt(req.getParameter("id"));
            req.setAttribute("vehicle", service.get(id));
            req.getRequestDispatcher("/WEB-INF/views/vehicle-form.jsp").forward(req, resp);
        } else if (path.startsWith("/delete")) {
            int id = Integer.parseInt(req.getParameter("id"));
            service.delete(id);
            resp.sendRedirect(req.getContextPath() + "/vehicles");
        } else {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String idStr = req.getParameter("id");
        String name = req.getParameter("name");
        String type = req.getParameter("type");
        String status = req.getParameter("status");

        if (idStr == null || idStr.isEmpty()) {
            service.create(new Vehicle(name, type, status));
        } else {
            Vehicle v = new Vehicle(Integer.parseInt(idStr), name, type, status);
            service.update(v);
        }
        resp.sendRedirect(req.getContextPath() + "/vehicles");
    }
}
