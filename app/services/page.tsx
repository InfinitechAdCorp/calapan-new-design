"use client"

import PageLayout from "@/components/page-layout"
import ServicesSection from "@/components/services-section"

export default function ServicesPage() {
  return (
    <PageLayout
      title="City Services"
      subtitle="Explore all the services we offer to our citizens"
      image="/government-services-city-utilities.jpg"
    >
      <ServicesSection />
    </PageLayout>
  )
}
