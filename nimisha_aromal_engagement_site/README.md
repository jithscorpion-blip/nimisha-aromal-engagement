# Nimisha & Aromal Engagement Website

A premium Kerala Hindu engagement invitation microsite.

## Included
- Mobile-first luxury UI
- Countdown timer
- RSVP via WhatsApp
- Gallery with photo upload preview
- Malayalam / English toggle
- PWA manifest + service worker
- Admin edit panel using localStorage
- Digital invitation card with print/download PDF option
- Google Maps button
- Guest greeting via URL parameter: `index.html?guest=Jithin`

## Edit Details
Open `admin.html`, update details, and save.  
For permanent code-level edits, update `config.json` or the default config inside `app.js`.

## Replace Photos
Replace files inside `/assets` with the same names:
- venue1.jpg
- venue2.jpg
- couple.jpg
- bride.jpg
- groom.jpg
- family.jpg

## Background Music
Add a licensed MP3 file as:
`assets/music.mp3`

Then update the audio source in `index.html`:
`<source src="assets/music.mp3" type="audio/mpeg" />`

## Hosting Options

### Netlify
1. Go to Netlify.
2. Drag and drop this full folder.
3. Netlify will generate a live shareable link.

### Vercel
1. Create a new project.
2. Upload/import the folder.
3. Deploy as a static site.

### GitHub Pages
1. Create a GitHub repository.
2. Upload all files.
3. Go to Settings > Pages.
4. Select branch and root folder.
5. Publish.

## Real Admin + Email Integration
The included admin panel is browser-local. For a real admin dashboard and RSVP email notifications, connect:
- Firebase / Supabase for database and auth
- EmailJS / FormSubmit / Resend for admin email notifications
- Cloudinary for photo uploads
