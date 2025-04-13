# Deploying to Vercel

This guide will help you deploy your React Router v7 application to Vercel.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account (to connect to Vercel)
- Node.js and npm installed locally
- Vercel CLI installed (optional for command-line deployment)

## Method 1: Deploy with Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your application:
   ```bash
   npm run deploy
   ```
   or
   ```bash
   vercel --prod
   ```

## Method 2: Deploy via Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository.

2. Visit [Vercel](https://vercel.com) and sign up or log in.

3. Click "Add New" → "Project".

4. Import your repository.

5. Configure the project:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

6. Click "Deploy" and wait for the deployment to complete.

## Configuration Details

The deployment uses the following configuration:

- `vercel.json`: Configures the build process and routing
- `api/server.js`: Handles server-side rendering

## Environment Variables

If your application uses environment variables, add them in the Vercel dashboard:
1. Go to your project settings
2. Navigate to the "Environment Variables" tab
3. Add your variables (matching those in your .env files)

## Troubleshooting

If you encounter any issues:
1. Check the build logs in the Vercel dashboard
2. Ensure all dependencies are correctly installed
3. Verify your vercel.json and api/server.js files are correctly configured

For more help, refer to [Vercel's documentation](https://vercel.com/docs). 