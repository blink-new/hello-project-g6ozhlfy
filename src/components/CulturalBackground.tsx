import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WorldMap from './WorldMap'
import CultureFactModal from './CultureFactModal'

interface CulturalBackgroundProps {
  language: string
  country: string
}

// Language-focused fun facts
const languageFacts: Record<string, string[]> = {
  'French': [
    'French is an official language in 29 countries.',
    'French is a Romance language descended from Latin.',
    'French was the official language of England for about 300 years.',
    'French is the second most studied language in the world after English.',
    'About 300 million people speak French worldwide.'
  ],
  'Japanese': [
    'Japanese uses three writing systems: Kanji, Hiragana, and Katakana.',
    'Japanese is an isolated language, not closely related to any other major language.',
    'There are dozens of dialects spoken across Japan.',
    'Japanese has no plural form for nouns.'
  ],
  'Spanish': [
    'Spanish is the world’s second-most spoken native language.',
    'Spanish originated in the Castile region of Spain.',
    'Over 20 countries have Spanish as an official language.',
    'The Spanish language has two names: español and castellano.'
  ],
  'Chinese': [
    'Mandarin Chinese is the most spoken native language in the world.',
    'Chinese uses a logographic writing system with thousands of characters.',
    'Chinese is a tonal language—meaning pitch changes word meaning.',
    'There are many Chinese dialects, but Mandarin is the official language.'
  ],
  'German': [
    'German is the most widely spoken native language in the European Union.',
    'German nouns are capitalized and have three genders.',
    'The longest published German word is 79 letters long.',
    'German is known for its compound words.'
  ],
  'Italian': [
    'Italian is a Romance language closely related to Latin.',
    'Italian is the official language of music (think: piano, forte, allegro).',
    'Standard Italian is based on the Tuscan dialect.',
    'Italian has only 21 letters in its alphabet.'
  ],
  'Russian': [
    'Russian uses the Cyrillic alphabet.',
    'Russian is the most widely spoken Slavic language.',
    'Russian is one of the six official languages of the United Nations.',
    'Russian has no word for “the” or “a”.'
  ],
  'Korean': [
    'Korean uses a unique alphabet called Hangul.',
    'Hangul was invented in the 15th century by King Sejong.',
    'Korean is a language isolate, not related to Chinese or Japanese.',
    'Korean verbs always come at the end of a sentence.'
  ],
  'Arabic': [
    'Arabic is written from right to left.',
    'Arabic has influenced many languages, including Spanish and English.',
    'There are many dialects of Arabic, but Modern Standard Arabic is used in writing.',
    'Arabic is the liturgical language of Islam.'
  ],
  'Hindi': [
    'Hindi is written in the Devanagari script.',
    'Hindi and Urdu are mutually intelligible in conversation.',
    'Hindi is the fourth most spoken first language in the world.',
    'Hindi belongs to the Indo-Aryan branch of the Indo-European family.'
  ],
  'Portuguese': [
    'Portuguese is the official language of nine countries.',
    'Portuguese is the sixth most spoken language in the world.',
    'Brazil has the largest population of Portuguese speakers.',
    'Portuguese has two main dialect groups: European and Brazilian.'
  ],
  'Dutch': [
    'Dutch is closely related to English and German.',
    'Dutch is the parent language of Afrikaans.',
    'Dutch is spoken in the Netherlands, Belgium, and Suriname.',
    'Dutch has many loanwords from French and English.'
  ],
  'Swedish': [
    'Swedish is a North Germanic language.',
    'Swedish shares mutual intelligibility with Norwegian and Danish.',
    'Swedish has 29 letters in its alphabet.',
    'Swedish is the official language of Finland alongside Finnish.'
  ],
  'Norwegian': [
    'Norwegian has two official written forms: Bokmål and Nynorsk.',
    'Norwegian is mutually intelligible with Swedish and Danish.',
    'Norwegian is a tonal language, rare for Europe.',
    'Norwegian has many dialects.'
  ],
  'Finnish': [
    'Finnish is not related to Swedish, despite being neighbors.',
    'Finnish belongs to the Finno-Ugric language family.',
    'Finnish has 15 grammatical cases.',
    'Finnish is known for its long compound words.'
  ],
  'Czech': [
    'Czech is a West Slavic language.',
    'Czech and Slovak are mutually intelligible.',
    'Czech uses the Latin alphabet with diacritics.',
    'Czech has a rich tradition of literature and music.'
  ],
  'Hungarian': [
    'Hungarian is not related to any neighboring language.',
    'Hungarian has 18 grammatical cases.',
    'Hungarian is a Uralic language, like Finnish and Estonian.',
    'Hungarian uses vowel harmony.'
  ],
  'Latvian': [
    'Latvian is one of only two living Baltic languages.',
    'Latvian uses the Latin alphabet with diacritics.',
    'Latvian has three dialects.',
    'Latvian is known for its folk songs.'
  ],
  'Estonian': [
    'Estonian is closely related to Finnish.',
    'Estonian has 14 grammatical cases.',
    'Estonian is not an Indo-European language.',
    'Estonian has many loanwords from German.'
  ],
  'Turkish': [
    'Turkish uses the Latin alphabet.',
    'Turkish is an agglutinative language, meaning words are formed by stringing together morphemes.',
    'Turkish was written in Arabic script before 1928.',
    'Turkish is spoken by about 80 million people.'
  ],
  'Greek': [
    'Greek has the longest documented history of any Indo-European language.',
    'Greek uses its own unique alphabet.',
    'Many English words have Greek roots.',
    'Greek is the official language of Greece and Cyprus.'
  ],
  'Azerbaijani': [
    'Azerbaijani is a Turkic language.',
    'Azerbaijani is spoken in Azerbaijan and parts of Iran.',
    'Azerbaijani uses the Latin alphabet.',
    'Azerbaijani has vowel harmony.'
  ],
  'Indonesian': [
    'Indonesian is based on Malay.',
    'Indonesian is the official language of Indonesia.',
    'Indonesian uses the Latin alphabet.',
    'Indonesian is spoken by over 200 million people.'
  ],
  'Filipino': [
    'Filipino is based on Tagalog.',
    'Filipino is the national language of the Philippines.',
    'Filipino incorporates words from Spanish, English, and Chinese.',
    'Filipino uses the Latin alphabet.'
  ],
  'Vietnamese': [
    'Vietnamese uses a Latin-based alphabet called Quốc Ngữ.',
    'Vietnamese is a tonal language.',
    'Vietnamese has six tones.',
    'Vietnamese is the official language of Vietnam.'
  ],
  'Afrikaans': [
    'Afrikaans evolved from Dutch in the 17th century.',
    'Afrikaans is one of the youngest languages in the world.',
    'Afrikaans is spoken in South Africa and Namibia.',
    'Afrikaans has no grammatical gender.'
  ],
  'Swahili': [
    'Swahili is a Bantu language.',
    'Swahili is spoken in over a dozen African countries.',
    'Swahili has many loanwords from Arabic.',
    'Swahili is the lingua franca of East Africa.'
  ],
  'Thai': [
    'Thai is a tonal language with five tones.',
    'Thai uses its own unique script.',
    'Thai is the official language of Thailand.',
    'Thai has no spaces between words in writing.'
  ],
  'Malay': [
    'Malay is spoken in Malaysia, Indonesia, Brunei, and Singapore.',
    'Malay uses the Latin alphabet.',
    'Malay is an Austronesian language.',
    'Malay has influenced many other Southeast Asian languages.'
  ],
  'Polish': [
    'Polish is a West Slavic language.',
    'Polish uses the Latin alphabet with additional letters.',
    'Polish has seven grammatical cases.',
    'Polish is the official language of Poland.'
  ],
  'Danish': [
    'Danish is a North Germanic language.',
    'Danish is mutually intelligible with Norwegian and Swedish.',
    'Danish uses the Latin alphabet.',
    'Danish is the official language of Denmark.'
  ],
  'Lithuanian': [
    'Lithuanian is one of the oldest languages in Europe.',
    'Lithuanian is closely related to Latvian.',
    'Lithuanian uses the Latin alphabet.',
    'Lithuanian has preserved many archaic features of Proto-Indo-European.'
  ],
  'Hawaiian': [
    'Hawaiian has only 13 letters in its alphabet.',
    'Hawaiian is a Polynesian language.',
    'Hawaiian is an official language of Hawaii.',
    'Hawaiian words are often long and melodic.'
  ],
  'Yiddish': [
    'Yiddish is written in the Hebrew alphabet.',
    'Yiddish developed as a fusion of German, Hebrew, and Slavic languages.',
    'Yiddish was once spoken by over 10 million Jews in Europe.',
    'Yiddish is still spoken in some Jewish communities today.'
  ],
  'Luxembourgish': [
    'Luxembourgish is a West Germanic language.',
    'Luxembourgish is spoken in Luxembourg and surrounding regions.',
    'Luxembourgish uses the Latin alphabet.',
    'Luxembourgish became an official language of Luxembourg in 1984.'
  ],
  'Croatian': [
    'Croatian is a South Slavic language.',
    'Croatian uses the Latin alphabet.',
    'Croatian is the official language of Croatia.',
    'Croatian has three main dialects.'
  ],
  'Serbian': [
    'Serbian can be written in both Cyrillic and Latin alphabets.',
    'Serbian is a South Slavic language.',
    'Serbian is the official language of Serbia.',
    'Serbian is the only European language with active digraphia.'
  ],
  'Slovak': [
    'Slovak is a West Slavic language.',
    'Slovak and Czech are mutually intelligible.',
    'Slovak uses the Latin alphabet.',
    'Slovak has six grammatical cases.'
  ],
  'Hausa': [
    'Hausa is a Chadic language.',
    'Hausa is written in both Latin and Arabic scripts.',
    'Hausa is spoken by over 50 million people.',
    'Hausa is a major language of West Africa.'
  ],
  'Burmese': [
    'Burmese is the official language of Myanmar.',
    'Burmese uses the Burmese script.',
    'Burmese is a tonal language.',
    'Burmese is a Sino-Tibetan language.'
  ],
  'Uzbek': [
    'Uzbek is a Turkic language.',
    'Uzbek is written in Latin, Cyrillic, and Arabic scripts.',
    'Uzbek is the official language of Uzbekistan.',
    'Uzbek has vowel harmony.'
  ],
  'Kazakh': [
    'Kazakh is a Turkic language.',
    'Kazakh is written in Cyrillic, but will switch to Latin by 2031.',
    'Kazakh is spoken in Kazakhstan and neighboring countries.',
    'Kazakh has vowel harmony.'
  ],
  'Mongolian': [
    'Mongolian is written in both Cyrillic and traditional Mongolian script.',
    'Mongolian is the official language of Mongolia.',
    'Mongolian is an Altaic language.',
    'Mongolian has vowel harmony.'
  ],
  'Kyrgyz': [
    'Kyrgyz is a Turkic language.',
    'Kyrgyz is written in Cyrillic script.',
    'Kyrgyz is the official language of Kyrgyzstan.',
    'Kyrgyz has vowel harmony.'
  ],
  'Turkmen': [
    'Turkmen is a Turkic language.',
    'Turkmen is written in Latin script.',
    'Turkmen is the official language of Turkmenistan.',
    'Turkmen has vowel harmony.'
  ],
  'Tajik': [
    'Tajik is a variety of Persian.',
    'Tajik is written in Cyrillic script.',
    'Tajik is the official language of Tajikistan.',
    'Tajik has many Russian loanwords.'
  ],
  'English': [
    'English is the most widely spoken language in the world (by total speakers).',
    'English is a Germanic language with a large vocabulary from Latin and French.',
    'English is the official language of over 60 countries.',
    'English has no official regulatory body.'
  ]
};

export default function CulturalBackground({ language }: CulturalBackgroundProps) {
  const [modal, setModal] = useState<{ icon: string; fact: string } | null>(null);

  // ...getCulturalData and generatePositions as before...
  const getCulturalData = () => {
    switch (language) {
      case 'French':
        return {
          elements: ['🗼', '🥖', '🧀', '🍷', '⚜️'],
          pattern: 'from-blue-100/20 to-red-100/20',
          symbols: ['⚜️', '🌺'],
          countries: ['FR', 'CA', 'BE', 'CH']
        }
      case 'Spanish':
        return {
          elements: ['🏛️', '🥘', '💃', '🌶️', '🌻'],
          pattern: 'from-yellow-100/20 to-red-100/20',
          symbols: ['🌻', '⭐'],
          countries: ['ES', 'MX', 'CO', 'AR', 'PE']
        }
      case 'Japanese':
        return {
          elements: ['🌸', '🏯', '🍣', '⛩️', '🎋'],
          pattern: 'from-pink-100/20 to-red-100/20',
          symbols: ['🌸', '⭐'],
          countries: ['JP']
        }
      case 'Chinese':
        return {
          elements: ['🏮', '🐉', '🥢', '🏯', '🎋'],
          pattern: 'from-red-100/20 to-yellow-100/20',
          symbols: ['🏮', '⭐'],
          countries: ['CN', 'TW', 'SG']
        }
      case 'German':
        return {
          elements: ['🏰', '🍺', '🥨', '🌲', '⚙️'],
          pattern: 'from-yellow-100/20 to-red-100/20',
          symbols: ['⚙️', '🌲'],
          countries: ['DE', 'AT', 'CH']
        }
      case 'Italian':
        return {
          elements: ['🍝', '🍕', '🏛️', '🎭', '🍷'],
          pattern: 'from-green-100/20 to-red-100/20',
          symbols: ['🎭', '⭐'],
          countries: ['IT', 'CH']
        }
      case 'Russian':
        return {
          elements: ['🏛️', '❄️', '🎪', '🪆', '🌟'],
          pattern: 'from-blue-100/20 to-white/20',
          symbols: ['❄️', '🌟'],
          countries: ['RU', 'BY', 'KZ']
        }
      case 'Korean':
        return {
          elements: ['🏯', '🌸', '🥢', '🎋', '⭐'],
          pattern: 'from-blue-100/20 to-pink-100/20',
          symbols: ['🌸', '⭐'],
          countries: ['KR', 'KP']
        }
      case 'Arabic':
        return {
          elements: ['🕌', '🌙', '⭐', '🏺', '🌴'],
          pattern: 'from-green-100/20 to-yellow-100/20',
          symbols: ['🌙', '⭐'],
          countries: ['SA', 'EG', 'DZ', 'MA']
        }
      case 'Hindi':
        return {
          elements: ['🕌', '🪔', '🌺', '🐘', '🌞'],
          pattern: 'from-orange-100/20 to-yellow-100/20',
          symbols: ['🌺', '🌞'],
          countries: ['IN']
        }
      default:
        return {
          elements: ['🌍', '⭐', '🌟', '✨', '🌈'],
          pattern: 'from-blue-100/20 to-purple-100/20',
          symbols: ['⭐', '✨'],
          countries: []
        }
    }
  }
  const cultural = getCulturalData()
  const generatePositions = (count: number) => {
    const positions = []
    for (let i = 0; i < count; i++) {
      positions.push({
        left: Math.random() * 90 + 5,
        top: Math.random() * 80 + 10,
        delay: Math.random() * 0.5
      })
    }
    return positions
  }
  const bigElementPositions = generatePositions(12)
  const smallElementPositions = generatePositions(20)

  // Helper to get a random fact for the current language
  function getRandomFactForLanguage(lang: string) {
    const facts = languageFacts[lang]
    if (!facts || facts.length === 0) return 'A beautiful symbol of this language!'
    return facts[Math.floor(Math.random() * facts.length)]
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient overlay that matches the culture */}
      <motion.div
        key={`gradient-${language}`}
        className={`absolute inset-0 bg-gradient-to-br ${cultural.pattern}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      {/* World Map Layer */}
      <WorldMap highlightCountries={cultural.countries} />
      {/* Floating cultural elements (big) - now clickable */}
      <div className="pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={`elements-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {bigElementPositions.map((pos, i) => (
              <motion.div
                key={`${language}-big-${i}`}
                className="absolute text-6xl select-none cursor-pointer pointer-events-auto"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  zIndex: 20
                }}
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={{ opacity: 0.25, scale: 1, y: 0, rotate: [0, 10, -10, 0] }}
                exit={{ opacity: 0, scale: 0, y: -50 }}
                transition={{ duration: 0.5, delay: pos.delay, rotate: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" } }}
                onClick={() => {
                  const icon = cultural.elements[i % cultural.elements.length];
                  setModal({
                    icon,
                    fact: getRandomFactForLanguage(language)
                  });
                }}
              >
                {cultural.elements[i % cultural.elements.length]}
              </motion.div>
            ))}
            {/* Medium and small elements remain non-clickable for now */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`${language}-medium-${i}`}
                className="absolute text-4xl select-none"
                style={{ left: `${15 + (i * 10)}%`, top: `${20 + (i * 8)}%` }}
                initial={{ opacity: 0, scale: 0, y: 30 }}
                animate={{ opacity: 0.2, scale: 1, y: 0, rotate: [0, -5, 5, 0] }}
                exit={{ opacity: 0, scale: 0, y: -30 }}
                transition={{ duration: 0.5, delay: i * 0.07, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
              >
                {cultural.elements[i % cultural.elements.length]}
              </motion.div>
            ))}
            {smallElementPositions.map((pos, i) => (
              <motion.div
                key={`${language}-small-${i}`}
                className="absolute text-3xl select-none"
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.15, scale: 1, y: [0, -15, 0] }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: pos.delay, y: { duration: 3 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" } }}
              >
                {cultural.symbols[i % cultural.symbols.length]}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Modal for fun fact - always on top and interactive */}
      <CultureFactModal
        open={!!modal}
        onClose={() => setModal(null)}
        icon={modal?.icon || ''}
        fact={modal?.fact || ''}
      />
    </div>
  )
}