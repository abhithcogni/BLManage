// Sample Loan Data
const loanData = [
  { loanId: 101, name: "Alice Smith", email: "alice.smith@example.com", amount: 500000, type: "Home Loan", status: "Pending" },
  { loanId: 102, name: "Bob Johnson", email: "bob.johnson@example.com", amount: 300000, type: "Car Loan", status: "Approved" },
  { loanId: 103, name: "Charlie Brown", email: "charlie.brown@example.com", amount: 200000, type: "Personal Loan", status: "Rejected" },
];

let selectedRow = null; // To track the row being updated
let selectedAction = ""; // To track the selected action (Approve/Reject)

// Function to populate the Loan Table
function populateLoanTable(data) {
  const $loanTableBody = $("#loanTableBody");
  $loanTableBody.empty(); // Clear existing rows

  data.forEach((loan) => {
    const statusClass =
      loan.status === "Approved"
        ? "bg-success text-white"
        : loan.status === "Rejected"
        ? "bg-danger text-white"
        : "bg-warning text-dark"; // For Pending

    const row = `
      <tr>
        <td class="table-center">${loan.loanId}</td>
        <td class="table-center">${loan.name}</td>
        <td class="table-center">${loan.email}</td>
        <td class="table-center">₹${loan.amount.toLocaleString()}</td>
        <td class="table-center">${loan.type}</td>
        <td class="table-center">
          <select class="form-select form-select-sm action-dropdown">
            <option value="Pending" ${loan.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="Approved" ${loan.status === "Approved" ? "selected" : ""}>Approve</option>
            <option value="Rejected" ${loan.status === "Rejected" ? "selected" : ""}>Reject</option>
          </select>
        </td>
        <td class="status-text badge p-2 ${statusClass}">${loan.status}</td>
      </tr>
    `;
    $loanTableBody.append(row);
  });
}

// Initial population of the table
$(document).ready(function () {
  populateLoanTable(loanData);

  // Handle Action Dropdown Change
  $(document).on("change", ".action-dropdown", function () {
    selectedRow = $(this).closest("tr");
    selectedAction = $(this).val();

    // Show confirmation modal
    $("#actionType").text(selectedAction.toLowerCase());
    const confirmationModal = new bootstrap.Modal($("#confirmationModal")[0]);
    confirmationModal.show();
  });

  // Handle Confirm Action Button
  $("#confirmActionBtn").on("click", function () {
    const $statusText = $(selectedRow).find(".status-text");

    // Update the status text and apply badge-like styling
    $statusText.text(selectedAction);
    $statusText.attr("class", "status-text badge p-2"); // Reset classes
    if (selectedAction === "Approved") {
      $statusText.addClass("bg-success text-white");
    } else if (selectedAction === "Rejected") {
      $statusText.addClass("bg-danger text-white");
    } else {
      $statusText.addClass("bg-warning text-dark");
    }

    // Close the confirmation modal
    const confirmationModal = bootstrap.Modal.getInstance($("#confirmationModal")[0]);
    confirmationModal.hide();
  });

  // Handle Filter Dropdown Change
  $("#filterStatus").on("change", function () {
    const filterValue = $(this).val();

    if (filterValue === "All") {
      populateLoanTable(loanData); // Show all rows
    } else {
      const filteredData = loanData.filter((loan) => loan.status === filterValue);
      populateLoanTable(filteredData); // Show filtered rows
    }
  });
});