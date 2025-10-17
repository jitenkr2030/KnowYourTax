import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const propertyEntries = await db.propertyEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json({ propertyEntries })
  } catch (error) {
    console.error('Error fetching property entries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      userId, 
      propertyType, 
      taxType, 
      amount, 
      propertyAddress,
      propertyCity,
      propertyState,
      vehicleType,
      vehicleNumber,
      date
    } = body

    if (!userId || !propertyType || !taxType || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const propertyEntry = await db.propertyEntry.create({
      data: {
        userId,
        propertyType,
        taxType,
        amount: parseFloat(amount),
        propertyAddress,
        propertyCity,
        propertyState,
        vehicleType,
        vehicleNumber,
        financialYear: "2024-25", // Default to current financial year
        date: date ? new Date(date) : new Date(),
        isVerified: false,
        verificationStatus: "PENDING"
      }
    })

    return NextResponse.json({ propertyEntry })
  } catch (error) {
    console.error('Error creating property entry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}