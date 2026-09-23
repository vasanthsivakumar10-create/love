# 💖 Our Romantic Love Story Website

A romantic, emotional, and interactive love story web experience crafted as a personalized surprise gift for your boyfriend.

---

## 🚀 How to Run Locally

You can open the website immediately in any web browser!
- **Option 1**: Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Safari, or Firefox.
- **Option 2 (Recommended)**: Use a local development server like VS Code Live Server, or Python's built-in server:
  ```bash
  python -m http.server 8080
  ```
  Then navigate to `http://localhost:8080` in your browser.

---

## 🎨 How to Personalize & Customize Everything

All personal names, messages, timeline events, photos, and music can be customized in **one single file**:
📂 [`js/config.js`](file:///c:/Users/VASANTH/OneDrive/Desktop/vvvvvvvvvvv/js/config.js)

### 1. Change Names & Dates
Open `js/config.js` and edit:
- `boyfriendName`: Your boyfriend's name.
- `senderName`: Your name or nickname.
- `specialDate`: Your anniversary or special date.

### 2. Add Your Favorite Song (MP3)
- Place your audio file into `assets/audio/` (for example `assets/audio/our-song.mp3`).
- In `js/config.js`, set `musicPath: "assets/audio/our-song.mp3"`.
- *Note*: If you haven't added an MP3 yet, the website has a built-in sweet romantic piano melody synthesizer that plays automatically when you click the music button!

### 3. Replace Photos with Real Pictures
- Put your couple photos into `assets/images/` (e.g. `photo1.jpg`, `photo2.jpg`).
- In `js/config.js`, update the `imgUrl` under `polaroids` array:
  ```javascript
  polaroids: [
    {
      caption: "Our First Date 💕",
      date: "October 14, 2023",
      imgUrl: "assets/images/photo1.jpg",
      note: "The day my world changed forever."
    },
    ...
  ]
  ```

### 4. Customize Love Letters & "Open When..." Envelopes
- In `js/config.js`, update the `envelopes` array and `letter` object with your own intimate, heartfelt words.

---

## 📱 Features Included
- **Opening Screen**: "Hey Love ❤️" with glowing "Open My Heart 💗" unlock animation.
- **Dreamy Background**: 60fps canvas particles, twinkling stars, floating ambient hearts, and soft bubbles.
- **Heart Cursor Trail & Click Bursts**: Interactive particle trails and tap bursts.
- **Floating Music Player**: Glassmorphism music widget with audio visualizer equalizer and toggle.
- **Section 1**: 6 Glassmorphism "Why I Love You" interactive cards with popup notes.
- **Section 2**: "Our Little Story" interactive milestone timeline with glowing nodes.
- **Section 3**: Polaroid Photo Memory Wall with realistic hover tilts, pins, and fullscreen lightbox zoom.
- **Section 4**: Surprise Romantic Popups and secret whisper cards.
- **Section 5**: 3D "Open When..." interactive envelopes revealing personalized letters.
- **Section 6**: "Reasons I Choose You" animated statistic counters.
- **Section 7**: Interactive Love Quiz / Mini-Game with playful responses.
- **Section 8**: Romantic Handwritten Letter with wax seal, typewriter animation, and replay button.
- **Section 9**: Grand Climax finale with line-by-line reveal, big pulsing heart, and celebration fireworks!
- **Mobile First**: 100% responsive, optimized for iPhones, Android phones, tablets, and desktops.
