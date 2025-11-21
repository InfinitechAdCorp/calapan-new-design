"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface NewsArticle {
  id: number
  title: string
  content: string
  category: string
  image?: string
  status: string
  published_at?: string
  created_at: string
  author?: {
    id: number
    name: string
    email: string
  }
}

export default function NewsSection() {
  const [news, setNews] = React.useState<NewsArticle[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = React.useState<NewsArticle | null>(null)

  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/news/published?per_page=3')
        
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        
        const result = await response.json()
        
        if (result.success && result.data) {
          const newsData = result.data.data || result.data
          setNews(newsData)
        }
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Close modal when pressing Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedArticle])

  return (
    <>
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-3">Latest News</h2>
          <p className="text-slate-700">Read the latest stories and updates from our city</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-slate-600">Loading news...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Failed to load news: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-primary-600 font-semibold hover:text-accent-600"
            >
              Try Again
            </button>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">No news available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={article.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${article.image}` : "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-500 mb-2">
                    {new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-slate-700 line-clamp-3">
                    {article.content.substring(0, 150)}...
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header with Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                {selectedArticle.image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${selectedArticle.image}`}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-green-500 via-yellow-500 to-amber-500"></div>
                )}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-slate-700" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                {/* Category Badge */}
                <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {selectedArticle.category}
                </span>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {selectedArticle.title}
                </h2>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-slate-600 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {new Date(selectedArticle.published_at || selectedArticle.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {selectedArticle.author && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>By {selectedArticle.author.name}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
                    {selectedArticle.content}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-6 md:px-8 py-4 border-t border-slate-200">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full md:w-auto px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}