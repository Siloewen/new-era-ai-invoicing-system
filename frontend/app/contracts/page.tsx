'use client';

import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export default function ContractsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
          <p className="text-gray-600">Manage client contracts and agreements</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">Contracts feature coming soon!</div>
              <p className="text-sm text-gray-400">
                This will include contract management, pricing tiers, and usage tracking.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}