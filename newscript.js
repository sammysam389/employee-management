function saveEmployee() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;
    const fileInput = document.getElementById('photo');
    let photoBase64 = null;

    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const fileReader = new FileReader();

        fileReader.onload = function (e) {
            photoBase64 = e.target.result; // Base64 image data
            saveToStorage(name, id, phone, role, photoBase64);
        };
        fileReader.readAsDataURL(file); // Convert file to base64
    } else {
        saveToStorage(name, id, phone, role, photoBase64);
    }
}

function saveToStorage(name, id, phone, role, photo) {
    if (!name || !id || !phone || !role) {
        alert('Please fill all required fields.');
        return;
    }

    const newEmployee = { photo, name, id, phone, role };
    const employees = JSON.parse(localStorage.getItem('employeeList')) || [];
    employees.push(newEmployee);
    localStorage.setItem('employeeList', JSON.stringify(employees));

    alert('Employee added successfully!');
    location.href = 'employee-list.html'; // Redirect to employee list page
}
