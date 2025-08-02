'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon, 
  DocumentDuplicateIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Clients', href: '/clients', icon: UserGroupIcon },
  { name: 'Contracts', href: '/contracts', icon: DocumentTextIcon },
  { name: 'Invoices', href: '/invoices', icon: CurrencyDollarIcon },
  { name: 'Templates', href: '/templates', icon: DocumentDuplicateIcon },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed left-0 top-0 h-full border-r"
      style={{ 
        width: '288px', 
        maxWidth: '288px', 
        minWidth: '288px',
        background: 'linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(239,246,255,0.9), rgba(238,242,255,0.95))',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 20px 40px -12px rgba(0,0,0,0.25), 0 10px 20px -5px rgba(0,0,0,0.1)'
      }}
    >
      <div className="flex flex-col h-full relative">
        {/* Decorative Background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom right, rgba(59,130,246,0.05), rgba(147,51,234,0.05), rgba(99,102,241,0.05))'
          }}
        ></div>
        
        {/* Header */}
        <div 
          className="relative p-6 border-b"
          style={{ 
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(to bottom right, #2563eb, #4f46e5, #9333ea)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              <span 
                className="text-white font-bold text-lg"
                style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}
              >
                N
              </span>
            </div>
            <div>
              <span 
                className="text-xl font-bold block"
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #2563eb, #9333ea, #4f46e5)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}
              >
                New Era AI
              </span>
              <span 
                className="text-xs block"
                style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}
              >
                Invoicing System
              </span>
            </div>
          </Link>
        </div>
        
        {/* Navigation Links */}
        <div className="relative flex-1" style={{ padding: '1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li 
                  key={item.name} 
                  style={{ 
                    marginBottom: '12px',
                    animationDelay: `${index * 50}ms` 
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      background: isActive 
                        ? 'linear-gradient(to right, #3b82f6, #4f46e5)' 
                        : 'transparent',
                      color: isActive ? 'white' : '#4b5563',
                      boxShadow: isActive 
                        ? '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' 
                        : 'none',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    <div 
                      className="p-2 rounded-xl transition-all duration-300"
                      style={{
                        padding: '8px',
                        borderRadius: '12px',
                        background: isActive 
                          ? 'rgba(255,255,255,0.2)' 
                          : 'transparent',
                        boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      <item.icon 
                        className="h-5 w-5 transition-all duration-300"
                        style={{
                          width: '20px',
                          height: '20px',
                          color: isActive ? 'white' : '#6b7280'
                        }}
                      />
                    </div>
                    <span style={{ fontWeight: '500' }}>{item.name}</span>
                    {isActive && (
                      <div 
                        className="ml-auto w-2 h-2 bg-white rounded-full shadow-sm animate-pulse"
                        style={{
                          marginLeft: 'auto',
                          width: '8px',
                          height: '8px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                      ></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Actions */}
        <div 
          className="relative border-t"
          style={{ 
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <div 
            className="rounded-xl p-4 border"
            style={{
              background: 'linear-gradient(to right, rgba(59,130,246,0.1), rgba(99,102,241,0.1))',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <div className="text-center">
              <div 
                className="w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center"
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(to bottom right, #10b981, #14b8a6)',
                  borderRadius: '12px',
                  margin: '0 auto 8px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span 
                  className="text-white text-xs font-bold"
                  style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                >
                  +
                </span>
              </div>
              <p 
                className="text-xs font-medium mb-2"
                style={{ fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}
              >
                Quick Actions
              </p>
              <div className="flex space-x-2" style={{ display: 'flex', gap: '8px' }}>
                <Link 
                  href="/clients" 
                  className="text-xs py-1 px-2"
                  style={{
                    fontSize: '12px',
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Client
                </Link>
                <Link 
                  href="/invoices" 
                  className="text-xs py-1 px-2"
                  style={{
                    fontSize: '12px',
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Invoice
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="relative border-t"
          style={{ 
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <div className="text-center">
            <div 
              className="text-xs"
              style={{ fontSize: '12px', color: '#6b7280' }}
            >
              Invoicing System v1.0
            </div>
            <div 
              className="text-xs mt-1"
              style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}
            >
              Powered by New Era AI
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}