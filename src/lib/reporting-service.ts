import { db } from './db'

export interface ReportConfig {
  dateRange: {
    start: Date
    end: Date
  }
  format: 'pdf' | 'excel' | 'csv'
  includeCharts: boolean
  includeDetails: boolean
}

export interface TaxSummaryReport {
  totalTaxPaid: number
  averageMonthlyTax: number
  taxByCategory: Array<{
    category: string
    amount: number
    percentage: number
  }>
  monthlyTrend: Array<{
    month: string
    amount: number
    year: number
  }>
  topPayments: Array<{
    id: string
    taxType: string
    amount: number
    date: string
  }>
}

export interface FinancialReport {
  income: number
  expenses: number
  taxDeductions: number
  netTaxable: number
  taxRate: number
  comparison: {
    previousYear: number
    currentYear: number
    growth: number
  }
}

export interface ComplianceReport {
  onTimePayments: number
  latePayments: number
  complianceRate: number
  upcomingDeadlines: Array<{
    taxType: string
    dueDate: string
    amount: number
    daysLeft: number
  }>
  riskAssessment: {
    low: number
    medium: number
    high: number
  }
}

class ReportingService {
  async generateTaxSummaryReport(
    userId: string,
    config: ReportConfig
  ): Promise<TaxSummaryReport> {
    const payments = await db.taxPayment.findMany({
      where: {
        userId,
        date: {
          gte: config.dateRange.start,
          lte: config.dateRange.end,
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    const totalTaxPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)
    const averageMonthlyTax = totalTaxPaid / 12

    // Group by category
    const categoryMap = new Map<string, number>()
    payments.forEach(payment => {
      const current = categoryMap.get(payment.taxCategory) || 0
      categoryMap.set(payment.taxCategory, current + payment.amount)
    })

    const taxByCategory = Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalTaxPaid) * 100,
    }))

    // Monthly trend
    const monthlyMap = new Map<string, number>()
    payments.forEach(payment => {
      const monthKey = `${payment.year}-${String(payment.month).padStart(2, '0')}`
      const current = monthlyMap.get(monthKey) || 0
      monthlyMap.set(monthKey, current + payment.amount)
    })

    const monthlyTrend = Array.from(monthlyMap.entries()).map(([monthKey, amount]) => {
      const [year, month] = monthKey.split('-')
      return {
        month: new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' }),
        amount,
        year: parseInt(year),
      }
    })

    // Top payments
    const topPayments = payments.slice(0, 10).map(payment => ({
      id: payment.id,
      taxType: payment.taxName,
      amount: payment.amount,
      date: payment.date.toISOString(),
    }))

    return {
      totalTaxPaid,
      averageMonthlyTax,
      taxByCategory,
      monthlyTrend,
      topPayments,
    }
  }

  async generateFinancialReport(
    userId: string,
    config: ReportConfig
  ): Promise<FinancialReport> {
    const currentYear = new Date().getFullYear()
    const previousYear = currentYear - 1

    const currentYearPayments = await db.taxPayment.findMany({
      where: {
        userId,
        year: currentYear.toString(),
      },
    })

    const previousYearPayments = await db.taxPayment.findMany({
      where: {
        userId,
        year: previousYear.toString(),
      },
    })

    const currentYearTotal = currentYearPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const previousYearTotal = previousYearPayments.reduce((sum, payment) => sum + payment.amount, 0)

    const growth = previousYearTotal > 0 ? ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100 : 0

    // Estimate income and expenses based on tax payments
    const estimatedIncome = currentYearTotal * 5 // Rough estimate
    const estimatedExpenses = estimatedIncome * 0.6 // Rough estimate
    const taxDeductions = currentYearTotal
    const netTaxable = estimatedIncome - estimatedExpenses
    const taxRate = estimatedIncome > 0 ? (currentYearTotal / estimatedIncome) * 100 : 0

    return {
      income: estimatedIncome,
      expenses: estimatedExpenses,
      taxDeductions,
      netTaxable,
      taxRate,
      comparison: {
        previousYear: previousYearTotal,
        currentYear: currentYearTotal,
        growth,
      },
    }
  }

  async generateComplianceReport(
    userId: string,
    config: ReportConfig
  ): Promise<ComplianceReport> {
    const payments = await db.taxPayment.findMany({
      where: {
        userId,
        date: {
          gte: config.dateRange.start,
          lte: config.dateRange.end,
        },
      },
    })

    // Calculate on-time vs late payments (simplified logic)
    const onTimePayments = payments.filter(payment => {
      const paymentDate = new Date(payment.date)
      const dueDate = new Date(paymentDate)
      dueDate.setDate(dueDate.getDate() + 15) // Assume 15-day grace period
      return paymentDate <= dueDate
    }).length

    const latePayments = payments.length - onTimePayments
    const complianceRate = payments.length > 0 ? (onTimePayments / payments.length) * 100 : 0

    // Upcoming deadlines (simplified)
    const upcomingDeadlines = [
      {
        taxType: 'Income Tax',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 5000,
        daysLeft: 30,
      },
      {
        taxType: 'GST',
        dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 3000,
        daysLeft: 20,
      },
    ]

    // Risk assessment (simplified)
    const riskAssessment = {
      low: Math.floor(Math.random() * 20) + 60,
      medium: Math.floor(Math.random() * 15) + 20,
      high: Math.floor(Math.random() * 10) + 5,
    }

    return {
      onTimePayments,
      latePayments,
      complianceRate,
      upcomingDeadlines,
      riskAssessment,
    }
  }

  async generateCustomReport(
    userId: string,
    reportType: string,
    config: ReportConfig
  ): Promise<any> {
    switch (reportType) {
      case 'tax-summary':
        return await this.generateTaxSummaryReport(userId, config)
      case 'financial':
        return await this.generateFinancialReport(userId, config)
      case 'compliance':
        return await this.generateComplianceReport(userId, config)
      default:
        throw new Error('Unknown report type')
    }
  }

  async exportReport(
    reportData: any,
    format: 'pdf' | 'excel' | 'csv'
  ): Promise<Buffer> {
    switch (format) {
      case 'pdf':
        return await this.exportToPDF(reportData)
      case 'excel':
        return await this.exportToExcel(reportData)
      case 'csv':
        return await this.exportToCSV(reportData)
      default:
        throw new Error('Unsupported export format')
    }
  }

  private async exportToPDF(reportData: any): Promise<Buffer> {
    // This would use a PDF library like puppeteer or pdfkit
    // For now, return a mock implementation
    const pdfContent = JSON.stringify(reportData, null, 2)
    return Buffer.from(pdfContent, 'utf8')
  }

  private async exportToExcel(reportData: any): Promise<Buffer> {
    // This would use an Excel library like exceljs
    // For now, return a mock implementation
    const excelContent = JSON.stringify(reportData, null, 2)
    return Buffer.from(excelContent, 'utf8')
  }

  private async exportToCSV(reportData: any): Promise<Buffer> {
    // This would convert the data to CSV format
    // For now, return a mock implementation
    const csvContent = JSON.stringify(reportData, null, 2)
    return Buffer.from(csvContent, 'utf8')
  }

  async scheduleReport(
    userId: string,
    reportType: string,
    schedule: {
      frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
      format: 'pdf' | 'excel' | 'csv'
      email: boolean
      whatsapp: boolean
    }
  ): Promise<void> {
    // This would create a scheduled report job
    // For now, it's a placeholder implementation
    console.log(`Scheduled report for user ${userId}: ${reportType} - ${schedule.frequency}`)
  }

  async getReportTemplates(): Promise<Array<{
    id: string
    name: string
    description: string
    type: string
    isDefault: boolean
  }>> {
    return [
      {
        id: 'tax-summary-monthly',
        name: 'Monthly Tax Summary',
        description: 'Comprehensive monthly tax payment summary',
        type: 'tax-summary',
        isDefault: true,
      },
      {
        id: 'financial-yearly',
        name: 'Yearly Financial Report',
        description: 'Complete financial analysis for the year',
        type: 'financial',
        isDefault: true,
      },
      {
        id: 'compliance-quarterly',
        name: 'Quarterly Compliance Report',
        description: 'Tax compliance status and risk assessment',
        type: 'compliance',
        isDefault: true,
      },
      {
        id: 'custom-tax-analysis',
        name: 'Custom Tax Analysis',
        description: 'Customizable tax analysis report',
        type: 'custom',
        isDefault: false,
      },
    ]
  }

  async getReportHistory(
    userId: string,
    limit: number = 10
  ): Promise<Array<{
    id: string
    name: string
    type: string
    generatedAt: Date
    format: string
    downloadUrl: string
  }>> {
    // This would fetch report history from the database
    // For now, return mock data
    return [
      {
        id: '1',
        name: 'Monthly Tax Summary - January 2024',
        type: 'tax-summary',
        generatedAt: new Date('2024-01-31'),
        format: 'pdf',
        downloadUrl: '/api/reports/1/download',
      },
      {
        id: '2',
        name: 'Financial Report - 2023',
        type: 'financial',
        generatedAt: new Date('2023-12-31'),
        format: 'excel',
        downloadUrl: '/api/reports/2/download',
      },
    ]
  }
}

export default ReportingService
