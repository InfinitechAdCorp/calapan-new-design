import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"

interface AnnouncementCardProps {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  image?: string
  featured?: boolean
}

export function AnnouncementCard({
  id,
  title,
  excerpt,
  category,
  date,
  image,
  featured = false,
}: AnnouncementCardProps) {
  const categoryColors: Record<string, string> = {
    Emergency: "bg-red-500/20 text-red-300 border border-red-500/50",
    Event: "bg-blue-500/20 text-blue-300 border border-blue-500/50",
    Official: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50",
    Notice: "bg-orange-500/20 text-orange-300 border border-orange-500/50",
    "Service Update": "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50",
  }

  const badgeClass = categoryColors[category] || "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"

  return (
    <Link href={`/news/${id}`}>
      <Card
        className={`h-full hover:shadow-2xl hover:shadow-orange-500/20 transition-all cursor-pointer overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/30 border-emerald-900/30 hover:border-orange-500/50 ${
          featured ? "md:col-span-2 md:row-span-2" : ""
        }`}
      >
        {image && (
          <div
            className={`${featured ? "h-64" : "h-48"} bg-gradient-to-br from-orange-500/20 to-emerald-500/20 overflow-hidden relative`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform">
                {category === "Emergency" ? "🚨" : category === "Event" ? "📅" : "📢"}
              </div>
            </div>
          </div>
        )}
        <CardHeader className={featured ? "p-6" : "p-4"}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="secondary" className={`text-xs font-semibold ${badgeClass}`}>
              {category}
            </Badge>
            <span className="text-xs text-emerald-300 flex items-center gap-1">
              <Calendar size={12} />
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
          <h3
            className={`font-bold leading-tight text-balance text-white ${featured ? "text-2xl mb-3" : "text-lg mb-2"}`}
          >
            {title}
          </h3>
          <p className={`${featured ? "text-base" : "text-sm"} text-emerald-200/80 line-clamp-2`}>{excerpt}</p>
        </CardHeader>
        <CardContent className={featured ? "px-6 pb-6" : "px-4 pb-4"}>
          <div className="flex items-center gap-2 text-orange-400 text-sm font-medium hover:gap-3 transition-all">
            Read More <ArrowRight size={16} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
