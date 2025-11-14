"use client"

import { motion } from "framer-motion"
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-orange-400 flex items-center justify-center">
                  <span className="font-bold text-lg text-slate-900">C</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Calapan City</h3>
                  <p className="text-xs text-gray-400">Government System</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Building a smarter, more connected, and more transparent city for everyone. Your voice matters, and
                together we create positive change.
              </p>
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="p-3 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-orange-600 hover:to-emerald-600 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {[
              {
                title: "Quick Links",
                links: ["Home", "Services", "Announcements", "News"],
              },
              {
                title: "Services",
                links: ["Permits", "Civil Registry", "Health", "Reports"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Accessibility", "Sitemap"],
              },
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold mb-4 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-1 group"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-white/10 origin-left mb-8"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 Calapan City Government. All rights reserved. | Built with excellence for our community.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-4 py-2 rounded-full border border-orange-600/30 hover:border-orange-600 text-orange-400 hover:text-orange-300 text-sm font-medium transition-all"
            >
              Back to Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
