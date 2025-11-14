"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Header } from "@/components/header"
import { Users, FileCheck, Clock, BarChart3 } from "lucide-react"

const recentApplications = [
  { id: 1, name: "John Doe", service: "Business Permit", status: "pending", date: "2024-11-10" },
  { id: 2, name: "Jane Smith", service: "Health Certificate", status: "approved", date: "2024-11-09" },
  { id: 3, name: "Bob Johnson", service: "Cedula", status: "pending", date: "2024-11-08" },
]

export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, user, router])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="animate-pulse text-emerald-400">Loading admin dashboard...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950">
      <Header />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 fade-in-up">
          <h1 className="text-4xl font-bold mb-3 text-white drop-shadow-lg">Admin Dashboard 🔐</h1>
          <p className="text-lg text-emerald-100">Manage applications and system operations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="opacity-0 fade-in-up bg-gradient-to-br from-emerald-900/50 to-slate-900/40 backdrop-blur border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-emerald-200 text-sm font-medium">Total Applications</h3>
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white">127</div>
            <p className="text-xs text-emerald-300 mt-2">This month</p>
          </div>

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="opacity-0 fade-in-up bg-gradient-to-br from-orange-900/50 to-slate-900/40 backdrop-blur border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/40 transition-all delay-100"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-orange-200 text-sm font-medium">Pending</h3>
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-orange-400">23</div>
            <p className="text-xs text-orange-300 mt-2">Awaiting review</p>
          </div>

          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="opacity-0 fade-in-up bg-gradient-to-br from-emerald-900/50 to-slate-900/40 backdrop-blur border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all delay-200"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-emerald-200 text-sm font-medium">Approved</h3>
              <FileCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">89</div>
            <p className="text-xs text-emerald-300 mt-2">Completed</p>
          </div>

          <div
            ref={(el) => (cardsRef.current[3] = el)}
            className="opacity-0 fade-in-up bg-gradient-to-br from-blue-900/50 to-slate-900/40 backdrop-blur border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all delay-300"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-200 text-sm font-medium">Active Users</h3>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400">342</div>
            <p className="text-xs text-blue-300 mt-2">Registered citizens</p>
          </div>
        </div>

        {/* Recent Applications Table */}
        <div
          ref={(el) => (cardsRef.current[4] = el)}
          className="opacity-0 fade-in-up bg-gradient-to-br from-slate-900/60 to-slate-800/30 backdrop-blur border border-emerald-900/30 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-emerald-900/30">
            <h2 className="text-2xl font-bold text-white mb-1">Recent Applications</h2>
            <p className="text-emerald-200 text-sm">Latest submissions from citizens</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-900/20 border-b border-emerald-900/30">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-emerald-200 text-sm">Applicant</th>
                  <th className="text-left py-4 px-6 font-semibold text-emerald-200 text-sm">Service</th>
                  <th className="text-left py-4 px-6 font-semibold text-emerald-200 text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-emerald-200 text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app, i) => (
                  <tr key={app.id} className="border-b border-emerald-900/20 hover:bg-emerald-900/10 transition-colors">
                    <td className="py-4 px-6 text-white">{app.name}</td>
                    <td className="py-4 px-6 text-emerald-100">{app.service}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                            : "bg-orange-500/20 text-orange-300 border border-orange-500/50"
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-emerald-300 text-sm">{app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
