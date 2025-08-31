<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Vehicle Rental System</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simpledotcss/simple.min.css">
</head>
<body>
<header>
    <h1>Vehicle Rental System</h1>
    <nav>
        <a href="<%=request.getContextPath()%>/vehicles">Vehicles</a>
        <a href="<%=request.getContextPath()%>/rentals">Rentals</a>
    </nav>
    <hr>
</header>
<main>
    <p>Use the navigation to manage vehicles and rentals.</p>
</main>
</body>
</html>
