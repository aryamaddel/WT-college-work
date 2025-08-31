<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>${empty rental ? 'Add Rental' : 'Edit Rental'}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simpledotcss/simple.min.css">
</head>
<body>
<h2>${empty rental ? 'Add Rental' : 'Edit Rental'}</h2>
<p><a href="${pageContext.request.contextPath}/rentals">Back</a></p>
<form method="post" action="${pageContext.request.contextPath}/rentals">
    <c:if test="${not empty rental}">
        <input type="hidden" name="id" value="${rental.id}"/>
    </c:if>
    <label>Vehicle
        <select name="vehicleId" required>
            <c:forEach items="${vehicles}" var="v">
                <option value="${v.id}" ${not empty rental && rental.vehicleId == v.id ? 'selected' : ''}>${v.name} (${v.type})</option>
            </c:forEach>
        </select>
    </label>
    <label>User Name <input type="text" name="userName" value="${rental.userName}" required/></label>
    <label>Rental Date <input type="date" name="rentalDate" value="${rental.rentalDate}" required/></label>
    <label>Return Date <input type="date" name="returnDate" value="${rental.returnDate}"/></label>
    <button type="submit">Save</button>
 </form>
</body>
</html>
