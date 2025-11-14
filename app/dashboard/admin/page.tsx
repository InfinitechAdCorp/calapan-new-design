"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, Plus, Edit, Trash2 } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

type AdminTabType = "announcements" | "news" | "reports" | "services"

interface DataItem {
  id: number
  title: string
  status: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTabType>("announcements")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState<DataItem[]>([
    { id: 1, title: "Sample Item 1", status: "Active" },
    { id: 2, title: "Sample Item 2", status: "Pending" },
  ])

  const tabs: { id: AdminTabType; label: string }[] = [
    { id: "announcements", label: "Announcements" },
    { id: "news", label: "News" },
    { id: "reports", label: "Citizen Reports" },
    { id: "services", label: "Services" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      <Header />

      <div className="flex h-[calc(100vh-80px)]">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-lg"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar Navigation */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="md:static md:w-64 w-64 bg-white border-r border-orange-100 shadow-lg fixed left-0 top-20 h-[calc(100vh-80px)] z-30 md:translate-x-0"
        >
          <nav className="p-6 space-y-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSidebarOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                    : "text-gray-700 hover:bg-orange-50"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto md:ml-0">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold gradient-text capitalize">
                  Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:shadow-lg transition-all"
                >
                  <Plus size={20} />
                  Add New
                </motion.button>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                      <tr>
                        <th className="px-6 py-3 text-left font-bold">ID</th>
                        <th className="px-6 py-3 text-left font-bold">Title</th>
                        <th className="px-6 py-3 text-left font-bold">Status</th>
                        <th className="px-6 py-3 text-left font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100">
                      {data.map((item, i) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="hover:bg-orange-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-900 font-semibold">{item.id}</td>
                          <td className="px-6 py-4 text-gray-700">{item.title}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full font-semibold text-xs ${
                                item.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:shadow-lg transition-all"
                              >
                                <Edit size={18} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg bg-red-100 text-red-600 hover:shadow-lg transition-all"
                              >
                                <Trash2 size={18} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm">
                  Showing 1 to {data.length} of {data.length} entries
                </p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-lg border border-orange-200 hover:bg-orange-50"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-lg bg-orange-500 text-white font-bold"
                  >
                    1
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-lg border border-orange-200 hover:bg-orange-50"
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
