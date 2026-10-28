# TrollWeen — Static Website (NO BUILD REQUIRED)

This is a self-contained **HTML + CSS + Vanilla JavaScript** site modeled on the supplied Pepeween homepage and populated with the approved Trollface Grim Reaper assets. No Node.js, React, Tailwind CLI, npm, database, or API keys.

## FAST DEPLOY (2-minute setup)

1. Unzip this file. Open `js/config.js` in Notepad or VS Code.
2. Enter your real token `contract`, official `ticker`, `telegram`, and `x`. Change `chain` if NOT Ethereum.
3. Save the file. **Double-click `index.html`** to preview the site locally.
4. Upload **all files and folders inside this directory**, with `index.html` at the web root.

### GitHub Pages

- GitHub -> New repository -> upload all website files (not the ZIP), commit.
- Repository **Settings -> Pages -> Build and deployment -> Deploy from a branch**.
- Choose **main** and **/(root)**, save. Your site URL is normally `https://USERNAME.github.io/REPO/`.
- For Namecheap custom domains: set the custom domain in Pages and update DNS in Namecheap after GitHub supplies the relevant records.

### Netlify Drop

- Visit `https://app.netlify.com/drop` and drag the **unzipped website folder**. No build settings needed.

### Cloudflare Pages

- Use **Direct Upload** and upload the folder. Framework preset: **None**.

## Safe launch behavior

- **No contract address is included.** Until you add it, Buy and Chart buttons show as disabled/"Launching Soon". This prevents accidentally sending visitors to Pepeween.
- Never paste a wallet private key or seed phrase. You only need your public contract address.
- Ethereum contract address must be `0x` + 40 hexadecimal characters. For Solana, set `chain: "solana"` and a valid base58 token address.
- `buyUrl` and `chartUrl` are optional; defaults are Uniswap/Jupiter and DEX Screener when an address is supplied. A valid token CA does not guarantee available liquidity.
- Social buttons remain disabled unless you set their official URLs.

## Files

- `index.html` — all sections, semantic markup, meta tags.
- `js/config.js` — **edit this for launch** (name, ticker, network, contract, social, optional link overrides).
- `js/main.js` — copy CA, link management, network-specific buy guide, ambient audio.
- `css/reference-compiled.css` — static precompiled CSS from your saved reference page (not a Tailwind dependency).
- `css/reference-fonts.css` — CSS for Bangers, Creepster, Rubik via Google Fonts (falls back gracefully offline).
- `css/custom.css` — responsive fixes, accessibility, toast notifications.
- `assets/` — image files, logos, video, social banners, locally synthesized ambient audio.

## Page layout

1. Full-screen muted MP4 hero, TrollWeen heading, buy/Telegram, copyable CA.
2. Chapter 1 story with translucent watermark.
3. Four meme-gallery images.
4. Chapter 2 circular rocket artwork and buy button.
5. Four steps for purchasing; wording changes for Ethereum or Solana.
6. Footer socials, CA, disclaimer.

## Notes and limitations

The hero video is a **five-second motion-still** made with your artwork, not Pepeween's source animation. The four gallery cards use the existing packaged art. The site closely follows the reference's structure and style, but **pixel-for-pixel identity and third-party browser rendering are not guaranteed**. The static compiled styles are included solely so deployment does not need Tailwind CLI or Node.

OG social images generally require an absolute URL for some social platforms: when you attach your own domain, update `og:image` / `twitter:image` in `index.html` from `assets/social-preview.jpg` to your full URL.
