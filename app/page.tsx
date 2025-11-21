"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, Zap, Clock } from "lucide-react"

export default function Home() {
  const stats = [
    { label: "Active Citizens", value: "200K+", icon: Users },
    { label: "Services Available", value: "50+", icon: Zap },
    { label: "Requests Processed", value: "12K+", icon: Clock },
  ]

  const services = [
    { name: "Business Permit", description: "Apply for business permits", icon: "📋" },
    { name: "Building Permit", description: "Construction permits", icon: "🏗️" },
    { name: "Cedula", description: "Community tax certificate", icon: "📄" },
    { name: "Marriage License", description: "Apply for marriage license", icon: "💍" },
    { name: "Health Certificate", description: "Medical clearance", icon: "🏥" },
    { name: "Vaccination Records", description: "View vaccination history", icon: "💉" },
  ]

  const announcements = [
    {
      id: 1,
      title: "New Digital Services Platform",
      description: "Access all city services in one place",
      date: "Nov 10, 2024",
      category: "Update",
    },
    {
      id: 2,
      title: "Community Cleanup Drive",
      description: "Join us for a city-wide cleanup initiative",
      date: "Nov 12, 2024",
      category: "Event",
    },
    {
      id: 3,
      title: "Emergency Services Update",
      description: "New enhanced 911 response system available",
      date: "Nov 8, 2024",
      category: "Alert",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-20 pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/calapancity.hall.jpg')",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-600/80 via-accent-500/80 to-primary-500/80"
          animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
              Welcome to Calapan City Government
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto text-balance">
              Access government services, stay informed, and connect with your community all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 text-center hover:shadow-lg transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground/70 font-semibold">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-50 via-primary-100 to-accent-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
              Our Services
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Quick access to essential government services and documentation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="p-6 rounded-2xl bg-white border border-primary-100 hover:border-primary-300 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-foreground/60 text-sm mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Apply <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                View All Services <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
              Latest Updates
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Stay informed with recent announcements from your local government
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {announcements.map((announcement, i) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20">{announcement.category}</span>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">{announcement.title}</h3>
                <p className="text-white/90 text-sm mb-4">{announcement.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{announcement.date}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <Link href="/announcements">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                View All Updates <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500">
  <div className="max-w-3xl mx-auto text-center text-white">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold leading-tight">Ready to Get Started?</h2>
      <p className="text-lg text-white/90 max-w-2xl mx-auto">
        Join thousands of citizens using our platform to access services and stay connected
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/register">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-white text-primary-600 font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Sign Up Today
          </motion.button>
        </Link>
      </div>
    </motion.div>
  </div>
</section>
      <Footer />
    </main>
  )
}
