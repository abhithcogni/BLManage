$(document).ready(function () {
    // The navbar and sidebar are now part of the layout,
    // so we don't need to load them here again.

    // Highlight the current page in the sidebar
    $('#sidebar a[href="@Url.Action("AddLoanProduct", "Admin")]"').addClass('active');

    $('#loanProductForm').on('submit', function (event) {
        event.preventDefault();
        const productName = $('#productName').val();
        const interestRate = $('#interestRate').val();
        const minAmount = $('#minAmount').val();
        const maxAmount = $('#maxAmount').val();
        const tenure = $('#tenure').val();

        console.log('Product Name:', productName);
        console.log('Interest Rate:', interestRate);
        console.log('Minimum Amount:', minAmount);
        console.log('Maximum Amount:', maxAmount);
        console.log('Tenure:', tenure);

        // Optionally, you can redirect the user or display a success message here.
        alert('Loan product added (data logged to console)');
        $(this)[0].reset();
    });
});