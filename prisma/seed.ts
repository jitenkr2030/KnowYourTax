import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create a default account
  const defaultAccount = await prisma.account.upsert({
    where: { email: 'demo@knowyourtax.ai' },
    update: {},
    create: {
      name: 'KnowYourTax AI Demo',
      slug: 'knowyourtax-ai-demo',
      email: 'demo@knowyourtax.ai',
      phone: '+919876543210',
      subscriptionPlan: 'FREE',
      subscriptionStatus: 'ACTIVE',
      maxUsers: 1,
      maxStorage: 1000,
      maxApiCalls: 1000,
      isActive: true,
      isVerified: true,
    },
  })

  // Create a default user
  const defaultUser = await prisma.user.upsert({
    where: { email: 'demo@knowyourtax.ai' },
    update: {},
    create: {
      email: 'demo@knowyourtax.ai',
      name: 'Demo User',
      password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      role: 'ADMIN',
      status: 'ACTIVE',
      isVerified: true,
      accountId: defaultAccount.id,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`Default Account: ${defaultAccount.name} (${defaultAccount.email})`)
  console.log(`Default User: ${defaultUser.name} (${defaultUser.email})`)
}

main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })