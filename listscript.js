// Change background image every 5 minutes
let bgState = true;
setInterval(() => {
    document.body.style.backgroundImage = `url(${bgState ? '/images/worker.jpg' : '/images/payment.jpg'})`;
    bgState = !bgState;
}, 300000); // 5 minutes

function populateEmployeeList() {
    const employeeTable = document.getElementById('employeeTable');
    const employees = JSON.parse(localStorage.getItem('employeeList')) || [];
    const tableBody = employeeTable.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    employees.forEach((emp, index) => {
        const photoSrc = emp.photo || 'images/default-photo.jpg'; // Use base64 or default
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>
                <img src="${photoSrc}" alt="Photo" class="employee-photo" style="width:100px; height:100px; object-fit:cover;">
            </td>
            <td>${emp.name}</td>
            <td>${emp.id}</td>
            <td>${emp.phone}</td>
            <td>${emp.role}</td>
            <td>
                <button onclick="viewEmployee(${index})">View</button>
                <button onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;
    });
}

function viewEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employeeList')) || [];
    if (employees[index]) {
        const employeeId = employees[index].id;
        window.location.href = `view-employee.html?id=${encodeURIComponent(employeeId)}`;
    } else {
        alert('Employee not found!');
    }
}

function deleteEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employeeList')) || [];
    if (confirm(`Are you sure you want to delete ${employees[index]?.name}?`)) {
        employees.splice(index, 1);
        localStorage.setItem('employeeList', JSON.stringify(employees));
        populateEmployeeList();
    }
}

// Initialize the Employee List Page
document.addEventListener('DOMContentLoaded', populateEmployeeList);
