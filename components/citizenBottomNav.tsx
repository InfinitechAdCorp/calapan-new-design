"use client"

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Grid3x3, 
  Newspaper, 
  AlertTriangle, 
  User
} from 'lucide-react';

export default function CitizenBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/dashboard/citizen' },
    { icon: Grid3x3, label: 'Services', path: '/dashboard/citizen/services' },
    { icon: Newspaper, label: 'News', path: '/dashboard/citizen/news' },
    { icon: AlertTriangle, label: 'Emergency', path: '/dashboard/citizen/emergency' },
    { icon: User, label: 'Account', path: '/dashboard/citizen/account' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex items-center justify-around">
        {navigationItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors flex-1 ${
                active ? 'text-orange-600' : 'text-gray-600'
              }`}
            >
              <item.icon 
                size={22} 
                className={active ? 'text-orange-600' : 'text-gray-600'} 
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={`text-xs font-medium ${active ? 'text-orange-600 font-semibold' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}