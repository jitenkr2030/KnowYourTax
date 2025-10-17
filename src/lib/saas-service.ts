import { db } from "@/lib/db"

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: string
  features: string[]
  limits: {
    maxUsers: number
    maxStorage: number
    maxApiCalls: number
  }
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  FREE: {
    id: "FREE",
    name: "Free",
    price: 0,
    currency: "INR",
    interval: "MONTHLY",
    features: [
      "Track up to 50 tax entries",
      "Basic tax calculations",
      "Simple dashboard",
      "Mobile app access",
      "Email support"
    ],
    limits: {
      maxUsers: 1,
      maxStorage: 100, // MB
      maxApiCalls: 1000
    }
  },
  BASIC: {
    id: "BASIC",
    name: "Basic",
    price: 99,
    currency: "INR",
    interval: "MONTHLY",
    features: [
      "Track up to 200 tax entries",
      "Advanced tax calculations",
      "Basic analytics",
      "Mobile app access",
      "Email support",
      "Export reports (PDF)"
    ],
    limits: {
      maxUsers: 1,
      maxStorage: 500, // MB
      maxApiCalls: 5000
    }
  },
  PROFESSIONAL: {
    id: "PROFESSIONAL",
    name: "Professional",
    price: 299,
    currency: "INR",
    interval: "MONTHLY",
    features: [
      "Unlimited tax entries",
      "Advanced analytics & insights",
      "AI-powered tax optimization",
      "Bill scanning & OCR",
      "GST tracking & reporting",
      "Priority support",
      "Export reports (PDF, Excel)",
      "Multi-device sync"
    ],
    limits: {
      maxUsers: 5,
      maxStorage: 2000, // MB
      maxApiCalls: 20000
    }
  },
  ENTERPRISE: {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: 999,
    currency: "INR",
    interval: "MONTHLY",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options",
      "Advanced security",
      "SLA guarantee"
    ],
    limits: {
      maxUsers: -1, // Unlimited
      maxStorage: -1, // Unlimited
      maxApiCalls: -1 // Unlimited
    }
  }
}

export class SaasService {
  static async createAccount(data: {
    name: string
    email: string
    phone?: string
    plan?: string
  }) {
    const plan = data.plan || "FREE"
    const subscriptionPlan = SUBSCRIPTION_PLANS[plan]

    // Create account
    const account = await db.account.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
        subscriptionPlan: plan,
        subscriptionStatus: "ACTIVE",
        maxUsers: subscriptionPlan.limits.maxUsers,
        maxStorage: subscriptionPlan.limits.maxStorage,
        maxApiCalls: subscriptionPlan.limits.maxApiCalls,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days trial
      }
    })

    // Create subscription
    await db.subscription.create({
      data: {
        accountId: account.id,
        plan: plan,
        price: subscriptionPlan.price,
        currency: subscriptionPlan.currency,
        interval: subscriptionPlan.interval,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        status: "ACTIVE"
      }
    })

    return account
  }

  static async upgradeAccount(accountId: string, newPlan: string) {
    const subscriptionPlan = SUBSCRIPTION_PLANS[newPlan]
    if (!subscriptionPlan) {
      throw new Error("Invalid plan")
    }

    // Update account
    const account = await db.account.update({
      where: { id: accountId },
      data: {
        subscriptionPlan: newPlan,
        maxUsers: subscriptionPlan.limits.maxUsers,
        maxStorage: subscriptionPlan.limits.maxStorage,
        maxApiCalls: subscriptionPlan.limits.maxApiCalls
      }
    })

    // Create new subscription
    await db.subscription.create({
      data: {
        accountId: accountId,
        plan: newPlan,
        price: subscriptionPlan.price,
        currency: subscriptionPlan.currency,
        interval: subscriptionPlan.interval,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: "ACTIVE"
      }
    })

    return account
  }

  static async checkAccountLimits(accountId: string) {
    const account = await db.account.findUnique({
      where: { id: accountId },
      include: {
        users: true,
        _count: {
          select: {
            taxEntries: true,
            gstEntries: true,
            fuelEntries: true,
            propertyEntries: true
          }
        }
      }
    })

    if (!account) {
      throw new Error("Account not found")
    }

    const totalEntries = 
      account._count.taxEntries + 
      account._count.gstEntries + 
      account._count.fuelEntries + 
      account._count.propertyEntries

    return {
      userLimit: {
        current: account.currentUsers,
        max: account.maxUsers,
        exceeded: account.maxUsers > 0 && account.currentUsers >= account.maxUsers
      },
      storageLimit: {
        current: account.currentStorage,
        max: account.maxStorage,
        exceeded: account.maxStorage > 0 && account.currentStorage >= account.maxStorage
      },
      apiLimit: {
        current: account.currentApiCalls,
        max: account.maxApiCalls,
        exceeded: account.maxApiCalls > 0 && account.currentApiCalls >= account.maxApiCalls
      },
      entryLimit: {
        current: totalEntries,
        max: account.subscriptionPlan === "FREE" ? 50 : -1, // Only free plan has entry limit
        exceeded: account.subscriptionPlan === "FREE" && totalEntries >= 50
      }
    }
  }

  static async trackApiUsage(accountId: string) {
    await db.account.update({
      where: { id: accountId },
      data: {
        currentApiCalls: {
          increment: 1
        }
      }
    })

    // Track analytics
    await db.accountAnalytics.create({
      data: {
        accountId,
        date: new Date(),
        metric: "API_CALLS",
        value: 1
      }
    })
  }

  static async getAccountAnalytics(accountId: string, days: number = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const analytics = await db.accountAnalytics.findMany({
      where: {
        accountId,
        date: {
          gte: startDate
        }
      },
      orderBy: {
        date: "asc"
      }
    })

    return analytics
  }

  static async getAccountStats(accountId: string) {
    const account = await db.account.findUnique({
      where: { id: accountId },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            lastLoginAt: true
          }
        },
        subscriptions: {
          orderBy: {
            createdAt: "desc"
          },
          take: 1
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
      }
    })

    if (!account) {
      throw new Error("Account not found")
    }

    return {
      account,
      stats: {
        totalUsers: account._count.users,
        totalTaxEntries: account._count.taxEntries,
        totalGstEntries: account._count.gstEntries,
        totalFuelEntries: account._count.fuelEntries,
        totalPropertyEntries: account._count.propertyEntries,
        totalEntries: account._count.taxEntries + account._count.gstEntries + account._count.fuelEntries + account._count.propertyEntries
      }
    }
  }
}