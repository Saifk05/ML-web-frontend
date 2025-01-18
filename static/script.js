// Generate random IP address
function getRandomIP() {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

// Generate random traffic data
function getRandomTrafficData() {
    const data = [];
    for (let i = 0; i < 15; i++) {
        const bytesSent = Math.floor(Math.random() * 10000);
        const bytesReceived = Math.floor(Math.random() * 10000);
        const status = bytesSent > 5000 || bytesReceived > 5000 ? "DDoS Attack" : "Normal Traffic"; // Classify based on thresholds
        data.push({
            botnet_ip: getRandomIP(),
            bytes_sent: bytesSent,
            bytes_received: bytesReceived,
            status: status,
        });
    }
    return data;
}

let tableData = getRandomTrafficData();
const tableBody = document.querySelector("#traffic-table tbody");

// Function to render the table
function renderTable(data) {
    tableBody.innerHTML = ""; // Clear the table
    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.botnet_ip}</td>
            <td>${row.bytes_sent}</td>
            <td>${row.bytes_received}</td>
            <td class="${row.status === "DDoS Attack" ? "status-ddos" : "status-normal"}">
                ${row.status}
            </td>
        `;
        tableBody.appendChild(tr);
    });
}


// Initial render
renderTable(tableData);

// Button event listeners
document.getElementById("show-all").addEventListener("click", () => renderTable(tableData));

document.getElementById("show-ddos").addEventListener("click", () => {
    const filteredData = tableData.filter(row => row.status === "DDoS Attack");
    renderTable(filteredData);
});

document.getElementById("show-normal").addEventListener("click", () => {
    const filteredData = tableData.filter(row => row.status === "Normal Traffic");
    renderTable(filteredData);
});

// Generate new random data every 10 seconds
setInterval(() => {
    tableData = getRandomTrafficData();
    renderTable(tableData);
}, 10000);

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentIndex) {
                slide.classList.add('active');
            }
        });
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            showNextSlide();
        } else if (event.key === 'ArrowLeft') {
            showPrevSlide();
        }
    });

    // Auto-slide functionality
    setInterval(() => {
        showNextSlide();
    }, 2000); // Change slide every 2 seconds
});




// Function to generate random IP addresses
function generateRandomIP() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".");
}

// Function to generate random bytes sent/received
function generateRandomBytes() {
    return Math.floor(Math.random() * 10000);
}

// Function to generate random traffic status
function generateRandomStatus() {
    return Math.random() > 0.5 ? "DDoS Attack" : "Normal Traffic";
}

// Function to populate the table with random data
function populateTable() {
    const tableBody = document.querySelector("#traffic-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    for (let i = 0; i < 10; i++) {
        const row = document.createElement("tr");

        const ipCell = document.createElement("td");
        ipCell.textContent = generateRandomIP();
        row.appendChild(ipCell);

        const sentCell = document.createElement("td");
        sentCell.textContent = generateRandomBytes();
        row.appendChild(sentCell);

        const receivedCell = document.createElement("td");
        receivedCell.textContent = generateRandomBytes();
        row.appendChild(receivedCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = generateRandomStatus();
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    }
}

// Function to randomly update the status column of the table
function updateRandomStatus() {
    const rows = document.querySelectorAll("#traffic-table tbody tr");

    rows.forEach(row => {
        const statusCell = row.cells[3];
        statusCell.textContent = generateRandomStatus();
    });
}

// Populate the table initially
populateTable();

// Update the status column every 5 seconds
setInterval(updateRandomStatus, 5000);


