# Deployment Guide - EZclass Frontend Assessment

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI

1. **Install Vercel CLI** (if not already installed)

   ```bash
   npm install -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Follow prompts**
   - Select project name
   - Choose framework (Next.js)
   - Accept defaults or customize

4. **Get your deployment URL**
   ```
   https://<your-project-name>.vercel.app
   ```

### Option 2: GitHub Integration (Recommended)

1. **Push code to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Placement Test"
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from Git
   - Select your repository
   - Click Deploy

3. **Automatic deployments**
   - Every push to `main` automatically deploys
   - Preview deployments for pull requests

## 📋 Pre-Deployment Checklist

- [ ] All tests pass: `npm test`
- [ ] No TypeScript errors: `npm run build`
- [ ] Environment variables configured
- [ ] `.env.local` is in `.gitignore`
- [ ] README is complete and accurate
- [ ] GitHub repository is public or shared
- [ ] All features working in production build

## 🔧 Environment Configuration on Vercel

1. **Go to project settings on Vercel dashboard**
2. **Navigate to "Environment Variables"**
3. **Add the following variables:**

   | Name                              | Value            | Type   |
   | --------------------------------- | ---------------- | ------ |
   | NEXT_PUBLIC_API_BASE_URL          | (Deployment URL) | Public |
   | NEXT_PUBLIC_ENABLE_RESULT_POLLING | true             | Public |
   | NEXT_PUBLIC_POLL_INTERVAL_MS      | 1500             | Public |

## 📦 Alternative Deployments

### Deploy to Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create app
heroku create <app-name>

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to Railway.app

1. Visit [railway.app](https://railway.app)
2. Connect GitHub account
3. Select your repository
4. Configure environment variables
5. Deploy

### Deploy to AWS Amplify

```bash
# Install AWS CLI and configure credentials
npm install -g @aws-amplify/cli
amplify init

# Connect and deploy
amplify publish
```

### Deploy to Azure WebApp

```bash
# Create resource group
az group create --name myResourceGroup --location eastus

# Create App Service Plan
az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1 --is-linux

# Create Web App
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name myApp --runtime "NODE|18-lts"

# Deploy
az webapp deployment source config-zip --resource-group myResourceGroup --name myApp --src app.zip
```

## 🔍 Monitoring & Logs

### Vercel Logs

```bash
# View deployment logs
vercel logs <url>

# View function logs
vercel logs <url> --follow
```

### Check Deployment Health

1. Visit your deployment URL
2. Open browser DevTools Console
3. Verify no errors
4. Test full workflow:
   - Answer all questions
   - Submit test
   - Wait for results
   - Download certificate

## 🐛 Troubleshooting Deployment

### Build fails with "ENOENT: no such file"

```bash
# Solution: Clear build cache
vercel build --prod --clear
```

### Environment variables not loading

- Wait 5 minutes after setting variables
- Verify variable names match exactly
- Rebuildproject in Vercel dashboard

### API routes returning 404

- Check functions are in `app/api/` directory
- Verify route syntax matches Next.js 16 spec
- Clear `.vercel` cache: `rm -rf .vercel`

### Styles not showing

- Clear Vercel cache in project settings
- Rebuild: `vercel rebuild --prod`
- Verify Tailwind config is correct

## 📊 Performance Optimization

### Production Build Checklist

```bash
# Build analysis
npm run build

# Check bundle size
npx next-bundle-analyzer

# Run performance audit (local)
npm run build && npm start
```

### Vercel Analytics

1. Go to Vercel Dashboard
2. Project Settings → Analytics
3. Enable Core Web Vitals
4. Monitor over time

## 🔐 Security

### Before Going Live

- [ ] Remove debug logs
- [ ] Disable source maps: `productionBrowserSourceMaps: false`
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set Content-Security-Policy headers
- [ ] Use environment variables for secrets
- [ ] Validate all user input server-side

### CORS Configuration (if needed)

```typescript
// In API route
res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
```

## 📈 Scaling

### If you need to scale beyond Vercel:

1. **Database**: Connect to PostgreSQL, MongoDB, or similar
2. **Caching**: Add Redis for result caching
3. **Load Balancing**: Use Vercel's automatic load balancing
4. **CDN**: Vercel includes global CDN by default
5. **Monitoring**: Set up Sentry or similar error tracking

## 📞 Support

- Vercel Support: [https://vercel.com/support](https://vercel.com/support)
- Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
- GitHub Issues: Create issue in your repository

---

**Happy deploying! 🎉**
