import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { FilesService } from '../files/files.service';

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  client: {
    name: string;
    contactName?: string;
    contactEmail?: string;
    billingAddress?: string;
  };
  lineItems: Array<{
    description: string;
    quantity: string;
    unitPrice: string;
    amount: string;
  }>;
  subtotal: string;
  tax: string;
  total: string;
}

@Injectable()
export class PdfService {
  constructor(private filesService: FilesService) {}

  async generateInvoicePdf(invoiceData: InvoiceData): Promise<string> {
    const html = this.generateInvoiceHtml(invoiceData);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = Buffer.from(await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      }));
      
      // Save PDF file
      const fileName = `invoice-${invoiceData.invoiceNumber}-${Date.now()}.pdf`;
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: fileName,
        encoding: '7bit',
        mimetype: 'application/pdf',
        size: pdfBuffer.length,
        buffer: pdfBuffer,
        stream: null as any,
        destination: '',
        filename: fileName,
        path: '',
      };
      
      const filePath = await this.filesService.saveFile(mockFile, 'invoices');
      return filePath;
    } finally {
      await browser.close();
    }
  }

  private generateInvoiceHtml(data: InvoiceData): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice ${data.invoiceNumber}</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            color: #333;
        }
        .header { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 40px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
        }
        .company-info h1 { 
            color: #2563eb; 
            margin: 0; 
            font-size: 28px;
        }
        .invoice-info { 
            text-align: right; 
        }
        .invoice-info h2 { 
            color: #2563eb; 
            margin: 0 0 10px 0; 
            font-size: 24px;
        }
        .billing-section { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 40px; 
        }
        .billing-to, .invoice-details { 
            width: 45%; 
        }
        .billing-to h3, .invoice-details h3 { 
            color: #2563eb; 
            border-bottom: 1px solid #e5e7eb; 
            padding-bottom: 5px; 
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 30px; 
        }
        th, td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #e5e7eb; 
        }
        th { 
            background-color: #f8fafc; 
            color: #2563eb; 
            font-weight: bold; 
        }
        .amount { 
            text-align: right; 
        }
        .totals { 
            float: right; 
            width: 300px; 
        }
        .totals table { 
            margin-bottom: 0; 
        }
        .total-row { 
            font-weight: bold; 
            font-size: 18px; 
            background-color: #f8fafc; 
        }
        .footer { 
            margin-top: 50px; 
            text-align: center; 
            color: #6b7280; 
            border-top: 1px solid #e5e7eb; 
            padding-top: 20px; 
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-info">
            <h1>New Era AI</h1>
            <p>Professional Invoicing System</p>
        </div>
        <div class="invoice-info">
            <h2>INVOICE</h2>
            <p><strong>Invoice #:</strong> ${data.invoiceNumber}</p>
            <p><strong>Issue Date:</strong> ${new Date(data.issueDate).toLocaleDateString()}</p>
            <p><strong>Due Date:</strong> ${new Date(data.dueDate).toLocaleDateString()}</p>
        </div>
    </div>

    <div class="billing-section">
        <div class="billing-to">
            <h3>Bill To:</h3>
            <p><strong>${data.client.name}</strong></p>
            ${data.client.contactName ? `<p>${data.client.contactName}</p>` : ''}
            ${data.client.contactEmail ? `<p>${data.client.contactEmail}</p>` : ''}
            ${data.client.billingAddress ? `<p>${data.client.billingAddress.replace(/\n/g, '<br>')}</p>` : ''}
        </div>
        <div class="invoice-details">
            <h3>Invoice Details:</h3>
            <p><strong>Status:</strong> Generated</p>
            <p><strong>Currency:</strong> USD</p>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th class="amount">Amount</th>
            </tr>
        </thead>
        <tbody>
            ${data.lineItems.map(item => `
                <tr>
                    <td>${item.description}</td>
                    <td>${parseFloat(item.quantity).toLocaleString()}</td>
                    <td>$${parseFloat(item.unitPrice).toFixed(2)}</td>
                    <td class="amount">$${parseFloat(item.amount).toFixed(2)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="totals">
        <table>
            <tr>
                <td><strong>Subtotal:</strong></td>
                <td class="amount">$${parseFloat(data.subtotal).toFixed(2)}</td>
            </tr>
            <tr>
                <td><strong>Tax:</strong></td>
                <td class="amount">$${parseFloat(data.tax).toFixed(2)}</td>
            </tr>
            <tr class="total-row">
                <td><strong>Total:</strong></td>
                <td class="amount">$${parseFloat(data.total).toFixed(2)}</td>
            </tr>
        </table>
    </div>

    <div style="clear: both;"></div>

    <div class="footer">
        <p>Thank you for your business!</p>
        <p>Generated by New Era AI Invoicing System</p>
    </div>
</body>
</html>
    `;
  }
}