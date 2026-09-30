export interface TarotCard {
  id: string;
  number: string;
  name: string;
  archetype: string;
  image: string;
  keywords: string[];
  uprightMeaning: string;
  contemplation: string;
  affirmation: string;
}

export const TAROT_DECK: TarotCard[] = [
  {
    id: 'the-fool',
    number: '0',
    name: 'The Fool',
    archetype: 'The Sacred Leap',
    image: '/images/tarot/the-fool.webp',
    keywords: ['Pure Potential', 'Innocence', 'Spontaneous Trust', 'Fresh Beginning'],
    uprightMeaning:
      'The Fool invites you to step forward into uncharted territory with an open, uncluttered mind. Release the exhaustion of trying to orchestrate every detail in advance. Trust the quiet impulse toward life that arises when fear is set aside.',
    contemplation: 'What would you initiate today if you were entirely unburdened by past precedent?',
    affirmation: 'I step forward with an unburdened heart, trusting the unfolding journey.'
  },
  {
    id: 'the-magician',
    number: 'I',
    name: 'The Magician',
    archetype: 'The Conscious Channel',
    image: '/images/tarot/the-magician.webp',
    keywords: ['Focused Will', 'Manifestation', 'Alignment', 'Resourcefulness'],
    uprightMeaning:
      'You already possess the four fundamental tools needed for this threshold: vision, will, feeling, and practical discernment. The Magician asks you to stop waiting for external authorization and begin channeling your intention into tangible form.',
    contemplation: 'Where in your life are you waiting for permission that only you can grant yourself?',
    affirmation: 'I focus my attention, ground my intentions, and bring thought into form.'
  },
  {
    id: 'the-high-priestess',
    number: 'II',
    name: 'The High Priestess',
    archetype: 'The Silent Knower',
    image: '/images/tarot/the-high-priestess.webp',
    keywords: ['Intuitive Depth', 'The Unspoken', 'Inner Sanctuary', 'Equilibrium'],
    uprightMeaning:
      'The High Priestess sits at the threshold between what is visible and what is felt. Today is not for hurried action or forceful debate. Sit in receptive stillness; the answer you seek is already present beneath the surface chatter.',
    contemplation: 'What does your quietest inner voice know that your busy analytical mind resists?',
    affirmation: 'I honor stillness as a sacred source of clarity and wisdom.'
  },
  {
    id: 'the-empress',
    number: 'III',
    name: 'The Empress',
    archetype: 'The Fertile Ground',
    image: '/images/tarot/the-empress.webp',
    keywords: ['Creative Abundance', 'Sensory Presence', 'Nourishment', 'Patience'],
    uprightMeaning:
      'The Empress governs the natural timing of gestation and flowering. You cannot accelerate genuine growth through stress. Attend to your physical vitality, savor beauty in your immediate environment, and let things mature in their organic season.',
    contemplation: 'How can you nourish the seeds of your current creative or personal cycle without forcing the bloom?',
    affirmation: 'I rest in the natural rhythm of ease, growth, and abundant reception.'
  },
  {
    id: 'the-emperor',
    number: 'IV',
    name: 'The Emperor',
    archetype: 'The Sovereign Architect',
    image: '/images/tarot/the-emperor.webp',
    keywords: ['Clarity', 'Boundaries', 'Discernment', 'Stable Grounding'],
    uprightMeaning:
      'The Emperor brings steady sovereignty and healthy structure. Where there has been emotional ambiguity or passive hesitation, step forward with benevolent authority. Define your boundaries clearly and establish habits that protect your peace.',
    contemplation: 'Which area of your life currently requires firmer structure and compassionate discipline?',
    affirmation: 'I hold my ground with clarity, integrity, and calm self-possession.'
  },
  {
    id: 'the-hierophant',
    number: 'V',
    name: 'The Hierophant',
    archetype: 'The Keeper of Tradition',
    image: '/images/tarot/the-hierophant.webp',
    keywords: ['Lineage Wisdom', 'Shared Values', 'Spiritual Study', 'Mentorship'],
    uprightMeaning:
      'The Hierophant reminds us that we are rarely the first to cross this specific threshold. Seek counsel from tested lineages, wise elders, or time-honored spiritual disciplines. Anchor your immediate dilemmas within enduring principles.',
    contemplation: 'What ancestral or philosophical tradition offers steady compass for your present crossroads?',
    affirmation: 'I draw upon timeless wisdom to illuminate my contemporary path.'
  },
  {
    id: 'the-lovers',
    number: 'VI',
    name: 'The Lovers',
    archetype: 'The Sacred Covenant',
    image: '/images/tarot/the-lovers.webp',
    keywords: ['Soul Alignment', 'Inner Unity', 'Authentic Choice', 'Relational Truth'],
    uprightMeaning:
      'Beyond romantic union, The Lovers represents the radical act of choosing from your deepest authentic values. It mirrors the integration of inner opposites and invites honest vulnerability in how you meet yourself and others.',
    contemplation: 'Does your current choice reflect who you truly are, or merely who you feel expected to be?',
    affirmation: 'I choose with integrity, aligning my actions with the truth of my soul.'
  },
  {
    id: 'the-chariot',
    number: 'VII',
    name: 'The Chariot',
    archetype: 'The Disciplined Journey',
    image: '/images/tarot/the-chariot.webp',
    keywords: ['Unified Will', 'Mastery', 'Triumphant Focus', 'Direction'],
    uprightMeaning:
      'The Chariot harness seemingly opposing internal impulses—light and shadow, hesitation and urgency—directing them toward a singular noble purpose. Stay composed in the driver’s seat; do not allow emotional turbulence to swerve your vehicle.',
    contemplation: 'What conflicting desires inside you need to be harmonized into focused motion?',
    affirmation: 'I steer my life with disciplined focus, steady resolve, and grace.'
  },
  {
    id: 'strength',
    number: 'VIII',
    name: 'Strength',
    archetype: 'The Gentle Mastery',
    image: '/images/tarot/strength.webp',
    keywords: ['Compassion', 'Patience with the Shadow', 'Quiet Courage', 'Resilience'],
    uprightMeaning:
      'True power is not force; it is infinite gentleness meeting raw vulnerability. Strength shows a maiden taming the lion through tenderness and steady presence. Meet your own fear, anger, or impatience with patient understanding rather than suppression.',
    contemplation: 'How might compassionate listening heal a situation where forceful control has failed?',
    affirmation: 'My gentleness is my greatest power; I meet all things with patient grace.'
  },
  {
    id: 'the-hermit',
    number: 'IX',
    name: 'The Hermit',
    archetype: 'The Solitary Lantern',
    image: '/images/tarot/the-hermit.webp',
    keywords: ['Introspection', 'Solitude', 'Inner Light', 'Quiet Discernment'],
    uprightMeaning:
      'The Hermit invites you to step back from the clamor of external opinions and consult the quiet lantern of your own soul. The path ahead only reveals itself one deliberate step at a time. Embrace this fallow season of contemplation.',
    contemplation: 'What truth emerges when you quiet all external noise and listen in sacred solitude?',
    affirmation: 'I carry my own light; stillness reveals the next true step.'
  },
  {
    id: 'wheel-of-fortune',
    number: 'X',
    name: 'Wheel of Fortune',
    archetype: 'The Cosmic Cycle',
    image: '/images/tarot/wheel-of-fortune.webp',
    keywords: ['Planetary Seasons', 'Inevitable Shift', 'Adaptability', 'Center of the Wheel'],
    uprightMeaning:
      'All conditions in this physical realm are cyclical. When the Wheel turns, recognize that change is neither punishment nor accidental favor—it is the living rhythm of evolution. Anchor yourself at the calm axle of the wheel, watching the rim spin without vertigo.',
    contemplation: 'Which cycle in your life is naturally concluding to make way for the next rotation?',
    affirmation: 'I adapt gracefully to life’s seasons, anchored at my peaceful center.'
  },
  {
    id: 'justice',
    number: 'XI',
    name: 'Justice',
    archetype: 'The Clear Balance',
    image: '/images/tarot/justice.webp',
    keywords: ['Equilibrium', 'Karmic Cause & Effect', 'Uncompromising Truth', 'Fairness'],
    uprightMeaning:
      'Justice calls for total lucidity, honesty, and accountability. Weigh your motives without emotional distortion. When you act from righteousness and truth, the cosmic scales inevitably align in your favor.',
    contemplation: 'Where can you restore honesty and balanced equilibrium in your personal exchanges?',
    affirmation: 'I welcome truth with an open mind; my integrity creates balanced outcomes.'
  },
  {
    id: 'the-hanged-man',
    number: 'XII',
    name: 'The Hanged Man',
    archetype: 'The Sacred Pause',
    image: '/images/tarot/the-hanged-man.webp',
    keywords: ['Surrender', 'Inverted Perspective', 'Non-Resistance', 'Spiritual Shift'],
    uprightMeaning:
      'When your usual strategies stall, The Hanged Man counsels voluntary surrender. Cease struggling against the current. By suspending action and viewing your situation upside down, a profound re-orientation of values takes place.',
    contemplation: 'What struggle would immediately dissolve if you simply surrendered the need to control the outcome?',
    affirmation: 'In the sacred pause, I release control and discover higher vision.'
  },
  {
    id: 'death',
    number: 'XIII',
    name: 'Death',
    archetype: 'The Great Metamorphosis',
    image: '/images/tarot/death.webp',
    keywords: ['Essential Release', 'End of an Era', 'Clearing Space', 'Rebirth'],
    uprightMeaning:
      'Death is the ultimate herald of liberation. It signifies the peaceful shedding of outworn identities, contracts, or attachments that can no longer support your soul’s evolution. Do not mourn the withered leaf; it prepares the rich soil for spring.',
    contemplation: 'What identity or habit are you ready to lay to rest with gratitude and dignity?',
    affirmation: 'I release what is complete; every ending makes fertile ground for new life.'
  },
  {
    id: 'temperance',
    number: 'XIV',
    name: 'Temperance',
    archetype: 'The Alchemical Pour',
    image: '/images/tarot/temperance.webp',
    keywords: ['Harmony', 'Moderation', 'Patience', 'Spiritual Synthesis'],
    uprightMeaning:
      'Temperance is the conscious art of alchemy—blending the fiery impulse with the cooling water of discernment until a harmonious elixir emerges. Avoid extremes today. Peace is found in moderation, measured pacing, and gentle synthesis.',
    contemplation: 'How can you blend two seemingly contradictory aspects of your life into unified harmony?',
    affirmation: 'I live in balanced moderation, synthesizing grace with grounded purpose.'
  },
  {
    id: 'the-devil',
    number: 'XV',
    name: 'The Devil',
    archetype: 'The Unconscious Bind',
    image: '/images/tarot/the-devil.webp',
    keywords: ['Illusion of Bondage', 'Material Obsession', 'Shadow Work', 'Reclaiming Sovereignty'],
    uprightMeaning:
      'Notice the chains around the figures in The Devil card: they are loose enough to be slipped off at any second. This archetype mirrors where you have given away your power to fear, addictive patterns, or unhealthy obligations. Reclaim your freedom today.',
    contemplation: 'What belief or obligation is keeping you bound solely because you haven’t questioned it?',
    affirmation: 'I slip off the illusions of limitation and reclaim my sovereign freedom.'
  },
  {
    id: 'the-tower',
    number: 'XVI',
    name: 'The Tower',
    archetype: 'The Breakthrough of Truth',
    image: '/images/tarot/the-tower.webp',
    keywords: ['Awakening Flash', 'Shattered Illusion', 'Liberation', 'Radical Clarity'],
    uprightMeaning:
      'Lightning strikes only what was built on false pretenses. While the collapse of an illusion may feel disruptive, The Tower is an act of cosmic mercy that frees you from a prison you mistook for sanctuary. Breathe: truth has set you free.',
    contemplation: 'What sudden revelation or shake-up is clearing the foundation for authentic truth?',
    affirmation: 'I welcome the lightning of truth; what is built on reality cannot be destroyed.'
  },
  {
    id: 'the-star',
    number: 'XVII',
    name: 'The Star',
    archetype: 'The Waters of Hope',
    image: '/images/tarot/the-star.webp',
    keywords: ['Renewal', 'Inspiration', 'Unwavering Hope', 'Healing Grace'],
    uprightMeaning:
      'Following the upheaval of the Tower comes the cool, celestial balm of The Star. It promises that healing is already underway. Pour your genuine gifts freely into the world; your optimism is now anchored in hard-won maturity.',
    contemplation: 'Where in your life can you open your heart again to gentle hope and creative renewal?',
    affirmation: 'My spirit is renewed; I trust the gentle guidance of my highest star.'
  },
  {
    id: 'the-moon',
    number: 'XVIII',
    name: 'The Moon',
    archetype: 'The Subconscious Ocean',
    image: '/images/tarot/the-moon.webp',
    keywords: ['Dreamwork', 'Threshold of Shadow', 'Intuition vs Illusion', 'Patience with Fog'],
    uprightMeaning:
      'The Moon shines by reflected light, illuminating the mysterious landscape of dreams, primal instincts, and subconscious projections. Do not make permanent strategic decisions in the fog. Allow the night to speak its archetypal truths.',
    contemplation: 'What subconscious fear or vivid dream is asking to be acknowledged rather than avoided?',
    affirmation: 'I navigate the shadows of the unknown with calm, intuitive trust.'
  },
  {
    id: 'the-sun',
    number: 'XIX',
    name: 'The Sun',
    archetype: 'The Golden Radiance',
    image: '/images/tarot/the-sun.webp',
    keywords: ['Radiant Clarity', 'Vital Joy', 'Wholeheartedness', 'Celebration'],
    uprightMeaning:
      'The Sun dispels every shadow, bestowing warmth, vitality, and unmistakable transparency. Your efforts are illuminated; truth is obvious. Step out into the light with child-like spontaneity and uninhibited confidence.',
    contemplation: 'What joy or creative success is available for you to wholeheartedly celebrate today?',
    affirmation: 'I radiate warmth, joy, and clarity; my path is bright and clear.'
  },
  {
    id: 'judgement',
    number: 'XX',
    name: 'Judgement',
    archetype: 'The Soul Awakening',
    image: '/images/tarot/judgement.webp',
    keywords: ['Higher Calling', 'Forgiveness', 'Reckoning', 'Self-Realization'],
    uprightMeaning:
      'The trumpet sounds for your spiritual awakening. Judgement is not condemnation; it is the moment of honest self-evaluation that liberates you from past regret. Forgive old versions of yourself and answer the higher call of your life.',
    contemplation: 'What higher chapter of your purpose is calling you to rise up and leave the past behind?',
    affirmation: 'I forgive the past, answer my higher calling, and rise renewed.'
  },
  {
    id: 'the-world',
    number: 'XXI',
    name: 'The World',
    archetype: 'The Wholeness Completed',
    image: '/images/tarot/the-world.webp',
    keywords: ['Mastery', 'Cosmic Wholeness', 'Completion of Cycle', 'Celebration of Arrival'],
    uprightMeaning:
      'The World represents the triumphant integration of your entire journey. You have completed a major lesson and arrived at conscious wholeness. Pause to honor how far you have walked before beginning the next grand cycle.',
    contemplation: 'What major milestone or cycle of personal growth are you ready to celebrate today?',
    affirmation: 'I celebrate my wholeness; I dance with the harmonious rhythm of the cosmos.'
  }
];
