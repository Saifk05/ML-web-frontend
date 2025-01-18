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
    data.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.botnet_ip}</td>
            <td>${row.bytes_sent}</td>
            <td>${row.bytes_received}</td>
            <td class="status" style="color: ${row.status === "DDoS Attack" ? "red" : "green"};">
                ${row.status}
            </td>
            <td>
                <input type="checkbox" class="select-ip" data-index="${index}" ${row.status === "DDoS Attack" ? "" : "disabled"}>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Function to mitigate selected IPs
function mitigateSelectedIPs() {
    const selectedCheckboxes = document.querySelectorAll(".select-ip:checked");
    const selectedIPs = Array.from(selectedCheckboxes).map(checkbox => {
        const index = checkbox.getAttribute("data-index");
        return tableData[index].botnet_ip;
    });

    const resultDiv = document.getElementById("mitigation-result");
    if (selectedIPs.length === 0) {
        resultDiv.innerHTML = `<p style="color: red;">No DDoS IPs selected for mitigation.</p>`;
        return;
    }

    // Simulate mitigation
    selectedIPs.forEach(ip => {
        console.log(`Mitigating ${ip}...`);
    });

    resultDiv.innerHTML = `<p style="color: green;">Successfully mitigated IPs: ${selectedIPs.join(", ")}</p>`;

    // Remove mitigated IPs from the table
    tableData = tableData.filter(row => !selectedIPs.includes(row.botnet_ip));
    renderTable(tableData);
}

// Initial render
renderTable(tableData);

// Event listener for mitigate button
document.getElementById("mitigate-btn").addEventListener("click", mitigateSelectedIPs);

// Generate new random data every 10 seconds
setInterval(() => {
    tableData = getRandomTrafficData();
    renderTable(tableData);
}, 10000);
