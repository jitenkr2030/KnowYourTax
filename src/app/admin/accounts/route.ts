import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const accounts = await db.account.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            lastLoginAt: true
          }
        },
        _count: {
          select: {
            taxEntries: true,
            gstEntries: true,
            fuelEntries: true,
            propertyEntries: true,
            users: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 50 // Limit to 50 accounts for performance
    })

    return NextResponse.json(accounts)

  } catch (error) {
    console.error("Error fetching accounts:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}