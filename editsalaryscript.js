document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#editSalaryForm");

    const employeeId = localStorage.getItem("editingEmployeeId");

    if (!employeeId) {
        alert("No employee selected!");
        window.location.href = "employee-list.html";
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const salaryData = {
            salaryAmount: document.querySelector("#salaryAmount").value,
            deductions: document.querySelector("#deductions").value,
            salaryAfterDeduction: document.querySelector("#salaryAmount").value - document.querySelector("#deductions").value,
            payDay: document.querySelector("#payDay").value,
            status: document.querySelector("#status").value,
            paymentType: document.querySelector("#paymentType").value,
        };

        // Save data to salary page (you can use a database or localStorage)
        localStorage.setItem(`salary_${employeeId}`, JSON.stringify(salaryData));

        alert("Salary details updated successfully!");
        window.location.href = "employee-salary.html";
    });
});
