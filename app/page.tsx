"use client"

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"
import Link from "next/link"
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Zap, Users, TrendingUp, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Animated Counter Component
function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Extract number from value (e.g., "45K+" -> 45)
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0
  const suffix = value.replace(/[0-9]/g, "")
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const displayValue = useTransform(springValue, (latest) => Math.round(latest))
  
  const [displayText, setDisplayText] = useState("0")
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue)
    }
  }, [isInView, motionValue, numericValue])
  
  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      setDisplayText(latest + suffix)
    })
    return unsubscribe
  }, [displayValue, suffix])
  
  return (
    <div ref={ref} className="text-4xl font-bold mb-1">
      {displayText}
    </div>
  )
}

export default function Home() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Fix hydration: Only render random particles after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Generate consistent particle positions (same on server and client)
  const particlePositions = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 23) % 100, // Deterministic x position
    y: (i * 37) % 100, // Deterministic y position
    duration: 2 + (i % 3), // Deterministic duration
    delay: (i % 5) * 0.4, // Deterministic delay
  }))

  const featuredAnnouncements = [
    {
      id: 1,
      title: "New City Hall Hours",
      description: "City Hall will now open on weekends starting next month.",
      date: "Nov 13, 2024",
      badge: "Important",
    },
    {
      id: 2,
      title: "Infrastructure Update",
      description: "Road maintenance on Main Street scheduled for next week.",
      date: "Nov 12, 2024",
      badge: "Notice",
    },
    {
      id: 3,
      title: "Community Event",
      description: "Join us for the Annual Calapan City Festival this weekend!",
      date: "Nov 11, 2024",
      badge: "Event",
    },
  ]

  const featuredServices = [
  { icon: "💼", name: "Business Permit", description: "Apply for business permits" },
  { icon: "🏗️", name: "Building Permit", description: "Construction permits" },
  { icon: "📄", name: "Cedula", description: "Community tax certificate" },
  { icon: "💍", name: "Marriage License", description: "Apply for marriage license" },
  { icon: "🏥", name: "Health Certificate", description: "Medical clearance" },
  { icon: "💉", name: "Vaccination Records", description: "View vaccination history" },
  { icon: "⚕️", name: "Medical Assistance", description: "Request medical aid" },
  { icon: "👮", name: "Police Clearance", description: "Request police clearance" },
  { icon: "🚒", name: "Fire Safety Inspection", description: "Schedule inspection" },
  { icon: "📝", name: "Barangay Clearance", description: "Get barangay clearance" },
]


  const stats = [
    { label: "Active Citizens", value: "200000K+", icon: Users },
    { label: "Services", value: "50+", icon: Zap },
    { label: "Requests Processed", value: "12K+", icon: TrendingUp },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Premium stats section with animated counters */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 via-orange-500 to-emerald-600 relative overflow-hidden shadow-xl">
        {/* Animated background particles - Only render after mount to avoid hydration issues */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particlePositions.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white/30 rounded-full"
                initial={{
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                }}
                animate={{
                  y: `${particle.y - 50}%`,
                  opacity: [0.3, 0.6, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                  className="text-center text-white"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                  </motion.div>
                  <AnimatedCounter value={stat.value} duration={2} />
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Redesigned Featured Announcements with premium styling */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-1 h-8 bg-gradient-to-b from-orange-600 to-emerald-500 rounded-full"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="text-display gradient-text">Latest Announcements</h2>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-orange-500" />
              </motion.div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Stay informed with the most recent updates from Calapan City Government
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {featuredAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="card-premium p-8 group cursor-pointer relative overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-50 to-emerald-50 opacity-0"
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <motion.span 
                      className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider"
                      whileHover={{ scale: 1.1 }}
                    >
                      {announcement.badge}
                    </motion.span>
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-orange-500"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </div>
                  <div className="text-sm text-orange-600 font-semibold mb-3">{announcement.date}</div>
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors"
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 5 }
                    }}
                  >
                    {announcement.title}
                  </motion.h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{announcement.description}</p>
                  <motion.div 
                    className="flex items-center text-orange-600 font-semibold text-sm"
                    variants={{
                      rest: { opacity: 0, x: -10 },
                      hover: { opacity: 1, x: 0 }
                    }}
                  >
                    Read More 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/announcements">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold hover:shadow-xl transition-all inline-flex items-center gap-2">
                View All Announcements
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Redesigned Featured Services with 3D icon pop-out effect */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-orange-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-orange-500 rounded-full"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <h2 className="text-display gradient-text">Popular Services</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">Quick access to the services that matter most to you</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            style={{ perspective: "1000px" }}
          >
            {featuredServices.map((service, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                animate="rest"
                onHoverStart={() => setHoveredService(i)}
                onHoverEnd={() => setHoveredService(null)}
                className="card-premium p-8 cursor-pointer relative overflow-visible"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 3D Platform shadow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/5 to-gray-900/20 rounded-2xl"
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                />
                {/* Ripple effect on hover */}
                <AnimatePresence>
                  {hoveredService === i && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-emerald-100/50"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10">
                  {/* 3D Popping Icon */}
                  <motion.div 
                    className="text-6xl mb-4 flex justify-center items-center absolute left-1/2 top-4 -translate-x-1/2"
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: 50,
                    }}
                    variants={{
                      rest: { 
                        scale: 1, 
                        rotateY: 0,
                        rotateX: 0,
                        z: 0,
                        y: 0,
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }
                      },
                      hover: { 
                        scale: 2.5, 
                        rotateY: 25,
                        rotateX: -20,
                        z: 150,
                        y: -80,
                        filter: "drop-shadow(0 50px 80px rgba(0,0,0,0.5))",
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 15
                        }
                      }
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  </div>
                  {/* Content pushed down to make space */}
                  <div className="mt-24">
                  {/* Content pushed down to make space */}
                  <div className="mt-20">
                    <motion.h3 
                      className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors"
                      variants={{
                        rest: { x: 0 },
                        hover: { x: 5 }
                      }}
                    >
                      {service.name}
                    </motion.h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>

                {/* Decorative corner animation */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200/30 to-transparent rounded-bl-full"
                  variants={{
                    rest: { scale: 0, opacity: 0 },
                    hover: { scale: 1, opacity: 1 }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/services">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold hover:shadow-xl transition-all inline-flex items-center gap-2">
                Explore All Services
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call-to-action section with pulse animation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage: "linear-gradient(90deg, #1f2937, #ea580c, #059669, #1f2937)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ready to Get Involved?
            </motion.h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of citizens using the Calapan City System to access services, report issues, and stay
              connected with our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(234, 88, 12, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%", opacity: 0.3 }}
                  whileHover={{ x: "100%", opacity: 0.3 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Sign Up Today</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(254, 243, 199, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full border-2 border-orange-600 text-orange-600 font-bold transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}