<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Vehicles</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simpledotcss/simple.min.css">
</head>
<body>
<h2>Vehicles</h2>
<p>
    <a href="${pageContext.request.contextPath}/">Home</a> |
    <a href="${pageContext.request.contextPath}/vehicles/new">Add Vehicle</a>
 </p>
<table>
    <thead>
    <tr><th>ID</th><th>Name</th><th>Type</th><th>Status</th><th>Actions</th></tr>
    </thead>
    <tbody>
    <c:forEach items="${vehicles}" var="v">
        <tr>
            <td>${v.id}</td>
            <td>${v.name}</td>
            <td>${v.type}</td>
            <td>${v.status}</td>
            <td>
                <a href="${pageContext.request.contextPath}/vehicles/edit?id=${v.id}">Edit</a>
                <a href="${pageContext.request.contextPath}/vehicles/delete?id=${v.id}" onclick="return confirm('Delete?')">Delete</a>
            </td>
        </tr>
    </c:forEach>
    </tbody>
 </table>
</body>
</html>
