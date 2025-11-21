"use client"

import { motion } from "framer-motion"
import { ArrowRight, Search } from "lucide-react"
import { useState } from "react"

const services = [
  { id: 1, icon: "📋", name: "Business Permit", description: "Apply for business permits online" },
  { id: 2, icon: "🏗️", name: "Building Permit", description: "Construction and renovation permits" },
  { id: 3, icon: "📄", name: "Cedula", description: "Community tax certificate" },
  { id: 4, icon: "💍", name: "Marriage License", description: "Marriage certificate application" },
  { id: 5, icon: "🏥", name: "Health Certificate", description: "Medical clearance documents" },
  { id: 6, icon: "💉", name: "Vaccination Records", description: "View your vaccination history" },
  { id: 7, icon: "⚕️", name: "Medical Assistance", description: "Request medical support services" },
  { id: 8, icon: "👮", name: "Police Clearance", description: "Police clearance certificate" },
  { id: 9, icon: "🚒", name: "Fire Safety", description: "Fire safety inspections" },
  { id: 10, icon: "📝", name: "Barangay Clearance", description: "Barangay clearance certificate" },
]

const stats = [
  { label: "Active Services", value: "50+", icon: "✓" },
  { label: "Citizens Served", value: "200K+", icon: "👥" },
  { label: "Requests Processed", value: "12K+", icon: "📊" },
]

export default function ServicesSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">All Government Services</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Access comprehensive government services designed to serve you better
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-20"
          >
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 hover:border-primary-400 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {service.name}
                </h3>
                <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Apply <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-foreground/60">No services found matching your search</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Need Help?</h2>
            <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
              Contact our support team for any questions about our services
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              Get Support <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
