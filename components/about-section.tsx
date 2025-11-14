"use client"

import { motion } from "framer-motion"
import { Target, Lightbulb, Users } from "lucide-react"

export default function AboutSection() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Deliver efficient and transparent government services to every citizen of Calapan City.",
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description: "A smart city where technology and community values work together for progress.",
    },
    {
      icon: Users,
      title: "Our Values",
      description: "Integrity, transparency, and citizen-centric service delivery in everything we do.",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">About Calapan City</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Calapan City Government is committed to providing world-class services with integrity and transparency,
            fostering community development through innovation and citizen engagement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-white border border-gray-100 text-center hover:border-emerald-200 transition-all shadow-sm"
              >
                <motion.div
                  className="inline-flex p-4 rounded-full bg-gradient-to-br from-emerald-100 to-orange-100 mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-6 h-6 text-emerald-600" />
                </motion.div>
                <h3 className="text-2xl font-bold gradient-text mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
