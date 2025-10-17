import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { SaasService } from "@/lib/saas-service"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create account
    const account = await SaasService.createAccount({
      name,
      email,
      phone
    })

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        accountId: account.id
      }
    })

    // Create user profile
    await db.userProfile.create({
      data: {
        userId: user.id
      }
    })

    return NextResponse.json({
      message: "Account created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      account: {
        id: account.id,
        name: account.name,
        subscriptionPlan: account.subscriptionPlan
      }
    })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}