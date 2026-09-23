/**
 * ===================================================================
 * 💖 LOVE STORY WEBSITE CONFIGURATION 💖
 * ===================================================================
 * Easily customize all the names, dates, photos, and messages below!
 * You don't need to touch the HTML or CSS code. Just edit the values
 * inside this file.
 * ===================================================================
 */

const LOVE_CONFIG = {
  // ─── 1. NAMES & GENERAL DETAILS ──────────────────────────────────
  boyfriendName: "My Love", // Replace with your boyfriend's name (e.g. "Alex", "Ethan")
  senderName: "Forever Yours", // Replace with your name or nickname (e.g. "Emma", "Your Girl")
  specialDate: "Since Day One ❤️", // e.g. "October 14, 2023" or "2 Years & Counting"
  
  // ─── 2. MUSIC CONFIGURATION ──────────────────────────────────────
  musicPath: "assets/audio/short-song.webm",
  songTitle: "Oday Oday 💕",
  artistName: "G.V. Prakash Kumar",

  // ─── 3. LANDING / OPENING SCREEN ─────────────────────────────────
  landing: {
    badge: "A Special Surprise For You",
    title: "Hey Love ❤️",
    subtitle: "Something truly special is waiting for you...",
    buttonText: "Open My Heart 💗",
    footerText: "Made with all my love, just for you."
  },

  // ─── 4. HERO SECTION ─────────────────────────────────────────────
  hero: {
    tag: "To The One & Only",
    heading: "To The Boy Who Owns My Heart ❤️",
    subtitle: "Every love story is beautiful, but ours is my absolute favourite.",
    ctaButton: "Continue Our Story 💕"
  },

  // ─── 5. SECTION 1: WHY I LOVE YOU (6 Interactive Cards) ──────────
  reasons: [
    {
      id: 1,
      icon: "😊",
      title: "Your Smile",
      shortDesc: "It lights up even my darkest days.",
      fullMessage: "Every time you smile, my entire world brightens up. There is a warmth and magic in the way your eyes crinkle that instantly makes all my worries disappear. Never stop smiling, my handsome boy."
    },
    {
      id: 2,
      icon: "🎶",
      title: "Your Voice",
      shortDesc: "My favorite melody in the whole world.",
      fullMessage: "Whether you are laughing, telling me a silly story, or whispering sweet things when I'm sleepy, your voice is my safest place. It brings peace to my soul like nothing else can."
    },
    {
      id: 3,
      icon: "🫶",
      title: "The Way You Care",
      shortDesc: "Gentle, thoughtful, and endlessly kind.",
      fullMessage: "You notice the little things no one else does. You make sure I've eaten, check in on me when I'm quiet, and protect my heart with so much gentleness. Being loved by you is the greatest gift."
    },
    {
      id: 4,
      icon: "🤗",
      title: "Your Hugs",
      shortDesc: "Where all my broken pieces feel whole.",
      fullMessage: "Wrapping my arms around you and resting my head against your chest is my definition of heaven. In your arms, I feel safe, cherished, and home. I never want to let go."
    },
    {
      id: 5,
      icon: "💗",
      title: "Your Little Things",
      shortDesc: "The goofy jokes, sweet texts, and cute quirks.",
      fullMessage: "It's the random memes you send, the way you hold my hand tightly when we walk, how you remember what I like, and all your adorable habits that make me fall deeper in love every single day."
    },
    {
      id: 6,
      icon: "❤️",
      title: "Simply You",
      shortDesc: "Because you are uniquely, perfectly you.",
      fullMessage: "I love your pure heart, your dreams, your strength, and your vulnerabilities. I don't love you for any single reason — I love every piece of who you are, exactly as you are."
    }
  ],

  // ─── 6. SECTION 2: OUR LITTLE STORY (Interactive Timeline) ────────
  timeline: [
    {
      date: "The Beginning",
      title: "First Meeting ✨",
      description: "The universe aligned and brought our paths together. I had no idea back then that a stranger would become my whole world.",
      icon: "✨"
    },
    {
      date: "The Spark",
      title: "First Conversation 💬",
      description: "Hours felt like minutes as we talked about everything and nothing. I remember smiling at my screen like a silly person.",
      icon: "💬"
    },
    {
      date: "The Butterflies",
      title: "The Moment I Started Falling 🦋",
      description: "It wasn't one big explosion, but a million little moments where I realized you were the one my soul had been waiting for.",
      icon: "🦋"
    },
    {
      date: "Our Journey",
      title: "Our Favourite Memories 📸",
      description: "From late night talks to cozy dates, laughing until our stomachs hurt, and building a sanctuary of love together.",
      icon: "🌟"
    },
    {
      date: "Now & Always",
      title: "Today & Forever ❤️",
      description: "Every single day with you is a blessing. My heart chooses you today, tomorrow, and every tomorrow after that.",
      icon: "💍"
    }
  ],

  // ─── 7. SECTION 3: PHOTO MEMORY WALL (Polaroids) ──────────────────
  // To replace with your real photos: put your image files into `assets/images/`
  // and update the `imgUrl` below to e.g. "assets/images/photo1.jpg"
  polaroids: [
    {
      id: 1,
      caption: "Our Sweet Moments 💕",
      date: "Pure Happiness",
      imgUrl: "assets/images/vvvvv/photo1.jpg.jpeg",
      note: "Just being with you makes ordinary moments feel like poetry."
    },
    {
      id: 2,
      caption: "happinesss ✨",
      date: "Magical Nights",
      imgUrl: "assets/images/vvvvv/photo2.jpg.jpeg",
      note: "Looking at the stars, but honestly I'd rather look at you."
    },
    {
      id: 3,
      caption: "verseee☕",
      date: "Endless Laughter",
      imgUrl: "assets/images/vvvvv/photo3.jpg.jpeg",
      note: "My favourite place is wherever you are holding my hand."
    },
    {
      id: 4,
      caption: "loveeee🌅",
      date: "Golden Hours",
      imgUrl: "assets/images/vvvvv/photo4.jpg.jpeg",
      note: "Sunsets are pretty, but your eyes hold a million skies."
    },
    {
      id: 5,
      caption: "you and me",
      date: "Unforgettable Days",
      imgUrl: "assets/images/vvvvv/photo5.jpg.jpeg",
      note: "Any destination is paradise as long as you're by my side."
    },
    {
      id: 6,
      caption: "You forever🔒",
      date: "Always & Forever",
      imgUrl: "assets/images/vvvvv/photo6.jpg.jpeg",
      note: " infinite love."
    }
  ],

  // ─── 8. SECTION 4: ROMANTIC SURPRISE POPUPS ───────────────────────
  popups: [
    {
      id: "popup-1",
      triggerTitle: "Do you know something? 💗",
      message: "i loveee youuhhhh.",
      tag: "Secret #1"
    },
    {
      id: "popup-2",
      triggerTitle: "One little secret 🤫",
      message: "unna mattu tha lovee youhhh",
      tag: "Secret #2"
    },
    {
      id: "popup-3",
      triggerTitle: "Important Question 💕",
      message: "am i feel toxic to youhh???",
      tag: "Secret #3"
    },
    {
      id: "popup-4",
      triggerTitle: "Just Remember ❤️",
      message: "you are thee loveee of myyy lifeee.",
      tag: "Secret #4"
    }
  ],

  // ─── 9. SECTION 5: "OPEN WHEN..." ENVELOPES ───────────────────────
  envelopes: [
    {
      id: "env-1",
      title: "Open when you're missing me 🥺",
      color: "rose",
      letterTitle: "Whenever You Miss Me...",
      letterBody: "Close your eyes, take a deep breath, and place your hand over your chest. Feel that rhythm? That's my love beating right alongside yours. Distance is just a small test to show how strong our bond is. I'm always thinking of you, sending you tight hugs across the miles, and counting down the seconds until I'm in your arms again."
    },
    {
      id: "env-2",
      title: "Open when you're having a bad day 🌧️",
      color: "soft-pink",
      letterTitle: "For The Heavy Days...",
      letterBody: "Hey handsome, take a deep breath. Bad days don't mean a bad life. You are one of the strongest, most resilient people I know, but you don't have to carry the weight of the world alone. I am here for you — to listen, to hold you, or just to sit in quiet comfort with you. Tomorrow is a fresh start, and I believe in you always."
    },
    {
      id: "env-3",
      title: "Open when you need a smile 😊",
      color: "cream",
      letterTitle: "Here's Your Reason To Smile!",
      letterBody: "Did you know that somewhere right now, I'm probably daydreaming about your cute face and laughing at something silly you did? You bring so much joy into my life. Also, reminder: You are officially stuck with me forever, so you better get used to being pampered with love and endless forehead kisses! 💖"
    },
    {
      id: "env-4",
      title: "Open when you want to know how much I love you ❤️",
      color: "rose-gold",
      letterTitle: "How Deep My Love Goes...",
      letterBody: "If I could count the stars in the night sky and every grain of sand on earth, it would still not come close to how much you mean to me. I love you more than yesterday, and a million times less than I will tomorrow. You are my home, my peace, and my sweetest dream come true."
    },
    {
      id: "env-5",
      title: "Open when you can't sleep 🌙",
      color: "midnight-rose",
      letterTitle: "Sweet Dreams, My Love...",
      letterBody: "Let all your thoughts rest now. Picture us walking under a starlit sky, your fingers intertwined with mine, gentle night breeze, and zero worries. I'm wrapping you in the warmest virtual blanket of love. Sleep peacefully knowing you are so deeply cherished. Goodnight, my heart."
    }
  ],

  // ─── 10. SECTION 6: REASONS I CHOOSE YOU (Counters) ──────────────
  stats: [
    {
      number: "1000",
      suffix: "+",
      label: "Reasons to smile because of you 😊"
    },
    {
      number: "∞",
      suffix: "",
      label: "Reasons to love and cherish you ♾️"
    },
    {
      number: "100",
      suffix: "+",
      label: "Countless sweet memories made 📸"
    },
    {
      number: "1",
      suffix: "",
      label: "Person I will choose every single time — YOU ❤️"
    }
  ],

  // ─── 11. SECTION 7: INTERACTIVE LOVE MINI GAME ────────────────────
  game: {
    question: "How much do you think I love you?",
    options: [
      { text: "A little ❤️", reaction: "Nope... wayyy more than that! Try again! 😜" },
      { text: "A lot 💕", reaction: "Getting warmer, but still not even close! 🥰" },
      { text: "More than words can say 💗", reaction: "Close... but my love is truly infinite! 🚀" }
    ],
    finalReveal: "Answer: More than you will ever, ever know! ❤️"
  },

  // ─── 12. SECTION 8: LETTER FROM MY HEART ("Dear You...") ──────────
  letter: {
    salutation: "To the boy who owns my whole heart,",
    paragraphs: [
      "Hiii broooh.....unna first day oru blue shirt la pathenn...pakka apdiye paaldappa mathiri irrunthaa...but i like that paaldappa...",
      "but ennatha irrunthaluuu...insta la padam pathavan tha nee...ne paaldappa la illa...na unna neraya hurt panniruken kasta padirukenn..but ne athellam kamikama love mattu kudupa...sorryy ethaiu unna kasta paduthanu nu na pannathu illa...love ah love ah kamika theriyama ipdi pannitu irruken...",
      "but i love you so muchhh...eppavum ne keppa enna evalo pudikunu ...unna pudicha mathiri ennaku yaraiu puduchathu illa....",
      "You will always be my favourite hello, my hardest goodbye, and the easiest choice I've ever made...loveee youuhhh...ummahhh."
    ],
    closing: "Forever and always yours,",
    signature: "With All My Love ❤️"
  },

  // ─── 13. SECTION 9: FINAL SURPRISE CLIMAX ────────────────────────
  finalSurprise: {
    prelude: "Before you leave...",
    lines: [
      "You are my favourite person.",
      "You are one of my happiest memories.",
      "You make my heart feel at home.",
      "And if I had to choose again...",
      "I would still choose YOU. ❤️"
    ],
    buttonText: "One Last Surprise 💗",
    modalHeading: "Happy Us ❤️",
    modalMessage: "I love you more than all the words in every language could ever explain.\nThank you for being my favourite part of life.",
    modalSignoff: "Forever yours, with all my heart ❤️"
  }
};
