document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#salaryTable tbody");
    const editModal = document.getElementById("editModal");
    const form = document.getElementById("editSalaryForm");

    let editingEmployeeId = null;

    // Populate table
    employees.forEach(employee => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${employee.photo}" alt="${employee.name}" width="50"></td>
            <td>${employee.name}</td>
            <td>${employee.id}</td>
            <td>${employee.phone}</td>
            <td>${employee.salaryAmount}</td>
            <td>${employee.deductions}</td>
            <td>${employee.salaryAmount - employee.deductions}</td>
            <td>${employee.payDay}</td>
            <td>${employee.status}</td>
            <td>${employee.paymentType}</td>
            <td>
                <button onclick="editSalary('${employee.id}')">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Open modal and populate form
    window.editSalary = (employeeId) => {
        editingEmployeeId = employeeId;

        const employee = employees.find(emp => emp.id === employeeId);
        if (!employee) return;

        document.getElementById("salaryAmount").value = employee.salaryAmount;
        document.getElementById("deductions").value = employee.deductions;
        document.getElementById("salaryAfterDeduction").value = employee.salaryAmount - employee.deductions;
        document.getElementById("payDay").value = employee.payDay;
        document.getElementById("status").value = employee.status;
        document.getElementById("paymentType").value = employee.paymentType;

        editModal.style.display = "block";
    };

    // Close modal
    window.closeModal = () => {
        editModal.style.display = "none";
    };

    // Update data
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const employee = employees.find(emp => emp.id === editingEmployeeId);
        if (!employee) return;

        employee.salaryAmount = parseFloat(document.getElementById("salaryAmount").value);
        employee.deductions = parseFloat(document.getElementById("deductions").value);
        employee.payDay = document.getElementById("payDay").value;
        employee.status = document.getElementById("status").value;
        employee.paymentType = document.getElementById("paymentType").value;

        // Recalculate salary after deduction
        employee.salaryAfterDeduction = employee.salaryAmount - employee.deductions;

        // Update the table
        tableBody.innerHTML = ""; // Clear and re-render
        employees.forEach(emp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${emp.photo}" alt="${emp.name}" width="50"></td>
                <td>${emp.name}</td>
                <td>${emp.id}</td>
                <td>${emp.phone}</td>
                <td>${emp.salaryAmount}</td>
                <td>${emp.deductions}</td>
                <td>${emp.salaryAmount - emp.deductions}</td>
                <td>${emp.payDay}</td>
                <td>${emp.status}</td>
                <td>${emp.paymentType}</td>
                <td>
                    <button onclick="editSalary('${emp.id}')">Edit</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        closeModal();
    });
});
