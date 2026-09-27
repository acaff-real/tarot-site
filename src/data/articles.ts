export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Vedic Astrology' | 'Intuitive Tarot' | 'Numerology' | 'Editorial Insights';
  date: string;
  readingTime: string;
  featuredImage: string;
  tags: string[];
  content: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'the-alchemy-of-sade-sati',
    title: "The Alchemy of Sade Sati: Dismantling the Fear of Saturn's Sacred Transition",
    excerpt: 'Saturn is not an adversary to be appeased, but a master architect pruning what is obsolete. How to navigate this seven-and-a-half-year rite of passage with grace.',
    category: 'Vedic Astrology',
    date: 'February 18, 2026',
    readingTime: '7 min read',
    featuredImage: '/images/studio.jpg',
    tags: ['Vedic Astrology', 'Saturn', 'Sade Sati', 'Spiritual Growth'],
    content: `
      <p class="lead">In popular astrology, few astrological passages evoke as much anxiety as <em>Sade Sati</em>—the approximate seven-and-a-half-year period when Shani (Saturn) transits the 12th, 1st, and 2nd houses from your natal Moon (Chandra).</p>

      <p>Centuries of superstitious folklore have painted Saturn as a punitive force demanding appeasement through rituals. Yet in traditional Parashari Jyotish, Saturn represents <em>Vairagya</em> (sacred detachment), <em>Tapasya</em> (discipline), and uncompromised truth. Saturn is the cosmic auditor: he does not take anything that was genuinely yours to keep; he merely dismantles the illusions, ego dependencies, and fragile structures you outgrew years ago.</p>

      <h2>The Three Phases of Shani's Transit</h2>
      <p>Sade Sati unfolds in three distinct movements of approximately 2.5 years each:</p>
      <ul>
        <li><strong>First Phase (Transit through 12th from Moon):</strong> Mental unrest, financial recalibration, and feelings of isolation. This phase pulls attention inward, asking you to shed unnecessary commitments and resolve subconscious karmic debts.</li>
        <li><strong>Second Phase (Transit directly over Natal Moon):</strong> The core crucible. Saturn directly presses against your emotional sanctuary. It demands radical emotional maturity, psychological self-reliance, and physical groundedness.</li>
        <li><strong>Third Phase (Transit through 2nd from Moon):</strong> Stabilization of family dynamics, finances, and speech. The lessons learned during the peak phase now crystallize into enduring foundation and self-worth.</li>
      </ul>

      <blockquote>"Saturn does not hurry, and he does not bargain. When you surrender resistance and commit to quiet craftsmanship, Saturn grants what no other planet can: unshakeable inner sovereignty."</blockquote>

      <h2>Constructive Alignment During Sade Sati</h2>
      <p>Rather than adopting a defensive posture, approach this window as an intentional apprenticeship with life. Simplify your routines, honor commitments, practice generosity toward those less privileged (a direct remedy for Saturn), and welcome the quiet clarity that only disciplined simplicity can bring.</p>
    `,
  },
  {
    slug: 'understanding-your-lagna',
    title: 'Understanding Your Lagna: Why Your Vedic Ascendant Holds the Blueprint of Your Soul',
    excerpt: 'While popular Western astrology centers the Sun sign, traditional Vedic wisdom begins with the Lagna. Here is why the rising degree is your truest karmic compass.',
    category: 'Vedic Astrology',
    date: 'January 28, 2026',
    readingTime: '6 min read',
    featuredImage: '/images/anisha.webp',
    tags: ['Vedic Astrology', 'Lagna', 'Ascendant', 'Birth Chart'],
    content: `
      <p class="lead">If you have only ever known yourself through a generic newspaper horoscope, you have likely encountered only a fraction of your celestial architecture. In Vedic astrology (Jyotish), the focal point of the entire birth chart is the <strong>Lagna</strong>, or Ascendant.</p>

      <p>The Lagna is the exact degree of the eastern horizon rising at the precise moment you took your first breath. Because the earth rotates through all 12 signs in 24 hours, the Lagna shifts every two hours. It is intensely personal, capturing the specific doorway through which your consciousness entered physical form.</p>

      <h2>The Three Pillars of Your Chart</h2>
      <p>Vedic astrology harmonizes three primary coordinates to understand the complete individual:</p>
      <ol>
        <li><strong>The Lagna (Ascendant):</strong> Your physical embodiment, vitality, worldview, and how you meet the world. It dictates the house cusps of all other eleven houses in your chart.</li>
        <li><strong>Chandra Lagna (Moon Sign):</strong> The psychological mind (<em>Manas</em>), emotional equilibrium, and your perceptual lens. In India, your Janma Rashi is considered the primary anchor of daily experience.</li>
        <li><strong>Surya Lagna (Sun Sign):</strong> The soul's core vitality (<em>Atman</em>), leadership capacity, and relationship to dharma and authority.</li>
      </ol>

      <p>When you calculate your true sidereal Lagna using the Lahiri Ayanamsha, you often discover that your rising sign shifts from its tropical Western position. For many clients, this recalculation feels like a homecoming—a sudden, clear explanation for why certain life patterns consistently repeat.</p>
    `,
  },
  {
    slug: 'tarot-as-a-contemplative-mirror',
    title: 'Tarot as a Contemplative Mirror: Beyond Fortune-Telling into Psychological Clarity',
    excerpt: 'The true power of the 78 cards lies not in predicting a predetermined destiny, but in illuminating the unconscious currents shaping your present choices.',
    category: 'Intuitive Tarot',
    date: 'December 14, 2025',
    readingTime: '5 min read',
    featuredImage: '/images/studio.jpg',
    tags: ['Tarot', 'Archetypes', 'Intuition', 'Psychology'],
    content: `
      <p class="lead">Too often, tarot is reduced to theatrical fortune-telling—a passive attempt to spy on the future. But in my practice, the cards are held as a sacred, contemplative mirror: a rich visual language of archetypes that speaks directly to the subconscious mind.</p>

      <p>Rooted in Carl Jung's concepts of synchronicity and active imagination, a thoughtful tarot reading does not proclaim that your fate is sealed in stone. Instead, it freezes a snapshot of your current psychological and energetic field, clarifying:</p>
      <ul>
        <li>What unconscious desires or fears are secretly steering the vehicle?</li>
        <li>Where are you withholding your authentic voice in partnerships?</li>
        <li>What latent resources or creative instincts are waiting to be reclaimed?</li>
      </ul>

      <h2>A Sovereign Approach to the Cards</h2>
      <p>You always retain free will. When difficult cards appear—such as The Tower or Ten of Swords—they are never causes for alarm. They are gracious warnings of where an unsustainable structure is ready to fall, liberating space for authentic rebuilding.</p>
    `,
  },
  {
    slug: 'the-sacred-vibration-of-your-name',
    title: 'The Sacred Vibration of Your Name: How Chaldean Numerology Harmonizes Personal Energy',
    excerpt: 'Sound is sacred geometry in motion. Discover how ancient Chaldean numerology decodes the compound resonance of your given and chosen names.',
    category: 'Numerology',
    date: 'November 05, 2025',
    readingTime: '8 min read',
    featuredImage: '/images/studio.jpg',
    tags: ['Numerology', 'Chaldean', 'Name Vibration', 'Sound Resonance'],
    content: `
      <p class="lead">In ancient Vedic science, sound is held as the primordial fabric of creation (<em>Nada Brahma</em>). Every syllable uttered generates a specific acoustic frequency that interacts with the nervous system and the energetic field.</p>

      <p>Chaldean numerology, preserved for millennia across ancient Mesopotamia and integrated deeply into Indian astro-numerology, assigns numerical values to letters based on their sound vibration rather than their alphabetical sequence.</p>

      <h2>Single Digits vs. Compound Numbers</h2>
      <p>While the single root number (1 through 9) reveals your general archetype and planetary ruler, the compound number (the unreduced total, such as 19, 24, 27, or 37) reveals the hidden currents, trials, and blessings encoded within your name.</p>
      <p>For example, while both 19 and 28 reduce to root number 1, compound 19 is known as 'The Prince of Heaven'—radiating joy, honor, and clear victory. Compound 28, conversely, indicates immense capability that must constantly navigate external competition and requires disciplined foresight.</p>
    `,
  },
];
