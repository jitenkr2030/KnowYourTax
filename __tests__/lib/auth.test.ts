import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// Mock dependencies
jest.mock('bcryptjs')
jest.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
    },
  },
}))

const mockDb = require('@/lib/db').db
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

describe('Authentication Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Credentials Provider', () => {
    const credentialsProvider = authOptions.providers[0]

    test('should return null when credentials are missing', async () => {
      const result = await credentialsProvider.authorize?.({
        email: '',
        password: '',
      })

      expect(result).toBeNull()
    })

    test('should return null when user not found', async () => {
      mockDb.user.findUnique.mockResolvedValue(null)

      const result = await credentialsProvider.authorize?.({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result).toBeNull()
    })

    test('should return null when user has no password', async () => {
      mockDb.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: null,
        role: 'user',
        accountId: 'account-1',
        account: null,
      })

      const result = await credentialsProvider.authorize?.({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result).toBeNull()
    })

    test('should return null when password is invalid', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed-password',
        role: 'user',
        accountId: 'account-1',
        account: null,
      }

      mockDb.user.findUnique.mockResolvedValue(mockUser)
      mockBcrypt.compare.mockResolvedValue(false)

      const result = await credentialsProvider.authorize?.({
        email: 'test@example.com',
        password: 'wrong-password',
      })

      expect(result).toBeNull()
    })

    test('should return user object when authentication is successful', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed-password',
        role: 'admin',
        accountId: 'account-1',
        account: {
          isActive: true,
        },
      }

      mockDb.user.findUnique.mockResolvedValue(mockUser)
      mockBcrypt.compare.mockResolvedValue(true)

      const result = await credentialsProvider.authorize?.({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'admin',
        accountId: 'account-1',
      })
    })
  })

  describe('JWT Callback', () => {
    test('should add role and accountId to token when user is provided', async () => {
      const token = { sub: '1' }
      const user = {
        id: '1',
        role: 'admin',
        accountId: 'account-1',
      }

      const result = await authOptions.callbacks?.jwt?.({ token, user })

      expect(result).toEqual({
        ...token,
        role: 'admin',
        accountId: 'account-1',
      })
    })

    test('should not modify token when user is not provided', async () => {
      const token = { sub: '1' }

      const result = await authOptions.callbacks?.jwt?.({ token })

      expect(result).toEqual(token)
    })
  })

  describe('Session Callback', () => {
    test('should add user data to session when token is provided', async () => {
      const session = {
        user: {
          id: '',
          role: '',
          accountId: '',
        },
      }
      const token = {
        sub: 'user-1',
        role: 'admin',
        accountId: 'account-1',
      }

      const result = await authOptions.callbacks?.session?.({ session, token })

      expect(result).toEqual({
        user: {
          id: 'user-1',
          role: 'admin',
          accountId: 'account-1',
        },
      })
    })

    test('should not modify session when token is not provided', async () => {
      const session = {
        user: {
          id: '',
          role: '',
          accountId: '',
        },
      }

      const result = await authOptions.callbacks?.session?.({ session, token: {} })

      expect(result).toEqual(session)
    })
  })

  describe('Auth Options Configuration', () => {
    test('should use Prisma adapter', () => {
      expect(authOptions.adapter).toBeDefined()
    })

    test('should use JWT session strategy', () => {
      expect(authOptions.session?.strategy).toBe('jwt')
    })

    test('should have correct page configurations', () => {
      expect(authOptions.pages?.signIn).toBe('/auth/signin')
      expect(authOptions.pages?.signUp).toBe('/auth/signup')
    })

    test('should have credentials provider configured', () => {
      expect(authOptions.providers).toHaveLength(1)
      expect(authOptions.providers[0].name.toLowerCase()).toBe('credentials')
    })
  })
})