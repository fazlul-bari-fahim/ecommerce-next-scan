


// utils/invoiceTemplate.js

const invoiceHTML = (invoice) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 30px;
            }

            h1 {
                text-align: center;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th, td {
                border: 1px solid #ddd;
                padding: 8px;
            }

            th {
                background: #f2f2f2;
            }
        </style>
    </head>

    <body>

        <h1>Receipt</h1>

        <p><strong>Order No:</strong> ${invoice.order_number}</p>
        <p><strong>Name:</strong> ${invoice.cus_detailes.FirstName}</p>

    </body>
    </html>
    `;
};

export default invoiceHTML;






