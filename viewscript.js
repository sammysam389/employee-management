// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to populate employee details
function populateEmployeeDetails() {
    const employees = JSON.parse(localStorage.getItem('employeeList')) || [];
    const employeeId = getQueryParam('id'); // Get the 'id' from the URL

    // Find the employee based on the ID
    const employee = employees.find(emp => emp.id === employeeId);

    if (employee) {
        const detailsContainer = document.getElementById('employeeDetails');
        detailsContainer.innerHTML = `
            <img src="${employee.photo || 'default-photo.jpg'}" alt="Employee Photo" class="employee-photo">
            <p><strong>Name:</strong> ${employee.name}</p>
            <p><strong>ID/Passport No:</strong> ${employee.id}</p>
            <p><strong>Phone:</strong> ${employee.phone}</p>
            <p><strong>Role:</strong> ${employee.role}</p>
        `;
    } else {
        document.getElementById('employeeDetails').innerHTML = `
            <p>Employee not found.</p>
        `;
    }
}

// Go back to the employee list
function goBack() {
    window.location.href = 'employee-list.html';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', populateEmployeeDetails);
