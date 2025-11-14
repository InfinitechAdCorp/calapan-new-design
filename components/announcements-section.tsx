"use client"

import { motion } from "framer-motion"
import { Bell, Calendar, ArrowRight } from "lucide-react"

const announcements = [
  {
    id: 1,
    title: "New Digital Services Platform Launched",
    date: "Nov 10, 2024",
    category: "Update",
    description: "Access all city services in one place with our brand new digital platform.",
  },
  {
    id: 2,
    title: "Community Cleanup Drive This Weekend",
    date: "Nov 12, 2024",
    category: "Event",
    description: "Join us for a city-wide cleanup initiative. Meet at Central Park at 8 AM.",
  },
  {
    id: 3,
    title: "Emergency Services Hotline Update",
    date: "Nov 8, 2024",
    category: "Alert",
    description: "New enhanced 911 response system now available 24/7.",
  },
]

export default function AnnouncementsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <Bell className="w-8 h-8 text-orange-600" />
          </motion.div>
          <h2 className="text-display gradient-text">Latest Announcements</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          Stay informed with the most recent updates and important notices from Calapan City Government. We keep you
          connected to what matters.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-6"
      >
        {announcements.map((announcement) => (
      <motion.div
  key={announcement.id}
  variants={itemVariants}
  whileHover={{
    y: -12,
    boxShadow: "0 20px 60px rgba(234, 88, 12, 0.15)",
  }}
  className="card-premium p-8 group hover:border-orange-300"
>

            <div className="flex items-start justify-between mb-6">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  announcement.category === "Alert"
                    ? "bg-red-100/80 text-red-700"
                    : announcement.category === "Event"
                      ? "bg-orange-100/80 text-orange-700"
                      : "bg-emerald-100/80 text-emerald-700"
                }`}
              >
                {announcement.category}
              </motion.span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 rounded-full bg-orange-500"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
              {announcement.title}
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-2">{announcement.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {announcement.date}
              </p>
              <motion.div
                whileHover={{ x: 2 }}
                className="text-orange-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
