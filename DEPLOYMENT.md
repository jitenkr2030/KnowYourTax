# Vercel Deployment Guide

## Quick Start

### 1. Connect to Vercel

1. **Push your code to GitHub** (already done)
2. **Go to [vercel.com](https://vercel.com)** and sign up/login
3. **Import your GitHub repository**:
   - Click "New Project"
   - Select your `KnowYourTax` repository
   - Click "Import"

### 2. Configure Environment Variables

In the Vercel project dashboard, go to **Settings** → **Environment Variables** and add:

#### Required Variables
```bash
DATABASE_URL=file:/tmp/custom.db
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=generate-a-secure-32-character-secret
```

#### Optional Variables (for production)
```bash
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

### 3. Deploy

Click **"Deploy"** and wait for the build to complete.

## Detailed Configuration

### Environment Variables Setup

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ | SQLite database path | `file:/tmp/custom.db` |
| `NEXTAUTH_URL` | ✅ | Your deployed app URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | ✅ | JWT secret key | `32+ character random string` |
| `RAZORPAY_KEY_ID` | ❌ | Razorpay payment key | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | ❌ | Razorpay payment secret | `your_secret_key` |

### Database Configuration

#### For Development/Demo (SQLite)
- Uses SQLite with file storage in `/tmp/custom.db`
- **Limitation**: Database resets on each deployment
- **Good for**: Testing, demonstrations, development

#### For Production (Recommended)
Choose one of these managed databases:

**Option 1: Vercel Postgres**
```bash
# In Vercel dashboard:
1. Storage → Create Database → Postgres
2. Copy connection string
3. Set DATABASE_URL to: postgresql://user:password@host:port/database
```

**Option 2: PlanetScale**
```bash
# DATABASE_URL format:
mysql://user:password@host:port/database?sslaccept=strict
```

**Option 3: Supabase**
```bash
# DATABASE_URL format:
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres
```

### Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to **Settings** → **Domains**
   - Add your custom domain (e.g., `knowyourtax.com`)

2. **DNS Configuration**:
   - Add these DNS records:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates
   - Wait for SSL to be issued (usually takes a few minutes)

## Deployment Process

### Automatic Deployment

Your project is set up for automatic deployment:

1. **Push to main/master branch** → Auto-deploys to Production
2. **Push to any other branch** → Creates Preview Deployment

### Manual Deployment

1. **In Vercel Dashboard**:
   - Go to your project
   - Click **"Deploy"** → **"Redeploy"**

2. **Using Vercel CLI**:
   ```bash
   vercel --prod
   ```

## Troubleshooting

### Common Issues

#### 1. "DATABASE_URL references Secret database_url, which does not exist"
**Solution**: 
- Go to Vercel Settings → Environment Variables
- Add `DATABASE_URL` with value: `file:/tmp/custom.db`
- Redeploy the application

#### 2. Build Errors
**Solution**:
- Check Node.js version (requires 18.x+)
- Run `npm run build` locally first
- Clear Vercel build cache in Settings

#### 3. Runtime Errors
**Solution**:
- Check Vercel Functions tab for logs
- Verify all environment variables are set
- Ensure database connection works

#### 4. NextAuth Issues
**Solution**:
- Verify `NEXTAUTH_URL` matches your deployed URL
- Ensure `NEXTAUTH_SECRET` is at least 32 characters
- Check callback URLs in OAuth provider settings

### Performance Optimization

#### Enable Caching
```json
// In vercel.json
{
  "caching": {
    "rules": [
      {
        "path": "/api/(.*)",
        "rule": "public",
        "maxAge": 3600
      }
    ]
  }
}
```

#### Optimize Images
```json
// In next.config.js
module.exports = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif']
  }
}
```

## Monitoring & Analytics

### Vercel Analytics
1. **Enable in Dashboard**:
   - Go to **Analytics** tab
   - Click "Enable Analytics"

2. **Real-time Metrics**:
   - Page views
   - Core Web Vitals
   - Error rates

### Error Tracking
Consider adding:
- **Sentry**: `npm install @sentry/nextjs`
- **LogRocket**: `npm install logrocket`

### Uptime Monitoring
Set up health checks:
```bash
# Add to your project
curl https://your-app.vercel.app/api/health
```

## Security Best Practices

### Environment Variables
- **Never commit** `.env` files
- **Use strong secrets** (32+ characters for NEXTAUTH_SECRET)
- **Rotate secrets** regularly
- **Use different secrets** for development and production

### HTTPS
- Vercel automatically provides HTTPS
- Force HTTPS redirects:
  ```javascript
  // In next.config.js
  module.exports = {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000; includeSubDomains; preload'
            }
          ]
        }
      ]
    }
  }
  ```

### Rate Limiting
Add rate limiting to API routes:
```javascript
// In your API routes
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

## Backup & Recovery

### Database Backups
For SQLite (development):
```bash
# Backup
cp /tmp/custom.db /tmp/custom.db.backup

# Restore
cp /tmp/custom.db.backup /tmp/custom.db
```

For production databases:
- Use provider's backup features
- Set up automated daily backups

### Code Recovery
- All code is in GitHub repository
- Use Git to revert to previous versions:
  ```bash
  git log --oneline
  git checkout <commit-hash>
  ```

## Scaling

### Vertical Scaling
- **Upgrade Vercel plan** for more resources
- **Increase function timeouts** in vercel.json

### Horizontal Scaling
- **Add more regions** in Vercel settings
- **Use CDN** for static assets

### Database Scaling
- **Migrate to managed database** for production
- **Add read replicas** for high traffic
- **Use connection pooling**

---

## Support

If you encounter issues:

1. **Check Vercel logs** in Functions tab
2. **Review this guide** for common solutions
3. **Check GitHub issues** for known problems
4. **Contact Vercel support** for platform issues

For development questions, refer to the project documentation or create an issue in the GitHub repository.