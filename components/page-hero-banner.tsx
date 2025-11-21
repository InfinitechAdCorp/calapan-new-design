"use client"

interface PageHeroBannerProps {
  title: string
  subtitle: string
  image: string
}

export default function PageHeroBanner({ title, subtitle, image }: PageHeroBannerProps) {
  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-accent-600/80" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-balance">{title}</h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl text-balance">{subtitle}</p>
      </div>
    </div>
  )
}
