$(document).ready(function () {

    // Sample loan product data
    const loanProductsData = [
        { name: 'Housing Loan', interestRate: 6.5, minAmount: 50000, maxAmount: 5000000, tenure: 240 },
        { name: 'Vehical Loan', interestRate: 7.2, minAmount: 100000, maxAmount: 2000000, tenure: 60 },
        { name: 'Personal Loan', interestRate: 10.5, minAmount: 5000, maxAmount: 500000, tenure: 36 },
        { name: 'Gold Loan', interestRate: 8.0, minAmount: 20000, maxAmount: 1000000, tenure: 120 }
    ];

    let currentlyEditingProduct = null;
    let productToDelete = null; // To store the product to be deleted

    // Function to populate the table
    function populateTable(data) {
        const tbody = $('#loanProductsTable tbody');
        tbody.empty();
        data.forEach(product => {
            const row = `
                        <tr>
                            <td>${product.name}</td>
                            <td>${product.interestRate}</td>
                            <td>${product.minAmount}</td>
                            <td>${product.maxAmount}</td>
                            <td>${product.tenure}</td>
                            <td>
                                <button class="btn btn-sm btn-warning edit-button" data-product-name="${product.name}">Edit</button>
                                <button class="btn btn-sm btn-danger delete-button" data-product-name="${product.name}">Delete</button>
                            </td>
                        </tr>
                    `;
            tbody.append(row);
        });
    }

    // Initial population of the table
    populateTable(loanProductsData);

    // Handle Edit button click
    $(document).on('click', '.edit-button', function () {
        const productName = $(this).data('product-name');
        currentlyEditingProduct = productName;
        const product = loanProductsData.find(p => p.name === productName);

        if (product) {
            $('#editProductName').val(product.name);
            $('#editInterestRate').val(product.interestRate);
            $('#editMinAmount').val(product.minAmount);
            $('#editMaxAmount').val(product.maxAmount);
            $('#editTenure').val(product.tenure);
            $('#editProductModal').modal('show');
        }
    });

    // Handle Save button click in the modal
    $('#saveEditButton').on('click', function () {
        if (currentlyEditingProduct) {
            const interestRate = $('#editInterestRate').val();
            const minAmount = $('#editMinAmount').val();
            const maxAmount = $('#editMaxAmount').val();
            const tenure = $('#editTenure').val();

            const index = loanProductsData.findIndex(p => p.name === currentlyEditingProduct);
            if (index !== -1) {
                loanProductsData[index].interestRate = parseFloat(interestRate);
                loanProductsData[index].minAmount = parseInt(minAmount);
                loanProductsData[index].maxAmount = parseInt(maxAmount);
                loanProductsData[index].tenure = parseInt(tenure);
                populateTable(loanProductsData);
                $('#editProductModal').modal('hide');
                currentlyEditingProduct = null;
                console.log('Updated Product:', currentlyEditingProduct, interestRate, minAmount, maxAmount, tenure);
            }
        }
    });

    // Handle modal hide event for edit modal
    $('#editProductModal').on('hidden.bs.modal', function () {
        currentlyEditingProduct = null;
    });

    // Handle Delete button click
    $(document).on('click', '.delete-button', function () {
        productToDelete = $(this).data('product-name');
        $('#deleteProductName').text(productToDelete); // Set the product name in the confirmation modal
        $('#deleteConfirmationModal').modal('show'); // Show the confirmation modal
    });

    // Handle confirmation of delete
    $('#confirmDeleteButton').on('click', function () {
        if (productToDelete) {
            const indexToDelete = loanProductsData.findIndex(p => p.name === productToDelete);

            if (indexToDelete !== -1) {
                loanProductsData.splice(indexToDelete, 1);
                populateTable(loanProductsData);
                console.log('Deleted Product:', productToDelete);
            }
            $('#deleteConfirmationModal').modal('hide'); // Hide the confirmation modal
            productToDelete = null; // Reset the product to delete
        }
    });

    // Handle cancellation of delete (closing the modal)
    $('#deleteConfirmationModal').on('hidden.bs.modal', function () {
        productToDelete = null; // Reset the product to delete if the modal is closed
    });
});