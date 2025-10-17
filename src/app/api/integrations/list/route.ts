import { NextRequest, NextResponse } from 'next/server'
import IntegrationService from '@/lib/integration-service'

const integrationService = new IntegrationService({
  quickbooks: {
    clientId: process.env.QUICKBOOKS_CLIENT_ID!,
    clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/quickbooks/callback`,
  },
  zoho: {
    clientId: process.env.ZOHO_CLIENT_ID!,
    clientSecret: process.env.ZOHO_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/zoho/callback`,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/google/callback`,
  },
  microsoft: {
    clientId: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/microsoft/callback`,
  },
})

export async function GET() {
  try {
    const integrations = integrationService.getIntegrations()
    
    return NextResponse.json({
      success: true,
      integrations,
    })
  } catch (error) {
    console.error('Integration list error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
