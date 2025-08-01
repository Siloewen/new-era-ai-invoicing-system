'use client';

import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export default function TemplatesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Templates</h1>
          <p className="text-gray-600">Manage your invoice templates and branding</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">Templates feature coming soon!</div>
              <p className="text-sm text-gray-400">
                This will include custom invoice templates, branding options, and PDF generation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}