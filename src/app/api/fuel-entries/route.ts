import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const fuelEntries = await db.fuelEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json({ fuelEntries })
  } catch (error) {
    console.error('Error fetching fuel entries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      userId, 
      fuelType, 
      quantity, 
      amount, 
      taxAmount, 
      pricePerLiter,
      city,
      state
    } = body

    if (!userId || !fuelType || !quantity || !amount || !taxAmount || !pricePerLiter) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const fuelEntry = await db.fuelEntry.create({
      data: {
        userId,
        fuelType,
        quantity: parseFloat(quantity),
        amount: parseFloat(amount),
        taxAmount: parseFloat(taxAmount),
        pricePerLiter: parseFloat(pricePerLiter),
        city,
        state,
        financialYear: "2024-25", // Default to current financial year
        date: new Date()
      }
    })

    return NextResponse.json({ fuelEntry })
  } catch (error) {
    console.error('Error creating fuel entry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}