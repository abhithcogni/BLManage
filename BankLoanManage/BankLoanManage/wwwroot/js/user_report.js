$(document).ready(function () {
  // --- Dummy Data (Replace with actual API calls) ---
  const loanSummaryData = {
    totalLoansApplied: 4, // Updated total loans applied
    totalLoansApproved: 2,
    totalLoansRejected: 2, // Updated rejected count
    totalOutstandingBalance: 15000.5,
  };

  const repaymentHistory = [
    {
      applicationId: 101,
      dueDate: "2025-05-15",
      amountDue: 500.25,
      paymentDate: "2025-05-14",
      paymentStatus: "COMPLETED",
    },
    {
      applicationId: 101,
      dueDate: "2025-06-15",
      amountDue: 500.25,
      paymentDate: null,
      paymentStatus: "PENDING",
    },
    {
      applicationId: 102,
      dueDate: "2025-05-20",
      amountDue: 750.0,
      paymentDate: "2025-05-19",
      paymentStatus: "COMPLETED",
    },
    {
      applicationId: 102,
      dueDate: "2025-06-20",
      amountDue: 750.0,
      paymentDate: null,
      paymentStatus: "PENDING",
    },
    {
      applicationId: 101,
      dueDate: "2025-07-15",
      amountDue: 500.25,
      paymentDate: null,
      paymentStatus: "PENDING",
    },
    {
      applicationId: 103,
      dueDate: "2025-05-25",
      amountDue: 1000.0,
      paymentDate: null,
      paymentStatus: "REJECTED",
    }, // New user data
  ];

  const userLoanApplications = [
    { applicationId: 101, loanProductId: 1, loanAmount: 10000 },
    { applicationId: 102, loanProductId: 2, loanAmount: 5000 },
    { applicationId: 103, loanProductId: 3, loanAmount: 2000 }, // New user loan application
  ];

  // Populate Loan Summary
  $("#totalLoansApplied").text(loanSummaryData.totalLoansApplied);
  $("#totalLoansApproved").text(loanSummaryData.totalLoansApproved);
  $("#totalOutstandingBalance").text(
    "₹" + loanSummaryData.totalOutstandingBalance.toFixed(2)
  );

  // Populate Repayment History Table
  const repaymentHistoryTableBody = $("#repaymentHistoryTableBody");
  if (repaymentHistory.length > 0) {
    repaymentHistory.forEach((repayment) => {
      const statusClass =
        repayment.paymentStatus === "COMPLETED"
          ? "bg-success p-1 rounded text-white"
          : repayment.paymentStatus === "PENDING"
          ? "bg-warning p-1 rounded"
          : "bg-danger p-1 rounded text-white"; // Added REJECTED status styling
      repaymentHistoryTableBody.append(`
      <tr>
          <td>${repayment.applicationId}</td>
          <td>${repayment.dueDate}</td>
          <td>₹${repayment.amountDue.toFixed(2)}</td>
          <td>${repayment.paymentDate || "-"}</td>
          <td><span class="${statusClass}" style="font-size: 10px;">${
        repayment.paymentStatus
      }</span></td>
      </tr>
    `);
    });
  } else {
    $("#noRepayments").show();
  }

  // Populate Loan Application ID dropdown
  const loanApplicationIdSelect = $("#loanApplicationId");
  userLoanApplications.forEach((loan) => {
    loanApplicationIdSelect.append(
      `<option value="${loan.applicationId}">${loan.applicationId}</option>`
    );
  });

  // Handle View Loan Details button click
  $("#viewLoanDetailsBtn").click(function () {
    const selectedLoanId = loanApplicationIdSelect.val();
    const loanDetailsDiv = $("#loanDetails");
    if (selectedLoanId) {
      const selectedLoan = userLoanApplications.find(
        (loan) => loan.applicationId === parseInt(selectedLoanId)
      );
      if (selectedLoan) {
        loanDetailsDiv.html(`
                    <p><strong>Loan Application ID:</strong> ${
                      selectedLoan.applicationId
                    }</p>
                    <p><strong>Loan Product ID:</strong> ${
                      selectedLoan.loanProductId
                    }</p>
                    <p><strong>Loan Amount:</strong> ₹${selectedLoan.loanAmount.toFixed(
                      2
                    )}</p>
                `);
      } else {
        loanDetailsDiv.html(
          '<p class="text-danger">Loan details not found.</p>'
        );
      }
    } else {
      loanDetailsDiv.html(
        '<p class="text-warning">Please select a Loan Application ID.</p>'
      );
    }
  });

  // --- Chart Creation ---

  // Loan Status Chart
  const loanStatusCanvas = $("#loanStatusChart");
  new Chart(loanStatusCanvas, {
    type: "pie",
    data: {
      labels: ["Approved", "Rejected", "Pending"],
      datasets: [
        {
          data: [
            loanSummaryData.totalLoansApproved,
            loanSummaryData.totalLoansRejected,
            loanSummaryData.totalLoansApplied -
              loanSummaryData.totalLoansApproved -
              loanSummaryData.totalLoansRejected,
          ],
          backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Repayment Status Chart
  const repaymentStatusCounts = repaymentHistory.reduce((acc, repayment) => {
    acc[repayment.paymentStatus] = (acc[repayment.paymentStatus] || 0) + 1;
    return acc;
  }, {});

  const repaymentStatusCanvas = $("#repaymentStatusChart");
  new Chart(repaymentStatusCanvas, {
    type: "line", // Changed from 'bar' to 'line'
    data: {
      labels: Object.keys(repaymentStatusCounts),
      datasets: [
        {
          label: "Repayment Status",
          data: Object.values(repaymentStatusCounts),
          borderColor: "#007bff", // Line color
          backgroundColor: "rgba(0, 123, 255, 0.2)", // Optional fill color
          fill: true, // Enable fill under the line
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  });

  // Outstanding Balance Over Time Chart (Illustrative - Needs more data)
  const outstandingBalanceCanvas = $("#outstandingBalanceChart");
  new Chart(outstandingBalanceCanvas, {
    type: "line",
    data: {
      labels: ["Current"],
      datasets: [
        {
          label: "Outstanding Balance",
          data: [loanSummaryData.totalOutstandingBalance],
          borderColor: "#007bff",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // --- End of Chart Creation ---
});

$(document).ready(function () {
  // Hide all chart sections initially
  $(".report-section canvas").closest(".report-section").hide();

  // Dummy data for user-specific charts
  const userSpecificData = {
    101: {
      loanStatus: { approved: 1, rejected: 0, pending: 2 },
      repaymentStatus: { COMPLETED: 2, PENDING: 1 },
      outstandingBalance: [10000, 9500, 9000],
    },
    102: {
      loanStatus: { approved: 1, rejected: 0, pending: 1 },
      repaymentStatus: { COMPLETED: 1, PENDING: 1 },
      outstandingBalance: [5000, 4500, 4000],
    },
    103: {
      loanStatus: { approved: 0, rejected: 1, pending: 0 }, // New user-specific data
      repaymentStatus: { REJECTED: 1 },
      outstandingBalance: [2000, 0], // New user-specific data
    },
  };

  // Handle dropdown change
  $("#loanApplicationId").change(function () {
    const selectedLoanId = $(this).val();

    if (selectedLoanId) {
      // Show chart sections
      $(".report-section canvas").closest(".report-section").show();

      // Update Loan Status Chart
      const loanStatusData = userSpecificData[selectedLoanId].loanStatus;
      const loanStatusChart = Chart.getChart("loanStatusChart");
      loanStatusChart.data.datasets[0].data = [
        loanStatusData.approved,
        loanStatusData.rejected,
        loanStatusData.pending,
      ];
      loanStatusChart.update();

      // Update Repayment Status Chart
      const repaymentStatusData =
        userSpecificData[selectedLoanId].repaymentStatus;
      const repaymentStatusChart = Chart.getChart("repaymentStatusChart");
      repaymentStatusChart.data.labels = Object.keys(repaymentStatusData);
      repaymentStatusChart.data.datasets[0].data =
        Object.values(repaymentStatusData);
      repaymentStatusChart.update();

      // Update Outstanding Balance Chart
      const outstandingBalanceData =
        userSpecificData[selectedLoanId].outstandingBalance;
      const outstandingBalanceChart = Chart.getChart("outstandingBalanceChart");
      outstandingBalanceChart.data.labels = outstandingBalanceData.map(
        (_, index) => `Point ${index + 1}`
      );
      outstandingBalanceChart.data.datasets[0].data = outstandingBalanceData;
      outstandingBalanceChart.update();
    } else {
      // Hide chart sections if no user is selected
      $(".report-section canvas").closest(".report-section").hide();
    }
  });

  // Initialize charts with empty data
  const loanStatusCanvas = $("#loanStatusChart");
  new Chart(loanStatusCanvas, {
    type: "pie",
    data: {
      labels: ["Approved", "Rejected", "Pending"],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  const repaymentStatusCanvas = $("#repaymentStatusChart");
  new Chart(repaymentStatusCanvas, {
    type: "line", // Changed from 'bar' to 'line'
    data: {
      labels: [],
      datasets: [
        {
          label: "Repayment Status",
          data: [],
          borderColor: "#007bff", // Line color
          backgroundColor: "rgba(0, 123, 255, 0.2)", // Optional fill color
          fill: true, // Enable fill under the line
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const outstandingBalanceCanvas = $("#outstandingBalanceChart");
  new Chart(outstandingBalanceCanvas, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Outstanding Balance",
          data: [],
          borderColor: "#007bff",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

document
  .getElementById("scrollUpButton")
  .addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

document
  .getElementById("scrollDownButton")
  .addEventListener("click", function () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
  