#!/bin/bash

# KnowYourTax.ai Vercel Deployment Script
# This script will deploy your application to Vercel using the CLI

echo "🚀 Starting KnowYourTax.ai deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (this will open a browser for authentication)
echo "🔐 Please log in to Vercel..."
vercel login

# Link the project to your existing Vercel project
echo "🔗 Linking project to Vercel..."
vercel link --project-id prj_iNxxSQNsajfaG6lfvozO8k9LMUkg

# Deploy the application
echo "🚀 Deploying application..."
vercel --prod

echo "✅ Deployment complete!"
echo "📊 Your application is now live on Vercel!"
echo "🔗 Check your Vercel dashboard for the deployment URL"