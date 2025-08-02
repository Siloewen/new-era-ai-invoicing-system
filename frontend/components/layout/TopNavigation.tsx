'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Clients', href: '/clients', icon: UsersIcon },
  { name: 'Contracts', href: '/contracts', icon: DocumentTextIcon },
  { name: 'Invoices', href: '/invoices', icon: CurrencyDollarIcon },
  { name: 'Templates', href: '/templates', icon: ClipboardDocumentListIcon },
];

export function TopNavigation() {
  const pathname = usePathname();

  return (
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
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
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
            </Link>
          </div>

          {/* Main Navigation */}
          <div 
            className="hidden md:block"
            style={{ display: 'block' }}
          >
            <div 
              className="flex items-baseline space-x-4"
              style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}
            >
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '14px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none',
                      backgroundColor: isActive ? '#dbeafe' : 'transparent',
                      color: isActive ? '#1d4ed8' : '#6b7280'
                    }}
                  >
                    <item.icon 
                      className="h-4 w-4"
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side actions */}
          <div 
            className="flex items-center space-x-4"
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <BellIcon 
                className="h-5 w-5"
                style={{ width: '20px', height: '20px' }}
              />
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <UserCircleIcon 
                className="h-6 w-6"
                style={{ width: '24px', height: '24px' }}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}