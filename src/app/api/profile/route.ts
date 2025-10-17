import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user with profile
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        profile: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userData, profileData } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Update user data
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: userData.name,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
        panNumber: userData.panNumber,
        aadhaarNumber: userData.aadhaarNumber,
        preferredLanguage: userData.preferredLanguage
      }
    })

    // Update or create profile
    let updatedProfile
    if (profileData) {
      updatedProfile = await db.userProfile.upsert({
        where: { userId },
        update: {
          employmentType: profileData.employmentType,
          employerName: profileData.employerName,
          designation: profileData.designation,
          businessName: profileData.businessName,
          businessType: profileData.businessType,
          addressLine1: profileData.addressLine1,
          addressLine2: profileData.addressLine2,
          city: profileData.city,
          state: profileData.state,
          pincode: profileData.pincode,
          taxRegime: profileData.taxRegime,
          taxSlab: profileData.taxSlab
        },
        create: {
          userId,
          employmentType: profileData.employmentType,
          employerName: profileData.employerName,
          designation: profileData.designation,
          businessName: profileData.businessName,
          businessType: profileData.businessType,
          addressLine1: profileData.addressLine1,
          addressLine2: profileData.addressLine2,
          city: profileData.city,
          state: profileData.state,
          pincode: profileData.pincode,
          taxRegime: profileData.taxRegime,
          taxSlab: profileData.taxSlab
        }
      })
    }

    return NextResponse.json({ 
      user: updatedUser,
      profile: updatedProfile
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}