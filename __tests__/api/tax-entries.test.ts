import { GET, POST } from '@/app/api/tax-entries/route'
import { NextRequest } from 'next/server'

// Mock dependencies
jest.mock('@/lib/db')

const mockDb = require('@/lib/db').db

describe('Tax Entries API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET method', () => {
    test('should return 400 when userId is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/tax-entries', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('User ID is required')
    })

    test('should return tax entries when userId is provided', async () => {
      const mockTaxEntries = [
        {
          id: '1',
          userId: 'user123',
          taxType: 'Income Tax',
          amount: 5000,
          description: 'Monthly income tax',
          category: 'Income',
          date: new Date('2024-01-15'),
          financialYear: '2024-25',
          source: 'Manual',
          isVerified: false,
          verificationStatus: 'PENDING',
        },
        {
          id: '2',
          userId: 'user123',
          taxType: 'GST',
          amount: 1200,
          description: 'GST payment',
          category: 'GST',
          date: new Date('2024-01-20'),
          financialYear: '2024-25',
          source: 'Manual',
          isVerified: false,
          verificationStatus: 'PENDING',
        },
      ]

      mockDb.taxEntry.findMany.mockResolvedValue(mockTaxEntries)

      const request = new NextRequest('http://localhost:3000/api/tax-entries?userId=user123', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.taxEntries).toEqual(mockTaxEntries)
      expect(mockDb.taxEntry.findMany).toHaveBeenCalledWith({
        where: { userId: 'user123' },
        orderBy: { date: 'desc' },
      })
    })

    test('should handle database errors', async () => {
      mockDb.taxEntry.findMany.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/tax-entries?userId=user123', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })

  describe('POST method', () => {
    test('should return 400 when required fields are missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/tax-entries', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user123',
          taxType: 'Income Tax',
          // missing amount
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })

    test('should create tax entry successfully', async () => {
      const mockTaxEntry = {
        id: '1',
        userId: 'user123',
        taxType: 'Income Tax',
        amount: 5000,
        description: 'Monthly income tax',
        category: 'Income',
        date: new Date('2024-01-15'),
        financialYear: '2024-25',
        source: 'Manual',
        isVerified: false,
        verificationStatus: 'PENDING',
      }

      mockDb.taxEntry.create.mockResolvedValue(mockTaxEntry)

      const request = new NextRequest('http://localhost:3000/api/tax-entries', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user123',
          taxType: 'Income Tax',
          amount: '5000',
          description: 'Monthly income tax',
          category: 'Income',
          date: '2024-01-15',
          source: 'Manual',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.taxEntry).toEqual(mockTaxEntry)
      expect(mockDb.taxEntry.create).toHaveBeenCalledWith({
        data: {
          userId: 'user123',
          taxType: 'Income Tax',
          amount: 5000,
          description: 'Monthly income tax',
          category: 'Income',
          financialYear: '2024-25',
          date: new Date('2024-01-15'),
          source: 'Manual',
          isVerified: false,
          verificationStatus: 'PENDING',
        },
      })
    })

    test('should handle optional fields correctly', async () => {
      const mockTaxEntry = {
        id: '1',
        userId: 'user123',
        taxType: 'Income Tax',
        amount: 5000,
        description: null,
        category: null,
        date: new Date('2024-01-15'),
        financialYear: '2024-25',
        source: 'Manual',
        isVerified: false,
        verificationStatus: 'PENDING',
      }

      mockDb.taxEntry.create.mockResolvedValue(mockTaxEntry)

      const request = new NextRequest('http://localhost:3000/api/tax-entries', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user123',
          taxType: 'Income Tax',
          amount: '5000',
          date: '2024-01-15',
          // missing optional fields: description, category, source
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.taxEntry).toEqual(mockTaxEntry)
      expect(mockDb.taxEntry.create).toHaveBeenCalledWith({
        data: {
          userId: 'user123',
          taxType: 'Income Tax',
          amount: 5000,
          description: null,
          category: null,
          financialYear: '2024-25',
          date: new Date('2024-01-15'),
          source: 'Manual',
          isVerified: false,
          verificationStatus: 'PENDING',
        },
      })
    })

    test('should parse amount as float', async () => {
      const mockTaxEntry = {
        id: '1',
        userId: 'user123',
        taxType: 'Income Tax',
        amount: 5000.5,
        description: 'Test tax',
        category: 'Income',
        date: new Date('2024-01-15'),
        financialYear: '2024-25',
        source: 'Manual',
        isVerified: false,
        verificationStatus: 'PENDING',
      }

      mockDb.taxEntry.create.mockResolvedValue(mockTaxEntry)

      const request = new NextRequest('http://localhost:3000/api/tax-entries', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user123',
          taxType: 'Income Tax',
          amount: '5000.5',
          description: 'Test tax',
          category: 'Income',
          date: '2024-01-15',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.taxEntry.amount).toBe(5000.5)
      expect(mockDb.taxEntry.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          amount: 5000.5,
        }),
      })
    })

    test('should handle database errors', async () => {
      mockDb.taxEntry.create.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/tax-entries', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user123',
          taxType: 'Income Tax',
          amount: '5000',
          date: '2024-01-15',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })

    test('should handle invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/tax-entries', {
        method: 'POST',
        body: 'invalid json',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })
})