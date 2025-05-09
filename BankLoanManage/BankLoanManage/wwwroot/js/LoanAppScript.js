$(document).ready(function() {
    $('#loanProductName').change(function() {
        const interestRateField = $('#interestRate');
        switch ($(this).val()) {
            case 'Personal Loan':
                interestRateField.val(5);
                break;
            case 'Housing Loan':
                interestRateField.val(8);
                break;
            case 'Gold Loan':
                interestRateField.val(10);
                break;
            case 'Vehical Loan':
                interestRateField.val(12);
                break;    
            default:
                interestRateField.val('');
        }
        calculateTotalAmount();
    });

    $('#loanAmount, #tenure').on('input', calculateTotalAmount);

    function calculateTotalAmount() {
        const loanAmount = parseFloat($('#loanAmount').val()) || 0;
        const interestRate = parseFloat($('#interestRate').val()) || 0;
        const tenure = parseFloat($('#tenure').val()) || 0;

        const totalAmount = loanAmount * (1 + (interestRate * tenure) / (100 * 12));
        $('#totalAmount').val(totalAmount.toFixed(2));
    }

    $('#loanApplicationForm').submit(function(event) {
        event.preventDefault();
        
        const loanApplication = {
            applicationId: Date.now(), // Using timestamp as a simple unique ID
            customerId: $('#customerId').val(),
            loanProductName: $('#loanProductName').val(),
            interestRate: $('#interestRate').val(),
            loanAmount: $('#loanAmount').val(),
            tenure: $('#tenure').val(),
            totalAmount: $('#totalAmount').val(),
            applicationDate: $('#applicationDate').val(),
            approvalStatus: 'PENDING'
        };
        
        saveLoanApplication(loanApplication);
        $(this).trigger('reset');
    });

    function saveLoanApplication(application) {
        let loanApplications = JSON.parse(localStorage.getItem('loanApplications')) || [];
        loanApplications.push(application);
        localStorage.setItem('loanApplications', JSON.stringify(loanApplications));
    }
});
