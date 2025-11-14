"use client"

import type React from "react"

import Header from "@/components/header"
import PageHeroBanner from "@/components/page-hero-banner"
import Footer from "@/components/footer"

interface PageLayoutProps {
  title: string
  subtitle?: string
  image: string
  children: React.ReactNode
}

export default function PageLayout({ title, subtitle, image, children }: PageLayoutProps) {
  return (
    <main className="min-h-screen">
      <Header />
      <PageHeroBanner title={title} subtitle={subtitle} image={image} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">{children}</div>
      <Footer />
    </main>
  )
}
