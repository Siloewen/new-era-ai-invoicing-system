import React from 'react';

interface ModernLayoutProps {
  children: React.ReactNode;
}

export function ModernLayout({ children }: ModernLayoutProps) {
  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}
    >
      {/* Top Navigation */}
      <nav 
        className="bg-white border-b border-gray-200 shadow-sm"
        style={{ 
          backgroundColor: '#ffffff', 
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        }}
      >
        <div 
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}
        >
          <div 
            className="flex h-16 justify-between items-center"
            style={{ display: 'flex', height: '4rem', justifyContent: 'space-between', alignItems: 'center' }}
          >
            {/* Logo */}
            <div 
              className="flex items-center"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div 
                className="flex items-center space-x-2"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <div 
                  className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: 'linear-gradient(to bottom right, #2563eb, #1d4ed8)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span 
                    className="text-white font-bold text-sm"
                    style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    N
                  </span>
                </div>
                <span 
                  className="text-xl font-bold text-gray-900"
                  style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}
                >
                  New Era AI
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div 
              className="hidden md:block"
              style={{ display: 'block' }}
            >
              <div 
                className="flex items-baseline space-x-4"
                style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}
              >
                <a 
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700"
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '14px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8'
                  }}
                >
                  Dashboard
                </a>
                <a 
                  href="/clients"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '14px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    color: '#6b7280'
                  }}
                >
                  Clients
                </a>
                <a 
                  href="/invoices"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '14px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    color: '#6b7280'
                  }}
                >
                  Invoices
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main 
        className="py-8"
        style={{ padding: '2rem 0' }}
      >
        <div 
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          style={{ 
            maxWidth: '80rem', 
            margin: '0 auto', 
            padding: '0 1rem' 
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}