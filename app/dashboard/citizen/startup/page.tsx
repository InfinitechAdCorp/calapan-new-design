"use client"

import { useState } from "react"
import { ArrowLeft, Home, Grid3x3, Newspaper, AlertTriangle, User } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CitizenLayout from "@/components/citizenLayout"

export default function StartupPage() {
  const [activeTab, setActiveTab] = useState("services")

  const startupServices = [
    {
      category: "Business Registration",
      items: [
        { name: "Startup Registration", description: "Register your startup business", icon: "🚀" },
        { name: "Business Name Search", description: "Check business name availability", icon: "🔍" },
        { name: "DTI Registration", description: "Department of Trade registration", icon: "📋" },
      ],
    },
    {
      category: "Support Programs",
      items: [
        { name: "Startup Grants", description: "Apply for startup funding", icon: "💰" },
        { name: "Mentorship Program", description: "Connect with business mentors", icon: "👥" },
        { name: "Co-working Spaces", description: "Access shared workspaces", icon: "🏢" },
      ],
    },
    {
      category: "Resources",
      items: [
        { name: "Business Training", description: "Free entrepreneurship training", icon: "📚" },
        { name: "Market Research", description: "Access market data and insights", icon: "📊" },
        { name: "Networking Events", description: "Connect with other entrepreneurs", icon: "🤝" },
      ],
    },
  ]

  return (
    <CitizenLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/citizen">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Startup Hub</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 pb-24 overflow-y-auto">
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-900 mb-2">Launch Your Startup in Calapan</h2>
              <p className="text-sm text-gray-700">
                Access resources, funding, and support to turn your business idea into reality.
              </p>
            </CardContent>
          </Card>

          {startupServices.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">{section.category}</h2>
              <div className="grid grid-cols-3 gap-2">
                {section.items.map((item, itemIdx) => (
                  <Card key={itemIdx} className="border-gray-200 opacity-75">
                    <CardContent className="p-3">
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{item.name}</h3>
                          <p className="text-xs text-gray-600 leading-tight mb-2">{item.description}</p>
                          <span className="inline-block px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </CitizenLayout>
  )
}