"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-emerald-50 z-0" />

    <div
  className="absolute inset-0 opacity-30 z-0"
  style={{
    backgroundImage: "url('/city-government-building-calapan.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
/>


      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-0 left-10 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-1/4 w-48 h-48 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-orange-300">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-orange-700 font-semibold text-sm">Welcome to Calapan City System</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Your Gateway to Smart City Services</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Experience modern government services with transparency, efficiency, and innovation. Connect with your city,
          access services, and make a difference.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
         
          
        </motion.div>
      </div>
    </section>
  )
}
