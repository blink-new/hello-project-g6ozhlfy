import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface HelloCardProps {
  greeting: {
    text: string
    icon: LucideIcon
    color: string
    lang?: string
    country?: string
  }
  index: number
}

export default function HelloCard({ greeting, index }: HelloCardProps) {
  const Icon = greeting.icon

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.6
      }}
      className="relative"
    >
      {/* Animated background glow */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${greeting.color} rounded-3xl blur-xl opacity-20`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Main card */}
      <motion.div
        className="relative bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-12 shadow-2xl"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Icon with animated background */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${greeting.color}`}>
            <Icon className="w-8 h-8 text-white" />
            {/* Floating sparkles around icon */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
            />
          </div>
        </motion.div>
        {/* Main greeting text */}
        <motion.h1
          className={`text-6xl font-bold font-serif bg-gradient-to-r ${greeting.color} bg-clip-text text-transparent text-center mb-3`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {greeting.text}
        </motion.h1>
        
        {/* Language name prominently displayed */}
        {greeting.lang && (
          <motion.p
            className="text-slate-500 text-center text-xl font-medium mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            ({greeting.lang})
          </motion.p>
        )}

        {/* "Hello From Around The World" bubble moved above underline with spacing and softened style */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        >
          <span className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-md text-base font-semibold text-slate-700 border border-slate-200 select-none" style={{letterSpacing: '0.04em'}}>
            Hello From Around The World
          </span>
        </motion.div>

        {/* Styled underline moved below bubble with more spacing and thicker with shadow */}
        <motion.div
          className={`relative w-full flex justify-center`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        >
          <div className={`h-2 w-64 bg-gradient-to-r ${greeting.color} rounded-full shadow-md`} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}