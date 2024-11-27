// Function to initialize the table
function allData() {
    const table = document.getElementById("table");
    table.innerHTML = ``;

    // Fetch the list of contacts from localStorage
    const contactList = JSON.parse(localStorage.getItem("listItem")) ?? [];

    // Build table dynamically
    contactList.forEach(function (value, i) {
        table.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${value.name}</td>
            <td>${value.stdId}</td>
            <td>${value.stdClass}</td>
            <td>${value.rollNo}</td>
            <td>${value.email}</td>
            <td>${value.contactNo}</td>
            <td>
                <button class="btn btn-sm btn-success" onclick="find(${value.id})">
                    <i class="fa fa-edit"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeData(${value.id})">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });
}


// Function to save student data
function save() {
    // Fetch the list of contacts from localStorage
    let contactList = JSON.parse(localStorage.getItem("listItem")) ?? [];

    // Determine the next ID
    var id = contactList.length ? contactList[contactList.length - 1].id : 0;

    // Validate form fields
    const name = document.getElementById('name').value;
    const stdId = document.getElementById('stdId').value;
    const stdClass = document.getElementById('stdClass').value;
    const rollNo = document.getElementById('rollNo').value;
    const email = document.getElementById('email').value;
    const contactNo = document.getElementById('contactNo').value;

    // Validation for required fields
    if (!name || !stdId || !stdClass || !rollNo || !email || !contactNo) {
        alert("Please fill in all the fields.");
        return;
    }

    // Validation for ID and contact number to accept only numbers
    if (isNaN(stdId) || isNaN(contactNo) || isNaN(rollNo)) {
        alert("Student ID, roll number and Contact Number must be numeric.");
        return;
    }

    // Validation for name to accept only characters
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Student name must contain only letters.");
        return;
    }

    // Validation for email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (document.getElementById('id').value) {
        // Update existing records
        contactList.forEach((value) => {
            if (document.getElementById('id').value == value.id) {
                value.name = name;
                value.stdId = stdId;
                value.stdClass = stdClass;
                value.rollNo = rollNo;
                value.email = email;
                value.contactNo = contactNo;
            }
        });

        document.getElementById('id').value = ""; // Reset hidden field 
    } else {
        // Add new record
        var item = {
            id: id + 1,
            name: name,
            stdId: stdId,
            stdClass: stdClass,
            rollNo: rollNo,
            email: email,
            contactNo: contactNo
        }

        contactList.push(item);
    }

    // Save updated contact list to localStorage
    localStorage.setItem('listItem', JSON.stringify(contactList));

    // Refresh the table
    allData();

    // Reset the form
    document.getElementById('form').reset();
}


// Function to find and populate student data in the form
function find(id) {
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? [];

    // Find the contact by ID and populate the form fields
    contactList.forEach(function (value) {
        if (value.id == id) {
            document.getElementById('id').value = value.id;
            document.getElementById('name').value = value.name;
            document.getElementById('stdId').value = value.stdId;
            document.getElementById('stdClass').value = value.stdClass;
            document.getElementById('rollNo').value = value.rollNo;
            document.getElementById('email').value = value.email;
            document.getElementById('contactNo').value = value.contactNo;
        }
    })
}

// Function to remove student record
function removeData(id) {
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? [];

    if (confirm("Are you sure you want to delete this record?")) {
        // Remove the selected record
        contactList = contactList.filter(function (value) {
            return value.id != id;
        });

        // Save the updated contact list to localStorage
        localStorage.setItem('listItem', JSON.stringify(contactList));

        // Refresh the table
        allData()
    }
}

// Function to clear the form data
function clearData() {
    document.getElementById('form').reset();
    document.getElementById('id').value = "";
}

// Initialize the table on page load
allData();