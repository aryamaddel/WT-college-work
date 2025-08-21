package com.example.feedback;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

public class FeedbackServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding(StandardCharsets.UTF_8.name());
        resp.setCharacterEncoding(StandardCharsets.UTF_8.name());
        resp.setContentType("text/html; charset=UTF-8");

        String name = trim(req.getParameter("name"));
        String email = trim(req.getParameter("email"));
        String ratingStr = trim(req.getParameter("rating"));
        String comments = trim(req.getParameter("comments"));

        String error = validate(name, email, ratingStr, comments);
        if (error != null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            try (PrintWriter out = resp.getWriter()) {
                out.println("<!doctype html>");
                out.println("<html lang='en'><head><meta charset='utf-8'><title>Invalid Feedback</title>");
                out.println(style());
                out.println("</head><body><div class='card'>");
                out.println("<h1>There was a problem with your submission</h1>");
                out.printf("<p class='error'>%s</p>", escapeHtml(error));
                out.println("<a class='btn' href='/'>&larr; Go back</a>");
                out.println("</div></body></html>");
            }
            return;
        }

        int rating = Integer.parseInt(ratingStr);
        // Log feedback to server console (visible in VS Code terminal running Jetty)
        System.out.printf(
                "[Feedback] name=%s, email=%s, rating=%d, comments=%s%n",
                safeLog(name), safeLog(email), rating, safeLog(comments));
        try (PrintWriter out = resp.getWriter()) {
            out.println("<!doctype html>");
            out.println("<html lang='en'><head><meta charset='utf-8'><title>Thank You</title>");
            out.println(style());
            out.println("</head><body><div class='card'>");
            out.println("<h1>Thank you for your feedback!</h1>");
            out.printf("<p>We appreciate your input, <strong>%s</strong>.</p>", escapeHtml(name));
            out.println("<dl class='summary'>");
            out.printf("<dt>Email</dt><dd>%s</dd>", escapeHtml(email));
            out.printf("<dt>Rating</dt><dd>%d / 5</dd>", rating);
            out.printf("<dt>Comments</dt><dd>%s</dd>",
                    comments == null || comments.isEmpty() ? "(none)" : escapeHtml(comments));
            out.println("</dl>");
            out.println("<a class='btn' href='/'>&larr; Submit another</a>");
            out.println("</div></body></html>");
        }
    }

    private static String trim(String s) {
        return s == null ? null : s.trim();
    }

    private static String validate(String name, String email, String rating, String comments) {
        if (name == null || name.isEmpty())
            return "Name is required.";
        if (email == null || email.isEmpty())
            return "Email is required.";
        if (!email.matches("^[^@\n\r]+@[^@\n\r]+\\.[^@\n\r]+$"))
            return "Email format looks invalid.";
        if (rating == null || rating.isEmpty())
            return "Rating is required.";
        try {
            int r = Integer.parseInt(rating);
            if (r < 1 || r > 5)
                return "Rating must be between 1 and 5.";
        } catch (NumberFormatException e) {
            return "Rating must be a number between 1 and 5.";
        }
        if (name.length() > 100)
            return "Name is too long.";
        if (email.length() > 200)
            return "Email is too long.";
        if (comments != null && comments.length() > 1000)
            return "Comments are too long.";
        return null;
    }

    private static String style() {
        // Minimal theme with thin borders to match index.html
        return "<style>"
                + ":root{--bg:#fafafa;--card-bg:#ffffff;--border:#e5e7eb;--text:#111827;--muted:#6b7280;--focus:#111827}"
                + "body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);margin:24px}"
                + ".card{max-width:680px;margin:0 auto;background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:20px}"
                + "h1{margin:0 0 8px;font-size:1.4rem;font-weight:600}.summary{margin:16px 0}dt{font-weight:700}dd{margin:0 0 10px}"
                + ".btn{display:inline-block;margin-top:16px;background:#fff;color:var(--text);border:1px solid var(--border);padding:9px 14px;border-radius:6px;text-decoration:none;font-weight:600}"
                + ".btn:hover{background:#f3f4f6}.error{color:#b91c1c;font-weight:600}"
                + "</style>";
    }

    private static String safeLog(String s) {
        if (s == null)
            return "";
        // Collapse newlines and trim; limit length for tidy logs
        String collapsed = s.replaceAll("\r\n|\r|\n", " ").trim();
        if (collapsed.length() > 300) {
            return collapsed.substring(0, 300) + "…";
        }
        return collapsed;
    }

    private static String escapeHtml(String s) {
        if (s == null)
            return "";
        return s
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;");
    }
}
