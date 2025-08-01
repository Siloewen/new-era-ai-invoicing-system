'use client';

import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { UserGroupIcon, DocumentTextIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const statsData = [
  {
    name: 'Total Clients',
    value: '12',
    icon: UserGroupIcon,
    change: '+2 this month',
    changeType: 'positive',
  },
  {
    name: 'Active Contracts',
    value: '8',
    icon: DocumentTextIcon,
    change: '+1 this month',
    changeType: 'positive',
  },
  {
    name: 'Monthly Revenue',
    value: '$12,450',
    icon: CurrencyDollarIcon,
    change: '+15% from last month',
    changeType: 'positive',
  },
  {
    name: 'Pending Invoices',
    value: '3',
    icon: ChartBarIcon,
    change: '-2 from last week',
    changeType: 'negative',
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your invoicing system overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Acme Corporation</p>
                    <p className="text-sm text-gray-500">Added 2 days ago</p>
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">TechStart Inc</p>
                    <p className="text-sm text-gray-500">Added 5 days ago</p>
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Global Solutions</p>
                    <p className="text-sm text-gray-500">Added 1 week ago</p>
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">INV-2024-001</p>
                    <p className="text-sm text-gray-500">Acme Corporation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$2,500</p>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">INV-2024-002</p>
                    <p className="text-sm text-gray-500">TechStart Inc</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$1,200</p>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">INV-2024-003</p>
                    <p className="text-sm text-gray-500">Global Solutions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$3,750</p>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Sent
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}