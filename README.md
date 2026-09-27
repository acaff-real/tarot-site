# Astrology by Anisha ✦

> An editorial luxury personal brand platform for Vedic astrology, contemplative tarot, and sacred numerology. Designed as a modern, dignified sanctuary for self-knowledge—combining authentic astronomical ephemeris calculations with contemporary design.

---

## ✦ Overview

**Astrology by Anisha** strips away superstitious theatricality and horoscope caricatures, returning esoteric traditions to their rightful place as sophisticated instruments of self-mastery and timing.

### Aesthetic & Design Principles
- **Editorial Luxury**: Clean alabaster and warm cream spaces inspired by *Vogue*, *Kinfolk*, and high-end wellness publications.
- **Glassmorphic Tactility**: Custom transparent frosted glass buttons with specular highlights, light reflection curvature, and dual-tone borders.
- **Celestial Bronze Relic CTA**: Final consultation button engineered with a metallic bronze bevel frame, top specular glass lens, and an organic pulsing amber glow (`pulse-amber`) that blooms on hover and dissipates smoothly when unhovered.
- **Cohesive Light & Dark Modes**: Seamless palette transition between warm alabaster/sand and deep obsidian/charcoal, featuring zero-flash pre-paint initialization and synchronized vector theme toggles.
- **Locked Vector Typography**: SVG-locked brand lockup (`Astrology by Anisha • Astrology • Tarot • Numerology`) preventing line-height shifts across devices and operating systems.

---

## ✦ Core Features & Engines

### 1. Vedic Kundali Calculation Engine (Backend SSR)
Calculated via real-time planetary ephemeris (`astronomy-engine`) through the SSR endpoint `POST /api/birth-chart`:
- **Sidereal Zodiac (Nirayana)**: High-precision planetary longitude computed with authentic **Lahiri (Chitra Paksha) Ayanamsha**.
- **Lagna (Ascendant)**: Calculated via Local Sidereal Time (LST) and geographic latitude/longitude for true horizon rising degrees.
- **9 Grahas**: Sun (Surya), Moon (Chandra), Mars (Mangal), Mercury (Budha), Jupiter (Guru), Venus (Shukra), Saturn (Shani), Rahu (North Node), Ketu (South Node).
- **Planetary Dignities**: Automatic calculation of Exaltation (Uchcha), Debilitation (Neecha), Own Sign (Swakshetra), and Neutral positions.
- **Retrograde Motion**: Instant retrograde flag and apparent speed detection.
- **27 Nakshatras & 4 Padas**: Accurate lunar mansion and pada distribution with planetary lords.
- **Whole Sign Houses (Bhava)**: Complete 1st through 12th house placements.
- **Dynamic Kundali Diagrams**: Interactive switcher between **North Indian Diamond Kundali** and **South Indian Fixed-Sign Kundali** rendered dynamically in responsive vector SVG.
- **City Coordinate Database**: Built-in coordinates and timezone database for major Indian and international cities.

### 2. Sacred Sound Numerology Calculator
Calculated via `POST /api/numerology`:
- Supports both **Chaldean (Vedic/sound vibration)** and **Pythagorean** calculation traditions.
- **Letter-by-Letter Acoustic Breakdown**: Visual pills showing individual letter frequencies and compound word sums.
- **Compound Vibrations**: Deep esoteric interpretations of unreduced numbers (e.g. 10 to 52).
- **Single Root Archetypes**: Dynamic Catalyst, Sovereign Ambassador, Creative Architect, etc.
- **Archetype Profiles**: Ruling planetary lord, lucky days, harmonious vibration allies, and aligned gemstones.

### 3. Complete Editorial Multi-Page Experience
- **Homepage (`/`)**: Hero section with Anisha's portrait, embedded birth chart calculator, embedded name numerology calculator, editorial biography introduction, service offerings, curated writings, client reflections, and celestial relic final CTA.
- **About (`/about`)**: Biography, lineage background (Parashari Jyotish), practice philosophy, and ethical framework.
- **Vedic Astrology (`/astrology`)**: Deep dive into natal Kundali analysis, Dasha timelines, transits, and Navamsha (D9) timing.
- **Intuitive Tarot (`/tarot`)**: Archetypal psychological reflection containers, ethics, and contemplative tarot spreads.
- **Sacred Numerology (`/numerology`)**: Sound frequency philosophy and comprehensive name audit details.
- **Consultations (`/consultations`)**: Structured private 1-on-1 consultation packages, session formats, investment details, and FAQ.
- **Articles & Essays (`/articles`)**: Editorial archive featuring deep-dive essays (e.g. *The Alchemy of Sade Sati*, *Understanding Your Lagna*, *Tarot as a Contemplative Mirror*).
- **Dynamic Article Reader (`/articles/[slug]`)**: Reading experience with typography formatting, author bios, and related topics.
- **Contact & Inquiries (`/contact`)**: Direct concierge inquiry form, operating hours, and confidentiality guarantee.

---

## ✦ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Astro 5+](https://astro.build) (Hybrid SSR & Static Rendering) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + Custom Glassmorphic System |
| **Adapter** | `@astrojs/node` (Standalone Node server adapter) |
| **Ephemeris** | `astronomy-engine` (J2000 planetary coordinates & sidereal mechanics) |
| **Typography** | Cormorant Garamond (Serif) & Plus Jakarta Sans (Sans-Serif) |
| **Language** | TypeScript (Strict Mode) |

---

## ✦ Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── anisha.webp            # Anisha portrait (cropped & optimized)
│       ├── studio.jpg             # Consultation space imagery
│       ├── consultation.jpg       # Session advisory space
│       ├── essay-saturn.jpg       # Sade Sati article featured image
│       ├── essay-lagna.jpg        # Lagna blueprint featured image
│       ├── essay-tarot.jpg        # Tarot archetypes featured image
│       └── essay-numerology.jpg   # Name numerology featured image
├── src/
│   ├── components/
│   │   ├── BirthChartCalculator.astro   # Interactive Kundali form + SVG renderer
│   │   ├── BrandLogo.astro              # Vector SVG brand lockup (fixed vertical bounds)
│   │   ├── Footer.astro                 # Global footer & Cosmic Dispatches newsletter
│   │   ├── GlassButton.astro            # Tactile frosted glass button with arrow icon
│   │   ├── Navbar.astro                 # Navigation header with responsive drawer
│   │   ├── NumerologyCalculator.astro   # Acoustic name number calculator
│   │   ├── SteampunkButton.astro        # Celestial relic glass button with amber glow
│   │   └── ThemeToggle.astro            # Synchronized dark/light mode toggle
│   ├── data/
│   │   ├── articles.ts            # Editorial articles & essays dataset
│   │   ├── services.ts            # Advisory services & consultation formats
│   │   └── testimonials.ts        # Client testimonials & reflections
│   ├── layouts/
│   │   └── Layout.astro           # Base layout with anti-flicker theme script
│   ├── lib/
│   │   ├── numerology/
│   │   │   └── calculator.ts      # Chaldean & Pythagorean numerology engine
│   │   └── vedic/
│   │       ├── astronomy.ts       # Lahiri Ayanamsha, Lagna, 9 Grahas & Nakshatras
│   │       └── cities.ts          # Global & Indian city coordinates database
│   ├── pages/
│   │   ├── api/
│   │   │   ├── birth-chart.ts     # SSR endpoint for Vedic chart computation
│   │   │   └── numerology.ts      # SSR endpoint for name numerology computation
│   │   ├── articles/
│   │   │   ├── index.astro        # Articles archive
│   │   │   └── [slug].astro       # Dynamic article reader
│   │   ├── about.astro            # Biography & philosophy
│   │   ├── astrology.astro        # Vedic astrology practice
│   │   ├── consultations.astro    # Consultation packages & booking
│   │   ├── contact.astro          # Inquiry form & studio details
│   │   ├── index.astro            # Master homepage
│   │   ├── numerology.astro       # Numerology practice
│   │   └── tarot.astro            # Tarot advisory practice
│   └── styles/
│       └── global.css             # Tailwind v4, glassmorphism, dark mode, animations
├── astro.config.mjs               # Astro configuration with Node adapter
├── package.json                   # Dependencies and npm scripts
└── tsconfig.json                  # TypeScript compiler settings
```

---

## ✦ Getting Started

### Prerequisites
- **Node.js**: `v22.12.0` or higher
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/astrology-by-anisha.git
   cd astrology-by-anisha
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

---

## ✦ Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Astro development server at `localhost:4321` |
| `npm run build` | Compiles static pages and server entrypoints to `./dist/` |
| `npm run preview` | Starts a local server to preview the production build |
| `npx astro check` | Runs TypeScript and Astro diagnostic checks |

---

## ✦ API Reference

### 1. Calculate Vedic Birth Chart
- **Method**: `POST`
- **Endpoint**: `/api/birth-chart`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Maya Patel",
    "date": "1996-04-18",
    "time": "14:30",
    "city": "New Delhi"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "chart": {
      "name": "Maya Patel",
      "ayanamsha": "Lahiri (Chitra Paksha)",
      "ascendant": {
        "signName": "Leo",
        "signSanskrit": "Simha",
        "signNumber": 5,
        "nakshatra": "Magha",
        "pada": 3,
        "degreeFormatted": "11° 24'"
      },
      "planets": [ ... ],
      "insights": {
        "lagnaSummary": "...",
        "moonSummary": "...",
        "lifeFocusSummary": "..."
      }
    }
  }
  ```

### 2. Calculate Name Numerology
- **Method**: `POST`
- **Endpoint**: `/api/numerology`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Anisha Sharma",
    "system": "chaldean"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "result": {
      "name": "Anisha Sharma",
      "system": "chaldean",
      "totalCompound": 32,
      "rootNumber": 5,
      "compoundMeaning": "The Sovereign Ambassador...",
      "profile": {
        "archetype": "The Dynamic Catalyst",
        "rulingPlanet": "Mercury",
        "harmoniousNumbers": [1, 3, 5, 6],
        "luckyDays": ["Wednesday", "Friday"],
        "gemstones": ["Emerald", "Green Tourmaline"]
      },
      "words": [ ... ]
    }
  }
  ```

---

## ✦ Deployment

This project uses the `@astrojs/node` standalone adapter and can be deployed directly to:
- **Node.js Host** (VPS, DigitalOcean, Railway, Render): Run `npm run build` and launch `node ./dist/server/entry.mjs`.
- **Vercel / Netlify**: Swap `@astrojs/node` for `@astrojs/vercel` or `@astrojs/netlify` in `astro.config.mjs` for serverless deployment.
- **Docker**: Can be packaged with a minimal Node 22 Alpine container.

---

## ✦ License & Rights

Private & Proprietary © Astrology by Anisha. All rights reserved.
