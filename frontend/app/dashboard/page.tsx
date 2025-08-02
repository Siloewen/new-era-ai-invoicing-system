'use client';

import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { useStats } from '../../lib/hooks/useStats';
import { useClients } from '../../lib/hooks/useClients';
import { useInvoices } from '../../lib/hooks/useInvoices';
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  SparklesIcon,
  ClockIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  // Mock data for now to avoid API issues
  const stats = {
    totalClients: 3,
    activeClients: 3,
    totalInvoices: 0,
    paidInvoices: 0,
    monthlyRevenue: 0,
    pendingInvoices: 0,
    overdueInvoices: 0
  };

  const clients = [
    {
      id: '1',
      name: 'Test Client',
      contactEmail: 'test@example.com',
      status: 'ACTIVE' as const,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      contactEmail: 'sarah@techsolutions.com',
      status: 'ACTIVE' as const,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Acme Corporation',
      contactEmail: 'john@acme.com',
      status: 'ACTIVE' as const,
      createdAt: new Date().toISOString(),
    }
  ];

  const invoices: any[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-modern rounded-3xl opacity-50"></div>
          <div className="relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-luxury">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gradient mb-2">
                  Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                  Welcome to your invoicing system overview
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="animate-float">
                  <SparklesIcon className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Clients */}
          <div className="stat-card stat-card-blue">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <UserGroupIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1 text-sm font-medium text-emerald-600">
                    <ArrowTrendingUpIcon className="h-4 w-4" />
                    <span>+12%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Total Clients
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalClients}
                  </p>
                  <p className="text-sm text-gray-500">
                    {stats.activeClients} active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Invoices */}
          <div className="stat-card stat-card-emerald">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                    <DocumentTextIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1 text-sm font-medium text-emerald-600">
                    <ArrowTrendingUpIcon className="h-4 w-4" />
                    <span>+8%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Total Invoices
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalInvoices}
                  </p>
                  <p className="text-sm text-gray-500">
                    {stats.paidInvoices} paid
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="stat-card stat-card-purple">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                    <CurrencyDollarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1 text-sm font-medium text-emerald-600">
                    <ArrowTrendingUpIcon className="h-4 w-4" />
                    <span>+24%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Monthly Revenue
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${stats.monthlyRevenue.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    From paid invoices
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Invoices */}
          <div className="stat-card stat-card-orange">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
                    <ChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1 text-sm font-medium text-emerald-600">
                    <SparklesIcon className="h-4 w-4" />
                    <span>Good</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Pending Invoices
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.pendingInvoices}
                  </p>
                  <p className="text-sm text-gray-500">
                    {stats.overdueInvoices} overdue
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-slide-up">
          {/* Recent Clients Card */}
          <div className="card-gradient group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <UserGroupIcon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Clients</h3>
                </div>
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </div>
              
              {clients.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                    <UserGroupIcon className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-gray-500 font-medium">No clients yet</p>
                  <p className="text-sm text-gray-400 mt-1">Start by adding your first client</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {clients.slice(0, 3).map((client, index) => (
                    <div 
                      key={client.id} 
                      className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {client.name}
                          </p>
                          <p className="text-sm text-gray-500">{client.contactEmail || 'No email'}</p>
                        </div>
                      </div>
                      <span className={`status-badge ${
                        client.status === 'ACTIVE' ? 'status-active' :
                        client.status === 'INACTIVE' ? 'status-inactive' :
                        'status-suspended'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          client.status === 'ACTIVE' ? 'bg-emerald-500' : 
                          client.status === 'SUSPENDED' ? 'bg-red-500' : 
                          'bg-gray-400'
                        }`}></div>
                        {client.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Invoices Card */}
          <div className="card-gradient group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                    <DocumentTextIcon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
                </div>
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </div>
              
              {invoices.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-4">
                    <DocumentTextIcon className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-gray-500 font-medium">No invoices yet</p>
                  <p className="text-sm text-gray-400 mt-1">Create your first invoice</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices.slice(0, 3).map((invoice, index) => (
                    <div 
                      key={invoice.id} 
                      className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 hover:shadow-md transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                          #
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                            {invoice.invoiceNumber}
                          </p>
                          <p className="text-sm text-gray-500">{invoice.client?.name || 'Unknown Client'}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-bold text-gray-900">${parseFloat(invoice.total).toFixed(2)}</p>
                        <span className={`status-badge ${
                          invoice.status === 'PAID' ? 'status-paid' :
                          invoice.status === 'SENT' ? 'status-sent' :
                          invoice.status === 'DRAFT' ? 'status-draft' :
                          invoice.status === 'OVERDUE' ? 'status-overdue' :
                          'status-void'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            invoice.status === 'PAID' ? 'bg-emerald-500' : 
                            invoice.status === 'SENT' ? 'bg-blue-500' : 
                            invoice.status === 'OVERDUE' ? 'bg-red-500' : 
                            'bg-gray-400'
                          }`}></div>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}