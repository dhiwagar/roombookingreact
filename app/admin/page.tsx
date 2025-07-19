'use client';

import { AdminDashboard } from '@/components/admin-dashboard';

export default function AdminPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage bookings and contact submissions
          </p>
        </div>

        <AdminDashboard />
      </div>
    </div>
  );
} 