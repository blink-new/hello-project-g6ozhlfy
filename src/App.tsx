import { useState } from 'react'
import { motion } from 'framer-motion'
import HelloCard from './components/HelloCard'
import CulturalBackground from './components/CulturalBackground'
import { Globe } from 'lucide-react'

// A large array of greetings in many languages
const greetings = [
  { text: 'Hello, World!', lang: 'English', country: 'US', icon: Globe, color: 'from-purple-500 to-pink-500' },
  { text: 'Bonjour!', lang: 'French', country: 'FR', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  { text: '¡Hola!', lang: 'Spanish', country: 'ES', icon: Globe, color: 'from-orange-500 to-red-500' },
  { text: 'Hallo!', lang: 'German', country: 'DE', icon: Globe, color: 'from-indigo-500 to-purple-500' },
  { text: 'Ciao!', lang: 'Italian', country: 'IT', icon: Globe, color: 'from-green-500 to-emerald-500' },
  { text: 'Olá!', lang: 'Portuguese', country: 'PT', icon: Globe, color: 'from-pink-500 to-yellow-500' },
  { text: 'Привет!', lang: 'Russian', country: 'RU', icon: Globe, color: 'from-blue-700 to-blue-300' },
  { text: 'こんにちは!', lang: 'Japanese', country: 'JP', icon: Globe, color: 'from-red-500 to-yellow-400' },
  { text: '你好!', lang: 'Chinese', country: 'CN', icon: Globe, color: 'from-orange-400 to-red-600' },
  { text: '안녕하세요!', lang: 'Korean', country: 'KR', icon: Globe, color: 'from-blue-400 to-pink-400' },
  { text: 'مرحبا!', lang: 'Arabic', country: 'SA', icon: Globe, color: 'from-green-700 to-green-300' },
  { text: 'שלום!', lang: 'Hebrew', country: 'IL', icon: Globe, color: 'from-blue-900 to-blue-400' },
  { text: 'नमस्ते!', lang: 'Hindi', country: 'IN', icon: Globe, color: 'from-yellow-500 to-orange-600' },
  { text: 'Sawubona!', lang: 'Zulu', country: 'ZA', icon: Globe, color: 'from-green-600 to-yellow-400' },
  { text: 'Salam!', lang: 'Persian', country: 'IR', icon: Globe, color: 'from-purple-700 to-pink-400' },
  { text: 'Hej!', lang: 'Swedish', country: 'SE', icon: Globe, color: 'from-blue-400 to-yellow-300' },
  { text: 'Hei!', lang: 'Norwegian', country: 'NO', icon: Globe, color: 'from-blue-500 to-green-300' },
  { text: 'Hei!', lang: 'Finnish', country: 'FI', icon: Globe, color: 'from-blue-300 to-indigo-400' },
  { text: 'Hallo!', lang: 'Dutch', country: 'NL', icon: Globe, color: 'from-orange-400 to-yellow-300' },
  { text: 'Ahoj!', lang: 'Czech', country: 'CZ', icon: Globe, color: 'from-red-400 to-blue-400' },
  { text: 'Szia!', lang: 'Hungarian', country: 'HU', icon: Globe, color: 'from-pink-400 to-purple-400' },
  { text: 'Sveiki!', lang: 'Latvian', country: 'LV', icon: Globe, color: 'from-yellow-400 to-green-400' },
  { text: 'Tere!', lang: 'Estonian', country: 'EE', icon: Globe, color: 'from-blue-400 to-green-400' },
  { text: 'Merhaba!', lang: 'Turkish', country: 'TR', icon: Globe, color: 'from-red-400 to-yellow-400' },
  { text: 'Γειά σου!', lang: 'Greek', country: 'GR', icon: Globe, color: 'from-blue-400 to-white' },
  { text: 'Selam!', lang: 'Azerbaijani', country: 'AZ', icon: Globe, color: 'from-blue-400 to-red-400' },
  { text: 'Halo!', lang: 'Indonesian', country: 'ID', icon: Globe, color: 'from-green-400 to-yellow-400' },
  { text: 'Kamusta!', lang: 'Filipino', country: 'PH', icon: Globe, color: 'from-yellow-400 to-orange-400' },
  { text: 'Xin chào!', lang: 'Vietnamese', country: 'VN', icon: Globe, color: 'from-green-400 to-blue-400' },
  { text: 'Hallo!', lang: 'Afrikaans', country: 'ZA', icon: Globe, color: 'from-yellow-400 to-green-400' },
  { text: 'Jambo!', lang: 'Swahili', country: 'KE', icon: Globe, color: 'from-green-400 to-yellow-400' },
  { text: 'Sawadee!', lang: 'Thai', country: 'TH', icon: Globe, color: 'from-pink-400 to-yellow-400' },
  { text: 'Selamat!', lang: 'Malay', country: 'MY', icon: Globe, color: 'from-green-400 to-blue-400' },
  { text: 'Dzień dobry!', lang: 'Polish', country: 'PL', icon: Globe, color: 'from-red-400 to-white' },
  { text: 'Hallo!', lang: 'Danish', country: 'DK', icon: Globe, color: 'from-red-400 to-white' },
  { text: 'Sveiki!', lang: 'Lithuanian', country: 'LT', icon: Globe, color: 'from-yellow-400 to-green-400' },
  { text: 'Aloha!', lang: 'Hawaiian', country: 'US-HI', icon: Globe, color: 'from-pink-400 to-yellow-400' },
  { text: 'Shalom!', lang: 'Yiddish', country: 'IL', icon: Globe, color: 'from-blue-400 to-white' },
  { text: 'Hallo!', lang: 'Luxembourgish', country: 'LU', icon: Globe, color: 'from-blue-400 to-green-400' },
  { text: 'Moien!', lang: 'Luxembourgish', country: 'LU', icon: Globe, color: 'from-green-400 to-blue-400' },
  { text: 'Tjena!', lang: 'Swedish', country: 'SE', icon: Globe, color: 'from-blue-400 to-yellow-400' },
  { text: 'Salve!', lang: 'Latin', country: 'VA', icon: Globe, color: 'from-yellow-400 to-white' },
  { text: 'Hallo!', lang: 'Flemish', country: 'BE', icon: Globe, color: 'from-yellow-400 to-red-400' },
  { text: 'Bok!', lang: 'Croatian', country: 'HR', icon: Globe, color: 'from-blue-400 to-red-400' },
  { text: 'Zdravo!', lang: 'Serbian', country: 'RS', icon: Globe, color: 'from-red-400 to-blue-400' },
  { text: 'Ahoj!', lang: 'Slovak', country: 'SK', icon: Globe, color: 'from-blue-400 to-yellow-400' },
  { text: 'Tere!', lang: 'Estonian', country: 'EE', icon: Globe, color: 'from-green-400 to-blue-400' },
  { text: 'Sveiki!', lang: 'Latvian', country: 'LV', icon: Globe, color: 'from-yellow-400 to-green-400' },
  { text: 'Sannu!', lang: 'Hausa', country: 'NG', icon: Globe, color: 'from-green-400 to-yellow-400' },
  { text: 'Mingalaba!', lang: 'Burmese', country: 'MM', icon: Globe, color: 'from-yellow-400 to-orange-400' },
  { text: 'Salam!', lang: 'Uzbek', country: 'UZ', icon: Globe, color: 'from-blue-400 to-green-400' },
  { text: 'Salam!', lang: 'Kazakh', country: 'KZ', icon: Globe, color: 'from-green-400 to-blue-400' },
  { text: 'Sawasdee!', lang: 'Thai', country: 'TH', icon: Globe, color: 'from-pink-400 to-yellow-400' },
  { text: 'Sain baina uu!', lang: 'Mongolian', country: 'MN', icon: Globe, color: 'from-blue-400 to-yellow-400' },
  { text: 'Salam!', lang: 'Kyrgyz', country: 'KG', icon: Globe, color: 'from-green-400 to-blue-400' },
  { text: 'Salam!', lang: 'Turkmen', country: 'TM', icon: Globe, color: 'from-blue-400 to-green-400' },
  { text: 'Salam!', lang: 'Tajik', country: 'TJ', icon: Globe, color: 'from-green-400 to-blue-400' },
]

export default function App() {
  const [current, setCurrent] = useState(0)

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % greetings.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cultural Background Layer */}
      <CulturalBackground 
        language={greetings[current].lang} 
        country={greetings[current].country}
      />
      
      {/* Original Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="1" fill="#f1f5f9" fillOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
        <HelloCard greeting={greetings[current]} index={current} />
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg"
        >
          Show Next Language
        </motion.button>
      </div>
    </div>
  )
}