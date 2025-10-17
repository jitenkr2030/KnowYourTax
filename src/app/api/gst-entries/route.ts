import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const gstEntries = await db.gSTEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json({ gstEntries })
  } catch (error) {
    console.error('Error fetching GST entries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      userId, 
      amount, 
      gstAmount, 
      cgstAmount, 
      sgstAmount, 
      igstAmount, 
      cessAmount,
      billNumber,
      billDate,
      supplierName,
      supplierGSTIN,
      category,
      description
    } = body

    if (!userId || !amount || !gstAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const gstEntry = await db.gSTEntry.create({
      data: {
        userId,
        amount: parseFloat(amount),
        gstAmount: parseFloat(gstAmount),
        cgstAmount: cgstAmount ? parseFloat(cgstAmount) : null,
        sgstAmount: sgstAmount ? parseFloat(sgstAmount) : null,
        igstAmount: igstAmount ? parseFloat(igstAmount) : null,
        cessAmount: cessAmount ? parseFloat(cessAmount) : null,
        billNumber,
        billDate: billDate ? new Date(billDate) : null,
        supplierName,
        supplierGSTIN,
        category,
        description,
        financialYear: "2024-25", // Default to current financial year
        date: new Date(),
        isVerified: false,
        verificationStatus: "PENDING"
      }
    })

    return NextResponse.json({ gstEntry })
  } catch (error) {
    console.error('Error creating GST entry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}