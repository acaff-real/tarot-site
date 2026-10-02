## Development

When starting the dev server, use background mode:

```bash
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

---

## Agent Guidelines & Source of Truth

Consult [README.md](file:///C:/Users/vi/Desktop/agy/personal/tarot/README.md) for full project architecture and technical specifications.

### Strict Rules:
1. **Brand Name**: **Astrology with Anisha** (NOT "Astro by Anisha" or "Astrology by Anisha").
2. **Practitioner**: **Anisha Banerji** (NOT "Sharma").
3. **Navigation Tabs**: Strict 4-tab structure: `Home` (`/`), `About` (`/about`), `Articles` (`/articles`), `Contact` (`/contact`), with primary action **"Book a Consultation"** (same for the footer).
4. **Copy Consistency**: Always use **"Book a Consultation"** (NEVER "Book a session").
5. **No Consultation Prices**: Never display prices on the website.
6. **Direct Gmail Destination**: All consultation inquiries and contact forms route directly to **`anishabanerji@gmail.com`**.
7. **Calculators**: Use the **Parashar calculation chart** (sidereal diamond chart); support both **Vedic (Sidereal/Lahiri)** and **Western (Tropical)** calculation modes.
8. **Forbidden Terminology**: Do NOT use *Sacred Sound Geometry*, *Cosmic Dispatches*, *Sacred Numerology*, *Private Advisory*, or *Karmic Destiny Codes*.
9. **Git Operations**: **DO NOT RUN GIT COMMANDS** (`git add`, `git commit`, `git push`). The user handles all version control manually.

---

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
