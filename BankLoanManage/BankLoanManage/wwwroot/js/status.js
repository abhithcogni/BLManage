$(document).ready(function() {
    const loanApplications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    const loanStatusList = $('#loanStatusList');

    loanApplications.forEach(application => {
        const listItem = $('<li>').addClass('list-group-item');
        listItem.html(`
            <strong>Application ID:</strong> ${application.applicationId}<br>
            <strong>Loan Product:</strong> ${application.loanProductName}<br>
            <strong>Amount:</strong> ${application.loanAmount}<br>
            <strong>Status:</strong> <span class="badge badge-warning">${application.approvalStatus}</span>
        `);
        loanStatusList.append(listItem);
    });
});
