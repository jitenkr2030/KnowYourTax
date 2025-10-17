import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const taxEntries = await db.taxEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json({ taxEntries })
  } catch (error) {
    console.error('Error fetching tax entries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, taxType, amount, description, category, date, source } = body

    if (!userId || !taxType || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const taxEntry = await db.taxEntry.create({
      data: {
        userId,
        taxType,
        amount: parseFloat(amount),
        description,
        category,
        financialYear: "2024-25", // Default to current financial year
        date: new Date(date),
        source: source || "Manual",
        isVerified: false,
        verificationStatus: "PENDING"
      }
    })

    return NextResponse.json({ taxEntry })
  } catch (error) {
    console.error('Error creating tax entry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}