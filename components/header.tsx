"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, Check } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/announcements", label: "Announcements" },
  { href: "/news", label: "News" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
]

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Extend Navigator interface for iOS standalone detection
declare global {
  interface Navigator {
    standalone?: boolean
  }
}

// Store the prompt globally to catch it before component mounts
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null

// Set up the listener immediately
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    globalDeferredPrompt = e as BeforeInstallPromptEvent
  })
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
        setShowInstallButton(false)
        return true
      }
      
      // Check if running as PWA
      if (window.navigator.standalone === true) {
        setIsInstalled(true)
        setShowInstallButton(false)
        return true
      }
      
      return false
    }

    // If already installed, don't show button
    if (checkInstalled()) {
      return
    }

    // Check if we already have the prompt from global listener
    if (globalDeferredPrompt) {
      setDeferredPrompt(globalDeferredPrompt)
      setShowInstallButton(true)
    }

    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault()
      const promptEvent = e as BeforeInstallPromptEvent
      globalDeferredPrompt = promptEvent
      setDeferredPrompt(promptEvent)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Listen for app installed event
    const installedHandler = () => {
      setIsInstalled(true)
      setShowInstallButton(false)
      setDeferredPrompt(null)
      globalDeferredPrompt = null
    }

    window.addEventListener('appinstalled', installedHandler)

    // Check localStorage for manual hiding
    const isManuallyHidden = localStorage.getItem('pwa-install-hidden')
    if (isManuallyHidden === 'true') {
      setShowInstallButton(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      // Show the install prompt
      await deferredPrompt.prompt()

      // Wait for the user's response
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
        setShowInstallButton(false)
      } else {
        // User dismissed, hide for this session
        localStorage.setItem('pwa-install-hidden', 'true')
        setShowInstallButton(false)
      }

      // Clear the deferred prompt
      setDeferredPrompt(null)
      globalDeferredPrompt = null
    } catch (error) {
      console.error('Install prompt error:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 via-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold gradient-text">Calapan</span>
            <span className="text-xs text-orange-600 font-semibold">City System</span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={link.href}
                className={`text-sm font-semibold transition-all relative group ${
                  pathname === link.href ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-emerald-500 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="hidden md:flex items-center gap-3"
        >
          {/* PWA Install Button */}
          {showInstallButton && !isInstalled && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={handleInstallClick}
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Download size={18} />
              <span>Install App</span>
            </motion.button>
          )}

          {/* Already Installed Badge */}
          {isInstalled && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-4 py-2.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-2 border border-emerald-200"
            >
              <Check size={18} />
              <span>App Installed</span>
            </motion.div>
          )}

          {/* Login Button */}
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Login
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-orange-100 px-4 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium py-2 transition-colors ${
                  pathname === link.href 
                    ? "text-orange-600 font-semibold" 
                    : "text-gray-700 hover:text-orange-600"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile PWA Install Button */}
            {showInstallButton && !isInstalled && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => {
                  handleInstallClick()
                  setIsOpen(false)
                }}
                className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium text-center mt-2 flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
              >
                <Download size={18} />
                <span>Install App</span>
              </motion.button>
            )}

            {/* Mobile Already Installed Badge */}
            {isInstalled && (
              <div className="block w-full px-4 py-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium text-center mt-2 flex items-center justify-center gap-2 border border-emerald-200">
                <Check size={18} />
                <span>App Installed</span>
              </div>
            )}

            {/* Mobile Login Button */}
            <Link
              href="/login"
              className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium text-center mt-2 hover:shadow-lg transition-all active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}