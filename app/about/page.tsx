"use client"

import PageLayout from "@/components/page-layout"
import AboutSection from "@/components/about-section"

export default function AboutPage() {
  return (
    <PageLayout
      title="About Calapan City"
      subtitle="Learn more about our city and our mission"
      image="/calapan-city-landscape-history-culture.jpg"
    >
      <AboutSection />
    </PageLayout>
  )
}
