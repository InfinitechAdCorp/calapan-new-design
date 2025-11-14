// <NEW> Reusable hero banner for all pages with background image support
"use client"

import { motion } from "framer-motion"

interface PageHeroBannerProps {
  title: string
  subtitle?: string
  image: string
}

export default function PageHeroBanner({ title, subtitle, image }: PageHeroBannerProps) {
  return (
    <div className="relative h-64 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-full flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-white/90 mt-2 drop-shadow-md">{subtitle}</p>}
      </motion.div>
    </div>
  )
}
