"use client"

import { motion } from "framer-motion"
import { Newspaper, ArrowRight } from "lucide-react"

const news = [
  {
    id: 1,
    title: "City Infrastructure Expansion Project Approved",
    excerpt: "The municipal council has approved a major infrastructure development initiative...",
    category: "Development",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Local Businesses Thrive with New Support Program",
    excerpt: "A comprehensive program designed to support and grow local businesses in our community...",
    category: "Business",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Community Health Initiative Reaches Milestone",
    excerpt: "The health department celebrates reaching 50,000 citizens vaccinated this quarter...",
    category: "Health",
    readTime: "6 min read",
  },
]

export default function NewsSection() {
  return (
    <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-6 h-6 text-emerald-500" />
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">Latest News</h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">Read the latest stories from Calapan City</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02 }}
              className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 cursor-pointer transition-all shadow-sm hover:shadow-md"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-orange-100 text-gray-700">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:gradient-text transition-all">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{item.readTime}</span>
                <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
