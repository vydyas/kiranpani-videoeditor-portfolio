# Deployment Guide - Kiran Pani Portfolio

## Quick Deploy to Vercel (Recommended - Easiest Method)

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/kiranpani-videoeditor-portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login (you can use GitHub account)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect it's a static site
   - Click **"Deploy"**
   - Your site will be live in seconds! 🎉

3. **Custom Domain** (Optional):
   - After deployment, go to Project Settings → Domains
   - Add your custom domain

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd /Users/siddhuvydyabhushana/Desktop/github/kiranpani-videoeditor-portfolio
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name? (Press Enter for default)
   - Directory? (Press Enter for current directory)
   - Override settings? **No**

5. **Production Deployment**:
   ```bash
   vercel --prod
   ```

### Method 3: Drag & Drop (Quick Test)

1. Go to [vercel.com](https://vercel.com)
2. Drag and drop your project folder onto the Vercel dashboard
3. Your site will be deployed instantly!

## Important Notes

### Video Files Size
Your video files in the `Videos/` folder might be large:
- `AI.mp4`
- `VideoEditing.mp4`
- `Vlog.mp4`

**Recommendations:**
- Vercel has a 100MB file size limit per file
- If videos are too large, consider:
  1. Compressing videos before deployment
  2. Hosting videos on YouTube/Vimeo and embedding them
  3. Using a CDN service for video hosting

### File Structure
Your project is ready to deploy as-is:
```
kiranpani-videoeditor-portfolio/
├── index.html
├── styles.css
├── script.js
├── vercel.json (already configured)
├── Videos/
│   ├── AI.mp4
│   ├── VideoEditing.mp4
│   └── Vlog.mp4
└── README.md
```

## After Deployment

1. **Test your live site**:
   - Check all sections load correctly
   - Test videos play properly
   - Verify mobile responsiveness
   - Test navigation menu

2. **Update Social Links** (if needed):
   - Instagram: Already set to `@the_kiran_post`
   - YouTube: Already set to `@thekiranpost`
   - Email: Already set to `kpani013@gmail.com`

3. **Share your portfolio**:
   - Your site will have a URL like: `your-project.vercel.app`
   - You can add a custom domain later

## Troubleshooting

### Videos Not Loading
- Check file sizes (should be < 100MB each)
- Verify file paths are correct (`Videos/filename.mp4`)
- Check browser console for errors

### Styles Not Loading
- Ensure `styles.css` is in the root directory
- Check file paths in `index.html`

### JavaScript Not Working
- Ensure `script.js` is in the root directory
- Check browser console for errors

## Alternative Deployment Options

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Done!

### GitHub Pages
1. Push to GitHub
2. Go to repository Settings → Pages
3. Select branch and folder
4. Your site will be at `username.github.io/repository-name`

---

**Need Help?** Check Vercel documentation: https://vercel.com/docs

