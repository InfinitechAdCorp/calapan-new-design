"use client"

import { motion } from "framer-motion"
import { Building2, FileText, Users, Heart, Zap } from "lucide-react"

const services = [
  { icon: Building2, title: "Business Permit", description: "Apply for business permits", color: "from-blue-500 to-cyan-500" },
  { icon: Building2, title: "Building Permit", description: "Construction permits", color: "from-green-500 to-emerald-500" },
  { icon: FileText, title: "Cedula", description: "Community tax certificate", color: "from-emerald-500 to-teal-500" },
  { icon: Users, title: "Marriage License", description: "Apply for marriage license", color: "from-purple-500 to-pink-500" },
  { icon: Heart, title: "Health Certificate", description: "Medical clearance", color: "from-red-500 to-pink-500" },
  { icon: Heart, title: "Vaccination Records", description: "View vaccination history", color: "from-orange-500 to-red-500" },
  { icon: Heart, title: "Medical Assistance", description: "Request medical aid", color: "from-pink-500 to-red-500" },
  { icon: Zap, title: "Police Clearance", description: "Request police clearance", color: "from-blue-500 to-indigo-500" },
  { icon: Zap, title: "Fire Safety Inspection", description: "Schedule inspection", color: "from-red-500 to-orange-500" },
  { icon: Zap, title: "Barangay Clearance", description: "Get barangay clearance", color: "from-green-400 to-teal-400" },
]

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Our Services</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Access a comprehensive range of municipal services designed for your convenience
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -12, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.2)" }}
              className="group p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-emerald-200 cursor-pointer transition-all"
            >
              <motion.div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform`}
                whileHover={{ rotate: 10 }}
              >
                <span className="text-2xl">{service.title.includes("Permit") || service.title.includes("Certificate") ? "🏗️" : service.title.includes("Health") ? "🏥" : service.title.includes("Police") || service.title.includes("Fire") ? "👮" : "📄"}</span>
                {/* Adjust emojis based on service type */}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:gradient-text transition-all">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{service.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
