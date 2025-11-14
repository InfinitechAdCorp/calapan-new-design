"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CitizenSidebar from './CitizenSidebar';
import CitizenBottomNav from '@/components/citizenBottomNav';
import CitizenHeader from '@/components/citizenHeader';
import { authClient } from '@/lib/auth';

interface CitizenLayoutProps {
  children: React.ReactNode;
}

export default function CitizenLayout({ children }: CitizenLayoutProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        console.log('CitizenLayout: Checking authentication...');
        
        // Get user from cookie-based auth
        const currentUser = await authClient.getCurrentUser();
        
        console.log('CitizenLayout: User data received:', currentUser);
        
        if (!currentUser) {
          console.log('CitizenLayout: No user found, redirecting to login');
          router.push('/login');
          return;
        }

        // Check if user is a citizen
        if (currentUser.role !== 'citizen') {
          console.log('CitizenLayout: User is not a citizen, role:', currentUser.role);
          router.push('/login');
          return;
        }

        console.log('CitizenLayout: Auth successful, user:', currentUser.name);
        setUser(currentUser);
      } catch (error) {
        console.error('CitizenLayout: Auth check error:', error);
        router.push('/login');
      } finally {
        setIsChecking(false);
      }
    }

    checkAuth();
  }, []); // Run only once on mount

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render content if no user (will redirect anyway)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      {/* Sidebar - Desktop only */}
      <CitizenSidebar />

      {/* Main Content */}
      <div className="lg:ml-64 pb-20 lg:pb-0">
        {/* Header */}
        <CitizenHeader />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Bottom Navigation - Mobile only */}
      <CitizenBottomNav />
    </div>
  );
}