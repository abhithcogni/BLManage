// Sample KYC data
const kycData = [
  { userId: 1, name: "Alice Smith", email: "alice.smith@example.com", documentUrl: "doc1.pdf", status: "Pending" },
  { userId: 2, name: "Bob Johnson", email: "bob.johnson@example.com", documentUrl: "doc2.pdf", status: "Approved" },
  { userId: 3, name: "Charlie Brown", email: "charlie.brown@example.com", documentUrl: "doc3.pdf", status: "Rejected" },
];

let selectedRow = null; // To track the row being updated
let selectedAction = ""; // To track the selected action (Approve/Reject)

// Function to populate the KYC table
function populateKycTable(data) {
  const $kycTableBody = $("#kycTableBody");
  $kycTableBody.empty(); // Clear existing rows

  data.forEach((kyc) => {
    const statusClass =
      kyc.status === "Approved"
        ? "bg-success text-white"
        : kyc.status === "Rejected"
        ? "bg-danger text-white"
        : "bg-warning text-dark"; // For Pending

    const row = `
      <tr>
        <td class="table-center">${kyc.userId}</td>
        <td class="table-center">${kyc.name}</td>
        <td class="table-center">${kyc.email}</td>
        <td class="table-center">
          <button class="btn btn-primary btn-sm view-doc-btn" data-doc-url="${kyc.documentUrl}">View</button>
        </td>
        <td class="table-center">
          <select class="form-select form-select-sm status-dropdown">
            <option value="Pending" ${kyc.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="Approved" ${kyc.status === "Approved" ? "selected" : ""}>Approved</option>
            <option value="Rejected" ${kyc.status === "Rejected" ? "selected" : ""}>Rejected</option>
          </select>
        </td>
        <td class="status-text badge p-2 ${statusClass}">${kyc.status}</td>
      </tr>
    `;
    $kycTableBody.append(row);
  });
}

// Initial population of the table
$(document).ready(function () {
  populateKycTable(kycData);

    // Handle View Document Button Click
    $(document).on("click", ".view-doc-btn", function () {
        const documentUrl = $(this).data("doc-url");
        $("#documentViewer").attr("src", documentUrl);

        const documentModal = new bootstrap.Modal($("#documentModal")[0]);
        documentModal.show();

        // Ensure the modal can be closed
        $("#documentModal").on("hidden.bs.modal", function () {
            $("#documentViewer").attr("src", ""); // Clear the iframe source when modal is closed
        });
    });



  // Handle Status Dropdown Change
  $(document).on("change", ".status-dropdown", function () {
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
      populateKycTable(kycData); // Show all rows
    } else {
      const filteredData = kycData.filter((kyc) => kyc.status === filterValue);
      populateKycTable(filteredData); // Show filtered rows
    }
  });
});