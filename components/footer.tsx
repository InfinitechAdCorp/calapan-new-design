"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-900 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 md:mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2">Calapan City</h3>
            <p className="text-white/70 text-sm md:text-base">Delivering quality government services</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-3 text-sm md:text-base">Navigation</h4>
            <ul className="space-y-1 md:space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-xs md:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-3 text-sm md:text-base">Legal</h4>
            <ul className="space-y-1 md:space-y-2">
              {[
                { label: "Terms", href: "/terms" },
                { label: "Privacy", href: "/privacy" },
                { label: "Cookies", href: "/cookies" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-xs md:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-3 text-sm md:text-base">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="text-white/70 text-xs md:text-sm">+63 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="text-white/70 text-xs md:text-sm">info@calapan.gov.ph</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="text-white/70 text-xs md:text-sm">City Hall</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/60 text-xs md:text-sm">&copy; 2025 Calapan City Government. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Twitter, label: "Twitter" },
              { icon: Instagram, label: "Instagram" },
            ].map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
