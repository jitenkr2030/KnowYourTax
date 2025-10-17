import { db } from '@/lib/db'

export interface GSTInvoice {
  id: string
  invoiceNumber: string
  invoiceDate: Date
  dueDate: Date
  
  // Customer Information
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  customerGSTIN?: string
  
  // Business Information
  businessName: string
  businessAddress: string
  businessGSTIN: string
  
  // Invoice Items
  items: GSTInvoiceItem[]
  
  // Totals
  subtotal: number
  cgstAmount: number
  sgstAmount: number
  igstAmount: number
  cessAmount: number
  totalAmount: number
  
  // Payment Information
  paymentStatus: 'DRAFT' | 'PENDING' | 'PAID' | 'CANCELLED'
  paymentMethod?: string
  paymentId?: string
  
  // Tax Information
  placeOfSupply: string
  reverseCharge: boolean
  
  // Metadata
  createdAt: Date
  updatedAt: Date
}

export interface GSTInvoiceItem {
  id: string
  invoiceId: string
  description: string
  hsnCode?: string
  sacCode?: string
  quantity: number
  unitPrice: number
  discount?: number
  
  // Tax Rates
  cgstRate: number
  sgstRate: number
  igstRate: number
  cessRate: number
  
  // Amounts
  taxableAmount: number
  cgstAmount: number
  sgstAmount: number
  igstAmount: number
  cessAmount: number
  totalAmount: number
}

export interface GSTInvoiceRequest {
  customerId: string
  items: Omit<GSTInvoiceItem, 'id' | 'invoiceId'>[]
  paymentMethod?: string
  dueDate?: Date
  placeOfSupply: string
  reverseCharge?: boolean
}

class GSTInvoiceService {
  // Generate unique invoice number
  private generateInvoiceNumber(): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `KYT-${timestamp}-${random.toString().padStart(3, '0')}`
  }

  // Create GST invoice
  async createInvoice(request: GSTInvoiceRequest): Promise<GSTInvoice> {
    const customer = await db.user.findUnique({
      where: { id: request.customerId },
      include: { account: true },
    })

    if (!customer) {
      throw new Error('Customer not found')
    }

    const businessAccount = await db.account.findFirst({
      where: { gstin: { not: null } },
    })

    if (!businessAccount) {
      throw new Error('Business account with GSTIN not found')
    }

    // Calculate invoice totals
    const invoiceItems = request.items.map(item => ({
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }))

    const totals = this.calculateInvoiceTotals(invoiceItems)

    // Create invoice in database
    const invoice = await db.gSTInvoice.create({
      data: {
        invoiceNumber: this.generateInvoiceNumber(),
        invoiceDate: new Date(),
        dueDate: request.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        
        // Customer Information
        customerName: customer.name || 'Customer',
        customerEmail: customer.email,
        customerPhone: customer.phone || '',
        customerAddress: this.formatCustomerAddress(customer),
        customerGSTIN: customer.panNumber, // Using PAN as GSTIN for individuals
        
        // Business Information
        businessName: businessAccount.name,
        businessAddress: this.formatBusinessAddress(businessAccount),
        businessGSTIN: businessAccount.gstin || '',
        
        // Totals
        subtotal: totals.subtotal,
        cgstAmount: totals.cgstAmount,
        sgstAmount: totals.sgstAmount,
        igstAmount: totals.igstAmount,
        cessAmount: totals.cessAmount,
        totalAmount: totals.totalAmount,
        
        // Payment Information
        paymentStatus: 'DRAFT',
        paymentMethod: request.paymentMethod,
        
        // Tax Information
        placeOfSupply: request.placeOfSupply,
        reverseCharge: request.reverseCharge || false,
      },
    })

    // Create invoice items
    for (const item of invoiceItems) {
      await db.gSTInvoiceItem.create({
        data: {
          invoiceId: invoice.id,
          description: item.description,
          hsnCode: item.hsnCode,
          sacCode: item.sacCode,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discount: item.discount || 0,
          cgstRate: item.cgstRate,
          sgstRate: item.sgstRate,
          igstRate: item.igstRate,
          cessRate: item.cessRate,
          taxableAmount: item.taxableAmount,
          cgstAmount: item.cgstAmount,
          sgstAmount: item.sgstAmount,
          igstAmount: item.igstAmount,
          cessAmount: item.cessAmount,
          totalAmount: item.totalAmount,
        },
      })
    }

    return this.getInvoiceById(invoice.id) as Promise<GSTInvoice>
  }

  // Calculate invoice totals
  private calculateInvoiceTotals(items: Omit<GSTInvoiceItem, 'id' | 'invoiceId'>[]) {
    const totals = {
      subtotal: 0,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 0,
      cessAmount: 0,
      totalAmount: 0,
    }

    items.forEach(item => {
      const taxableAmount = (item.unitPrice * item.quantity) - (item.discount || 0)
      
      item.taxableAmount = taxableAmount
      item.cgstAmount = (taxableAmount * item.cgstRate) / 100
      item.sgstAmount = (taxableAmount * item.sgstRate) / 100
      item.igstAmount = (taxableAmount * item.igstRate) / 100
      item.cessAmount = (taxableAmount * item.cessRate) / 100
      item.totalAmount = taxableAmount + item.cgstAmount + item.sgstAmount + item.igstAmount + item.cessAmount

      totals.subtotal += taxableAmount
      totals.cgstAmount += item.cgstAmount
      totals.sgstAmount += item.sgstAmount
      totals.igstAmount += item.igstAmount
      totals.cessAmount += item.cessAmount
      totals.totalAmount += item.totalAmount
    })

    return totals
  }

  // Format customer address
  private formatCustomerAddress(customer: any): string {
    const parts = []
    if (customer.userProfile?.addressLine1) parts.push(customer.userProfile.addressLine1)
    if (customer.userProfile?.addressLine2) parts.push(customer.userProfile.addressLine2)
    if (customer.userProfile?.city) parts.push(customer.userProfile.city)
    if (customer.userProfile?.state) parts.push(customer.userProfile.state)
    if (customer.userProfile?.pincode) parts.push(customer.userProfile.pincode)
    return parts.join(', ')
  }

  // Format business address
  private formatBusinessAddress(account: any): string {
    const parts = []
    if (account.address) parts.push(account.address)
    if (account.city) parts.push(account.city)
    if (account.state) parts.push(account.state)
    if (account.pincode) parts.push(account.pincode)
    return parts.join(', ')
  }

  // Get invoice by ID
  async getInvoiceById(invoiceId: string): Promise<GSTInvoice | null> {
    const invoice = await db.gSTInvoice.findUnique({
      where: { id: invoiceId },
      include: {
        items: true,
      },
    })

    if (!invoice) return null

    return {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      customerPhone: invoice.customerPhone,
      customerAddress: invoice.customerAddress,
      customerGSTIN: invoice.customerGSTIN,
      businessName: invoice.businessName,
      businessAddress: invoice.businessAddress,
      businessGSTIN: invoice.businessGSTIN,
      items: invoice.items.map(item => ({
        id: item.id,
        invoiceId: item.invoiceId,
        description: item.description,
        hsnCode: item.hsnCode,
        sacCode: item.sacCode,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        cgstRate: item.cgstRate,
        sgstRate: item.sgstRate,
        igstRate: item.igstRate,
        cessRate: item.cessRate,
        taxableAmount: item.taxableAmount,
        cgstAmount: item.cgstAmount,
        sgstAmount: item.sgstAmount,
        igstAmount: item.igstAmount,
        cessAmount: item.cessAmount,
        totalAmount: item.totalAmount,
      })),
      subtotal: invoice.subtotal,
      cgstAmount: invoice.cgstAmount,
      sgstAmount: invoice.sgstAmount,
      igstAmount: invoice.igstAmount,
      cessAmount: invoice.cessAmount,
      totalAmount: invoice.totalAmount,
      paymentStatus: invoice.paymentStatus,
      paymentMethod: invoice.paymentMethod,
      paymentId: invoice.paymentId,
      placeOfSupply: invoice.placeOfSupply,
      reverseCharge: invoice.reverseCharge,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }
  }

  // Get invoices by customer
  async getInvoicesByCustomer(customerId: string): Promise<GSTInvoice[]> {
    const invoices = await db.gSTInvoice.findMany({
      where: { customerId: customerId },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return invoices.map(invoice => ({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      customerPhone: invoice.customerPhone,
      customerAddress: invoice.customerAddress,
      customerGSTIN: invoice.customerGSTIN,
      businessName: invoice.businessName,
      businessAddress: invoice.businessAddress,
      businessGSTIN: invoice.businessGSTIN,
      items: invoice.items.map(item => ({
        id: item.id,
        invoiceId: item.invoiceId,
        description: item.description,
        hsnCode: item.hsnCode,
        sacCode: item.sacCode,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        cgstRate: item.cgstRate,
        sgstRate: item.sgstRate,
        igstRate: item.igstRate,
        cessRate: item.cessRate,
        taxableAmount: item.taxableAmount,
        cgstAmount: item.cgstAmount,
        sgstAmount: item.sgstAmount,
        igstAmount: item.igstAmount,
        cessAmount: item.cessAmount,
        totalAmount: item.totalAmount,
      })),
      subtotal: invoice.subtotal,
      cgstAmount: invoice.cgstAmount,
      sgstAmount: invoice.sgstAmount,
      igstAmount: invoice.igstAmount,
      cessAmount: invoice.cessAmount,
      totalAmount: invoice.totalAmount,
      paymentStatus: invoice.paymentStatus,
      paymentMethod: invoice.paymentMethod,
      paymentId: invoice.paymentId,
      placeOfSupply: invoice.placeOfSupply,
      reverseCharge: invoice.reverseCharge,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }))
  }

  // Update invoice payment status
  async updateInvoicePaymentStatus(
    invoiceId: string,
    status: 'PENDING' | 'PAID' | 'CANCELLED',
    paymentId?: string
  ): Promise<GSTInvoice | null> {
    const updateData: any = {
      paymentStatus: status,
      updatedAt: new Date(),
    }

    if (paymentId) {
      updateData.paymentId = paymentId
    }

    await db.gSTInvoice.update({
      where: { id: invoiceId },
      data: updateData,
    })

    return this.getInvoiceById(invoiceId)
  }

  // Generate invoice HTML for download
  generateInvoiceHTML(invoice: GSTInvoice): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Tax Invoice - ${invoice.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .invoice-container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border: 1px solid #ddd; }
          .invoice-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .invoice-title { font-size: 24px; font-weight: bold; color: #333; }
          .invoice-number { font-size: 18px; color: #666; margin-top: 5px; }
          .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .party-info { flex: 1; }
          .party-info h3 { margin: 0 0 10px 0; color: #333; }
          .party-info p { margin: 5px 0; color: #666; font-size: 14px; }
          .invoice-items { margin-bottom: 30px; }
          .invoice-items table { width: 100%; border-collapse: collapse; }
          .invoice-items th, .invoice-items td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .invoice-items th { background: #f8f9fa; font-weight: bold; }
          .invoice-totals { display: flex; justify-content: flex-end; margin-bottom: 30px; }
          .totals-table { width: 300px; }
          .totals-table td { padding: 8px 0; border-bottom: 1px solid #eee; }
          .totals-table .total-row td { font-weight: bold; font-size: 16px; border-top: 2px solid #333; }
          .invoice-footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <div class="invoice-title">TAX INVOICE</div>
            <div class="invoice-number">Invoice No: ${invoice.invoiceNumber}</div>
            <div>Date: ${invoice.invoiceDate.toLocaleDateString()}</div>
          </div>

          <div class="invoice-details">
            <div class="party-info">
              <h3>Billed From:</h3>
              <p><strong>${invoice.businessName}</strong></p>
              <p>${invoice.businessAddress}</p>
              <p>GSTIN: ${invoice.businessGSTIN}</p>
            </div>
            <div class="party-info">
              <h3>Billed To:</h3>
              <p><strong>${invoice.customerName}</strong></p>
              <p>${invoice.customerAddress}</p>
              ${invoice.customerGSTIN ? `<p>GSTIN: ${invoice.customerGSTIN}</p>` : ''}
            </div>
          </div>

          <div class="invoice-items">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>HSN/SAC</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Taxable Amt</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>IGST</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.hsnCode || item.sacCode || '-'}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.unitPrice.toFixed(2)}</td>
                    <td>₹${item.taxableAmount.toFixed(2)}</td>
                    <td>₹${item.cgstAmount.toFixed(2)} @${item.cgstRate}%</td>
                    <td>₹${item.sgstAmount.toFixed(2)} @${item.sgstRate}%</td>
                    <td>₹${item.igstAmount.toFixed(2)} @${item.igstRate}%</td>
                    <td>₹${item.totalAmount.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="invoice-totals">
            <table class="totals-table">
              <tr>
                <td>Subtotal:</td>
                <td>₹${invoice.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>CGST:</td>
                <td>₹${invoice.cgstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>SGST:</td>
                <td>₹${invoice.sgstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>IGST:</td>
                <td>₹${invoice.igstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Cess:</td>
                <td>₹${invoice.cessAmount.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>Total Amount:</td>
                <td>₹${invoice.totalAmount.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <div class="invoice-footer">
            <p>Place of Supply: ${invoice.placeOfSupply}</p>
            <p>Reverse Charge: ${invoice.reverseCharge ? 'Yes' : 'No'}</p>
            <p>Payment Status: ${invoice.paymentStatus}</p>
            <p>This is a computer-generated invoice and does not require a signature.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  // Generate invoice PDF (simplified - returns HTML that can be printed as PDF)
  async generateInvoicePDF(invoiceId: string): Promise<string> {
    const invoice = await this.getInvoiceById(invoiceId)
    if (!invoice) {
      throw new Error('Invoice not found')
    }
    return this.generateInvoiceHTML(invoice)
  }
}

export default GSTInvoiceService