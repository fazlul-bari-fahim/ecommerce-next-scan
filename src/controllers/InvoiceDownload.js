import puppeteer from "puppeteer";
import invoiceModel from "../models/invoiceProuctModel.js";
import invoiceHTML from "../utility/InvoiceTemplate.js";

export const DownloadInvoice = async (req, res) => {

    const { id } = req.params;

    const invoice = await invoiceModel.findById(id);

    if (!invoice) {
        return res.status(404).json({
            success: false,
            message: "Invoice not found"
        });
    }

    const browser = await puppeteer.launch({
        headless: "new"
    });

    const page = await browser.newPage();

    await page.setContent(invoiceHTML(invoice));

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await browser.close();

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Invoice-${invoice.order_number}.pdf`
    });

    res.send(pdf);
}