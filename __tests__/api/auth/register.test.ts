import { POST } from '@/app/api/auth/register/route'
import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

// Mock dependencies
jest.mock('bcryptjs')
jest.mock('@/lib/saas-service')
jest.mock('@/lib/db')

const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
const mockSaasService = require('@/lib/saas-service')
const mockDb = require('@/lib/db').db

describe('Registration API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return 400 when required fields are missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        // missing password
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing required fields')
  })

  test('should return 400 when user already exists', async () => {
    mockDb.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'john@example.com',
    })

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('User already exists with this email')
  })

  test('should create account and user successfully', async () => {
    // Setup mocks
    mockDb.user.findUnique.mockResolvedValue(null)
    mockBcrypt.hash.mockResolvedValue('hashed-password')
    mockSaasService.SaasService.createAccount.mockResolvedValue({
      id: 'account-1',
      name: 'John Doe',
      subscriptionPlan: 'free',
    })
    mockDb.user.create.mockResolvedValue({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      password: 'hashed-password',
      accountId: 'account-1',
    })
    mockDb.userProfile.create.mockResolvedValue({
      userId: 'user-1',
    })

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Account created successfully')
    expect(data.user).toEqual({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    })
    expect(data.account).toEqual({
      id: 'account-1',
      name: 'John Doe',
      subscriptionPlan: 'free',
    })

    // Verify function calls
    expect(mockDb.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'john@example.com' },
    })
    expect(mockBcrypt.hash).toHaveBeenCalledWith('password123', 12)
    expect(mockSaasService.SaasService.createAccount).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
    })
    expect(mockDb.user.create).toHaveBeenCalledWith({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        password: 'hashed-password',
        accountId: 'account-1',
      },
    })
    expect(mockDb.userProfile.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
      },
    })
  })

  test('should handle phone field as optional', async () => {
    // Setup mocks
    mockDb.user.findUnique.mockResolvedValue(null)
    mockBcrypt.hash.mockResolvedValue('hashed-password')
    mockSaasService.SaasService.createAccount.mockResolvedValue({
      id: 'account-1',
      name: 'John Doe',
      subscriptionPlan: 'free',
    })
    mockDb.user.create.mockResolvedValue({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: null,
      password: 'hashed-password',
      accountId: 'account-1',
    })
    mockDb.userProfile.create.mockResolvedValue({
      userId: 'user-1',
    })

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        // no phone field
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Account created successfully')

    // Verify SaasService is called without phone
    expect(mockSaasService.SaasService.createAccount).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      phone: undefined,
    })
  })

  test('should return 500 when an error occurs', async () => {
    mockDb.user.findUnique.mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
  })

  test('should handle bcrypt hashing error', async () => {
    mockDb.user.findUnique.mockResolvedValue(null)
    mockBcrypt.hash.mockRejectedValue(new Error('Hashing error'))

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
  })

  test('should handle SaasService error', async () => {
    mockDb.user.findUnique.mockResolvedValue(null)
    mockBcrypt.hash.mockResolvedValue('hashed-password')
    mockSaasService.SaasService.createAccount.mockRejectedValue(new Error('Account creation error'))

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
  })

  test('should handle user creation error', async () => {
    mockDb.user.findUnique.mockResolvedValue(null)
    mockBcrypt.hash.mockResolvedValue('hashed-password')
    mockSaasService.SaasService.createAccount.mockResolvedValue({
      id: 'account-1',
      name: 'John Doe',
      subscriptionPlan: 'free',
    })
    mockDb.user.create.mockRejectedValue(new Error('User creation error'))

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
  })
})