package com.example.vrs.util;

import javax.servlet.ServletContext;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBUtil {
    private final String url;
    private final String user;
    private final String password;
    private final String driver;

    public DBUtil(ServletContext context) {
        try {
            String path = context.getInitParameter("jdbc.config");
            Properties props = new Properties();
            try (InputStream is = context.getResourceAsStream(path)) {
                if (is == null) {
                    throw new IllegalStateException("database.properties not found at " + path);
                }
                props.load(is);
            }
            this.url = props.getProperty("jdbc.url");
            this.user = props.getProperty("jdbc.user");
            this.password = props.getProperty("jdbc.password");
            this.driver = props.getProperty("jdbc.driver");
            Class.forName(driver);
        } catch (Exception e) {
            throw new RuntimeException("Failed to init DBUtil", e);
        }
    }

    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }
}
