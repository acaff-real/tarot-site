# Astro by Anisha ✦

> An editorial luxury digital platform for Vedic astrology, contemplative tarot, and Chaldean numerology by **Anisha Banerji**. Engineered with [Astro 5+](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and the high-precision [Astronomy Engine](https://github.com/cosinekitty/astronomy) ephemeris library.

---

## ✦ Agent & Developer Quick Reference

> [!IMPORTANT]
> **Key Rules for Agents Working on This Repository:**
> 1. **Brand & Identity**: The platform is **Astro by Anisha**. The practitioner is **Anisha Banerji** (NEVER "Sharma").
> 2. **Navigation Tabs**: Strict 4-tab structure: `Home` (`/`), `About` (`/about`), `Articles` (`/articles`), `Contact` (`/contact`), plus primary CTA `Book a Consultation` (same for footer).
> 3. **Copy Consistency**: Always use **"Book a Consultation"** (NEVER "Book a session").
> 4. **No Consultation Prices**: Never display prices on the website. All CTAs route to the direct Gmail enquiry flow.
> 5. **Direct Gmail Destination**: All consultation inquiries and contact forms route directly to **`anishabanerji@gmail.com`**.
> 6. **Calculators**: Use the **Parashar calculation chart** (sidereal diamond chart); support both **Vedic (Sidereal/Lahiri)** and **Western (Tropical)** calculation modes.
> 7. **Forbidden Terminology**: Do NOT reintroduce deprecated phrases (*Sacred Sound Geometry*, *Cosmic Dispatches*, *Sacred Numerology*, *Private Advisory*, *Karmic Destiny Codes*).
> 8. **Git Operations**: **DO NOT RUN GIT COMMANDS** (`git add`, `git commit`, `git push`). The user handles all version control manually.
> 9. **Dev Server**: When running the dev server, use background mode: `npx astro dev --background` (manage via `astro dev stop`, `astro dev status`, `astro dev logs`).

---

## ✦ Design & Aesthetic Principles

* **Restrained Editorial Luxury**: Inspired by [chani.com](https://www.chani.com) and [jaimadaan.com/about](https://www.jaimadaan.com/about). Focuses on elevated whitespace, light ivory/alabaster palettes, and sophisticated typography over visual clutter.
* **Dominant Hero Focus**: High-presence portrait of Anisha Banerji with immediate clarity: *Who I am* $\rightarrow$ *What I do* $\rightarrow$ *What you can do next*.
* **Locked Vector Typography**: Vector SVG brand lockup ([`src/components/BrandLogo.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/components/BrandLogo.astro)) with fixed vertical bounds, preventing line breaks or font spreading across viewports.
* **Button Hover & Unhover Animation Engine**: Specular highlight buttons ([`src/components/GlassButton.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/components/GlassButton.astro)) and the celestial bronze relic button ([`src/components/SteampunkButton.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/components/SteampunkButton.astro)) feature smooth `0.6s cubic-bezier(0.16, 1, 0.3, 1)` lingering decay on unhover, continuous iridescent shimmer, and cursor pointermove reflection.
* **Organic Square Box System**: Shifted structural containers, panels, cards, photo frames, and form inputs away from bubbly radii to crisp, tactile, organic square corners (6px–12px: `rounded-md`, `rounded-lg`, `rounded-xl`), reminiscent of artisanal linen bookbindings, tarot cards, and editorial folios, while retaining smooth rounded pill contours on interactive buttons.
* **High-Contrast Editorial Typography**: Rich authoritative ink black (`#110f0d`), deep espresso (`#2c2722`), and AAA-rated body stone (`#38322c`) in light mode; pure radiant white (`#ffffff`), warm parchment silver (`#ded9d0`), and warm ivory (`#f0ebe1`) in dark mode—completely purging the generic low-contrast "AI cosmic purple/teal haze".
* **Desktop Spacing & Spread**: Expanded desktop containers from cramped `max-w-4xl`/`max-w-5xl` constraints to `max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12`, allowing calculators, narrative copy, and cards to spread out comfortably across modern desktop displays without 400px side gutters.
* **Cohesive Light / Dark Modes**: Zero-flicker pre-paint initialization script in [`src/layouts/Layout.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/layouts/Layout.astro) supporting warm alabaster light mode and obsidian dark mode.
* **Instant Client Transitions**: `<ClientRouter />` SPA transitions with hover prefetching for sub-second page loads.

---

## ✦ Core Features & Engines

### 1. Dual-System Astronomical Ephemeris Engine (`POST /api/birth-chart`)
Engineered with `astronomy-engine` in [`src/lib/vedic/astronomy.ts`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/lib/vedic/astronomy.ts) and surfaced via [`src/components/BirthChartCalculator.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/components/BirthChartCalculator.astro):
* **Dual Calculation Modes**:
  * **Vedic (Sidereal / Lahiri)**: Computes high-precision Sidereal coordinates utilizing the historic **Lahiri (Chitra Paksha) Ayanamsha** (~23°48'), Nirayana Rashis, 27 Nakshatras & 4 Padas, and planetary lords.
  * **Western (Tropical)**: Computes ecliptic coordinates relative to the Vernal Equinox (0° Ayanamsha) with tropical signs, houses, and degrees (comparable to [cafeastrology.com/natal.php](https://astro.cafeastrology.com/natal.php)).
* **Location & Timezone Mechanics**:
  * Separated **Country of Birth** and **City of Birth** inputs with automatic coordinate/timezone sync.
  * Dedicated **Timezone Dropdown** (UTC-10:00 to UTC+12:00) with global regional offsets for custom coordinates.
* **Planetary Dignities & Motion**: Exalted (Uchcha), Debilitated (Neecha), Own Sign, and apparent Retrograde motion tracking.
* **Vector Parashari Diamond Chart**: Dynamic, responsive SVG visualization of the 12 whole-sign houses and planetary placements.

### 2. Chaldean Name & Life Path Analysis (`POST /api/numerology`)
Surfaced via [`src/components/NumerologyCalculator.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/components/NumerologyCalculator.astro) and [`src/lib/numerology/calculator.ts`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/lib/numerology/calculator.ts):
* Decodes phonetic acoustic frequencies via classical **Chaldean** values (1–8, with 9 as sacred/transcendent).
* Displays letter-by-letter frequency pills, compound double-digit vibrations (10–52), and single root archetypes.
* Compares Chaldean sound frequency with Gregorian birth date life path numbers.

### 3. Direct-to-Gmail Consultation Booking
Surfaced on [`src/pages/consultations.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/pages/consultations.astro):
* **No Public Pricing**: Removes all displayed rates in favor of private advisory inquiries.
* **Intake Destination**: Directly delivers to **`anishabanerji@gmail.com`**.
* **Triple-Tier Dispatch Architecture**:
  1. Triggers pre-formatted `mailto:` client launch.
  2. Generates direct **Gmail Web Compose** launcher (`https://mail.google.com/mail/?view=cm...`).
  3. One-click **Copy Details** clipboard button so zero inquiries are ever lost.

### 4. Curated Social Media Grid
Surfaced on [`src/pages/index.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/pages/index.astro):
* **Instagram First**: Prominently highlights **`@astrobyanisha`** with elegant transit reflections and tarot archetypes.
* **YouTube Secondary**: Clean card linking to long-form video breakdowns.

### 5. Future-Ready Architecture (Book & Shop)
* **[`src/pages/book.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/pages/book.astro)**: Dedicated landing page for Anisha Banerji's forthcoming publication (*The Sacred Mirror*) with early release waitlist.
* **[`src/pages/shop.astro`](file:///C:/Users/vi/Desktop/agy/personal/tarot/src/pages/shop.astro)**: Luxury studio store preview ([chanishop.com](https://chanishop.com) style) featuring upcoming editions:
  * *The Contemplative Journal*
  * *Mindful Affirmation Deck*
  * *The Astro by Anisha Tarot Deck*
* Architecture is pre-built and route-ready without cluttering primary navigation tabs.

---

## ✦ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [Astro 5+](https://astro.build) | Hybrid SSR with `@astrojs/node` standalone adapter |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | Custom theme tokens, `@theme`, and frosted glassmorphism |
| **Transitions** | `astro:transitions` (`<ClientRouter />`) | Instant client-side routing & hover prefetching |
| **Astronomical Math** | `astronomy-engine` | J2000 solar/lunar/planetary vectors & Lahiri Ayanamsha |
| **Typography** | Google Fonts | *Cormorant Garamond* (Serif) & *Plus Jakarta Sans* (Sans-Serif) |
| **Language** | TypeScript (Strict) | Fully typed interfaces for charts, houses, and services |

---

## ✦ Project Directory Layout

```text
C:\Users\vi\Desktop\agy\personal\tarot/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── anisha.webp            # Anisha Banerji portrait
│       ├── studio.jpg             # Consultation studio interior
│       ├── consultation.jpg       # Advisory space
│       ├── essay-saturn.jpg       # Sade Sati article image
│       ├── essay-lagna.jpg        # Lagna blueprint image
│       ├── essay-tarot.jpg        # Tarot archetypes image
│       └── essay-numerology.jpg   # Name numerology image
├── src/
│   ├── components/
│   │   ├── BirthChartCalculator.astro   # Dual-system (Vedic/Western) form & Parashar SVG
│   │   ├── BrandLogo.astro              # Vector SVG brand lockup (Astro by Anisha)
│   │   ├── Footer.astro                 # Simplified single-tier essential footer
│   │   ├── GlassButton.astro            # Tactile frosted glass button with arrow
│   │   ├── Navbar.astro                 # 4-tab navigation + Book Consultation CTA
│   │   ├── NumerologyCalculator.astro   # Chaldean phonetic name calculator
│   │   ├── SteampunkButton.astro        # Celestial bronze relic button with lingering glow
│   │   └── ThemeToggle.astro            # Dark/light mode theme toggle
│   ├── data/
│   │   ├── articles.ts            # Curated essays & reflections dataset
│   │   ├── services.ts            # 3 core consultation offerings (no prices)
│   │   └── testimonials.ts        # Client feedback archive
│   ├── layouts/
│   │   └── Layout.astro           # Base HTML layout with ClientRouter & anti-flicker script
│   ├── lib/
│   │   ├── numerology/
│   │   │   └── calculator.ts      # Chaldean sound frequency & root number engine
│   │   └── vedic/
│   │       ├── astronomy.ts       # Lahiri ephemeris, tropical coords, Lagna, 9 Grahas
│   │       └── cities.ts          # Global city coordinates & country mappings
│   ├── pages/
│   │   ├── api/
│   │   │   ├── birth-chart.ts     # POST endpoint (Vedic & Western natal computation)
│   │   │   └── numerology.ts      # POST endpoint (Chaldean name computation)
│   │   ├── articles/
│   │   │   ├── index.astro        # Editorial archive
│   │   │   └── [slug].astro       # Dynamic article reader
│   │   ├── about.astro            # Anisha Banerji personal profile
│   │   ├── astrology.astro        # Vedic astrology practice page
│   │   ├── book.astro             # Forthcoming book release & waitlist
│   │   ├── consultations.astro    # Consultation offerings & Gmail booking form
│   │   ├── contact.astro          # Studio contact & direct inquiry form
│   │   ├── index.astro            # Homepage (Restrained, high-whitespace)
│   │   ├── numerology.astro       # Chaldean numerology practice page
│   │   ├── shop.astro             # Studio shop preview (Journals, Deck)
│   │   └── tarot.astro            # Intuitive tarot practice page
│   └── styles/
│       └── global.css             # Tailwind v4, glassmorphic filters, keyframes
├── astro.config.mjs               # Astro config with @astrojs/node adapter
├── package.json                   # Dependencies & build scripts
├── README.md                      # Source of truth documentation
└── tsconfig.json                  # TypeScript compiler settings
```

---

## ✦ Available Scripts & Commands

| Command | Action |
| :--- | :--- |
| `npx astro dev --background` | Starts background development server at `http://localhost:4321` |
| `npx astro dev status` | Checks dev server process health and port |
| `npx astro dev logs` | Displays dev server runtime logs |
| `npx astro dev stop` | Stops the running background dev server |
| `npm run build` | Compiles production server entrypoint to `./dist/` |
| `npm run preview` | Previews the compiled production build locally |

---

## ✦ API Reference

### 1. Birth Chart Calculation (`POST /api/birth-chart`)
* **Endpoint**: `/api/birth-chart`
* **Payload**:
  ```json
  {
    "name": "Maya Patel",
    "date": "1996-04-18",
    "time": "14:30",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "timezone": 5.5,
    "cityName": "New Delhi, India",
    "zodiacSystem": "vedic"
  }
  ```
  *(Set `"zodiacSystem": "western"` for Tropical 0° Ayanamsha coordinates).*
* **Response**:
  ```json
  {
    "success": true,
    "chart": {
      "zodiacSystem": "vedic",
      "ayanamsha": {
        "name": "Lahiri (Chitra Paksha)",
        "value": 23.8053,
        "formatted": "23° 48' 19\""
      },
      "ascendant": {
        "signName": "Leo",
        "signSanskrit": "Simha",
        "signNumber": 5,
        "degreeFormatted": "8° 59' 43\"",
        "nakshatra": "Magha",
        "pada": 3
      },
      "moonSign": { "signName": "Aries", "signSanskrit": "Mesha", "nakshatra": "Ashwini" },
      "sunSign": { "signName": "Aries", "signSanskrit": "Mesha" },
      "planets": [ ... ],
      "houses": [ ... ],
      "insights": { ... }
    }
  }
  ```

### 2. Chaldean Name Calculation (`POST /api/numerology`)
* **Endpoint**: `/api/numerology`
* **Payload**:
  ```json
  {
    "name": "Anisha Banerji",
    "system": "chaldean"
  }
  ```
* **Response**:
  ```json
  {
    "success": true,
    "result": {
      "name": "Anisha Banerji",
      "system": "chaldean",
      "totalCompound": 33,
      "rootNumber": 6,
      "compoundMeaning": "...",
      "profile": { "archetype": "...", "rulingPlanet": "Venus", "harmoniousNumbers": [3, 6, 9] }
    }
  }
  ```

---

## ✦ Consultation & Booking Architecture

```
Visitor clicks "Book a Consultation"
   │
   ▼
Routes to `/consultations#booking-form`
   │
   ├─► Validates Name, Email, Service, Date/Time, Timezone, Birth Data, Notes
   │
   ▼
Trigger Direct Gmail Flow
   ├── 1. Opens `mailto:anishabanerji@gmail.com?subject=...&body=...`
   ├── 2. Displays Direct Gmail Web Launcher (`https://mail.google.com/mail/?view=cm...`)
   └── 3. Provides "Copy Details" clipboard fallback button
   │
   ▼
100% of consultation requests arrive directly in Anisha Banerji's Gmail inbox
```

---

## ✦ Rights & Ownership

Proprietary platform created for **Anisha Banerji** (Astro by Anisha). All rights reserved.
