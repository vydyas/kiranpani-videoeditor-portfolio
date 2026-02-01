# Kiran Pani - Video Editor Portfolio

A modern, responsive portfolio website showcasing the video editing skills and work of Kiran Pani, a micro influencer and content creator from Orissa, India.

## Features

- **Modern Design**: Clean, professional design with gradient accents and smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Sections**:
  - Hero section with introduction
  - About section with background information
  - Skills showcase (Video Editing, AI Video Generation, Vlog Editing)
  - Tools section (Adobe Premiere Pro, Adobe After Effects, Adobe Lightroom)
  - Portfolio section (ready for Instagram video embeds)
  - Contact form and social links

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (Vanilla JS)
- Google Fonts (Poppins)
- Font Awesome Icons

## Setup Instructions

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build process or dependencies required - it's ready to use!

## Deployment

### Deploy to Vercel (Recommended)

**Option 1: Using Vercel CLI**
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the project directory
3. Run `vercel` and follow the prompts
4. Your site will be live at a `*.vercel.app` URL

**Option 2: Using Vercel Dashboard (Easiest)**
1. Push your code to GitHub (create a repository if you haven't)
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a static site
6. Click "Deploy" - your site will be live in seconds!

**Option 3: Drag & Drop**
1. Go to [vercel.com](https://vercel.com)
2. Drag and drop your project folder onto the dashboard
3. Your site will be deployed instantly!

### Other Deployment Options

- **Netlify**: Similar to Vercel, drag & drop or connect GitHub
- **GitHub Pages**: Free hosting for static sites
- **Cloudflare Pages**: Fast global CDN
- **Firebase Hosting**: Google's hosting solution

All of these platforms work great with static HTML/CSS/JS sites!

## Customization

### Adding Portfolio Videos

The portfolio section supports both YouTube and Instagram video embeds with horizontal scrolling.

#### Adding YouTube Videos:

1. Open `script.js`
2. Find the example section at the bottom
3. Uncomment and use: `addYouTubeVideo('VIDEO_ID', 'Video Title')`
   - To get the video ID: From a YouTube URL like `https://www.youtube.com/watch?v=VIDEO_ID`, copy the `VIDEO_ID` part

Example:
```javascript
addYouTubeVideo('dQw4w9WgXcQ', 'My Video Title');
```

#### Adding Instagram Posts:

**Option 1 - Using Post URL (Easiest):**
1. Open `script.js`
2. Use: `addInstagramPost('https://www.instagram.com/p/POST_ID/')`
   - To get the post URL: Copy the URL from your Instagram post

Example:
```javascript
addInstagramPost('https://www.instagram.com/p/ABC123XYZ/');
```

**Option 2 - Using Embed Code:**
1. Go to your Instagram post
2. Click the three dots menu → Select "Embed"
3. Copy the embed code
4. Use: `addInstagramEmbed('PASTE_EMBED_CODE_HERE')`

The portfolio section will automatically scroll horizontally to show all videos.

### Styling

- Colors can be customized in the `:root` CSS variables in `styles.css`
- Fonts can be changed by updating the Google Fonts link in `index.html`

### Contact Information

Contact information is displayed in the Contact section:
- Email: kpani013@gmail.com
- Instagram: @the_kiran_post
- YouTube: The Kiran Post
- Location: Orissa, India

## Social Media

- **Instagram**: [@the_kiran_post](https://instagram.com/the_kiran_post)
- **YouTube**: [The Kiran Post](https://www.youtube.com/@thekiranpost)
- **Email**: kpani013@gmail.com

## License

This project is open source and available for personal use.

