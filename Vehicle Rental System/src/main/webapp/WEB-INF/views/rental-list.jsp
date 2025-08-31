<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Rentals</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simpledotcss/simple.min.css">
    <script>
        function vehicleName(id){
            const map = {};
            // build map from JSP scope
            return map[id] || id;
        }
    </script>
</head>
<body>
<h2>Rentals</h2>
<p>
    <a href="${pageContext.request.contextPath}/">Home</a> |
    <a href="${pageContext.request.contextPath}/rentals/new">Add Rental</a>
 </p>
<table>
    <thead>
    <tr><th>ID</th><th>Vehicle ID</th><th>User</th><th>Rental Date</th><th>Return Date</th><th>Actions</th></tr>
    </thead>
    <tbody>
    <c:forEach items="${rentals}" var="r">
        <tr>
            <td>${r.id}</td>
            <td>${r.vehicleId}</td>
            <td>${r.userName}</td>
            <td>${r.rentalDate}</td>
            <td><c:out value="${r.returnDate}" default="-"/></td>
            <td>
                <a href="${pageContext.request.contextPath}/rentals/edit?id=${r.id}">Edit</a>
                <a href="${pageContext.request.contextPath}/rentals/delete?id=${r.id}" onclick="return confirm('Delete?')">Delete</a>
            </td>
        </tr>
    </c:forEach>
    </tbody>
 </table>
</body>
</html>
