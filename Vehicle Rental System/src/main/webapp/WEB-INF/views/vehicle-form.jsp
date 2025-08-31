<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>${empty vehicle ? 'Add Vehicle' : 'Edit Vehicle'}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simpledotcss/simple.min.css">
</head>
<body>
<h2>${empty vehicle ? 'Add Vehicle' : 'Edit Vehicle'}</h2>
<p><a href="${pageContext.request.contextPath}/vehicles">Back</a></p>
<form method="post" action="${pageContext.request.contextPath}/vehicles">
    <c:if test="${not empty vehicle}">
        <input type="hidden" name="id" value="${vehicle.id}"/>
    </c:if>
    <label>Name <input type="text" name="name" value="${vehicle.name}" required/></label>
    <label>Type <input type="text" name="type" value="${vehicle.type}" required/></label>
    <label>Status
        <select name="status" required>
            <c:set var="st" value="${empty vehicle ? 'available' : vehicle.status}"/>
            <option value="available" ${st=='available' ? 'selected' : ''}>available</option>
            <option value="rented" ${st=='rented' ? 'selected' : ''}>rented</option>
            <option value="maintenance" ${st=='maintenance' ? 'selected' : ''}>maintenance</option>
        </select>
    </label>
    <button type="submit">Save</button>
 </form>
</body>
</html>
