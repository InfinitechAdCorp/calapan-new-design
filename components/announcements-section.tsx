"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, ArrowRight, Calendar, Loader2, X, Tag } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Announcement {
  id: number
  title: string
  date: string
  category: "Update" | "Event" | "Alert" | "Development" | "Health" | "Notice"
  description: string
  content: string
  is_active: boolean
  priority: number
  created_at: string
  updated_at: string
}

export default function AnnouncementsSection() {
  const { toast } = useToast()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements?per_page=6`)
      const data = await response.json()

      if (data.success && data.data) {
        setAnnouncements(data.data.data || [])
      } else {
        setError("Failed to load announcements")
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load announcements.",
        })
      }
    } catch (err) {
      console.error("Error fetching announcements:", err)
      setError("Failed to load announcements")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load announcements. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      })
      return
    }
    
    setSubscribing(true)

    try {
      // Step 1: Subscribe via Laravel API
      const subscribeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribers/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const subscribeData = await subscribeResponse.json()

      if (!subscribeData.success) {
        toast({
          variant: "destructive",
          title: "Subscription Failed",
          description: subscribeData.message || 'Failed to subscribe. Please try again.',
        })
        setSubscribing(false)
        return
      }

      // Step 2: Send verification email via Next.js API
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          type: 'verification',
          data: {
            email: email,
            verifyUrl: `${window.location.origin}/verify-subscription?token=${subscribeData.data.token}`,
          },
        }),
      })

      const emailData = await emailResponse.json()

      if (emailData.success) {
        setEmail("")
        toast({
          title: "Successfully Subscribed!",
          description: "Please check your email to verify your subscription.",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Email Verification Issue",
          description: "Subscribed, but failed to send verification email. Please contact support.",
        })
      }

    } catch (error) {
      console.error('Subscription error:', error)
      toast({
        variant: "destructive",
        title: "Subscription Error",
        description: "Failed to subscribe. Please try again later.",
      })
    } finally {
      setSubscribing(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Alert: "bg-red-100 text-red-700",
      Event: "bg-purple-100 text-purple-700",
      Update: "bg-blue-100 text-blue-700",
      Development: "bg-indigo-100 text-indigo-700",
      Health: "bg-green-100 text-green-700",
      Notice: "bg-yellow-100 text-yellow-700",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Bell className="w-10 h-10 text-emerald-600" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Latest Announcements
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed with the most recent updates and important notices from your local government
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-3" />
              <p className="text-gray-600">Loading announcements...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchAnnouncements}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Announcements Grid */}
        {!loading && !error && announcements.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {announcements.map((announcement, i) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedAnnouncement(announcement)}
                  className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${getCategoryColor(announcement.category)}`}
                    >
                      <Tag className="w-3 h-3" />
                      {announcement.category}
                    </motion.span>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-orange-500"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{announcement.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(announcement.date)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-gradient-to-r from-emerald-600 to-orange-500 p-8 md:p-12 text-center text-white shadow-xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Updates</h2>
              <p className="text-white mb-6 max-w-2xl mx-auto text-lg">
                Get the latest announcements delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                />
                <motion.button
                  onClick={handleSubscribe}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={subscribing}
                  className="px-6 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg"
                >
                  {subscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && announcements.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Announcements Yet</h3>
            <p className="text-gray-500">Check back later for updates and news.</p>
          </div>
        )}
      </div>

      {/* Announcement Modal */}
      <AnimatePresence>
        {selectedAnnouncement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAnnouncement(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-orange-500 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Bell className="w-6 h-6 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold truncate">Announcement Details</h2>
                    <p className="text-sm text-white/90">ID #{selectedAnnouncement.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Category and Date */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${getCategoryColor(selectedAnnouncement.category)}`}>
                      <Tag className="w-3 h-3" />
                      {selectedAnnouncement.category}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedAnnouncement.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedAnnouncement.title}
                    </h3>
                    <p className="text-gray-600 text-base">{selectedAnnouncement.description}</p>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Full Content
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                        {selectedAnnouncement.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-orange-500 text-white rounded-lg hover:from-emerald-700 hover:to-orange-600 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}