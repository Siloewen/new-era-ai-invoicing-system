'use client';

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { InvoiceList } from '../../components/invoices/InvoiceList';
import { useInvoices, useDeleteInvoice } from '../../lib/hooks/useInvoices';
import { pdfApi } from '../../lib/api';
import { Invoice } from '../../types';

export default function InvoicesPage() {
  // Temporary sample data - replace with API later  
  const invoices: Invoice[] = [
    {
      id: '1',
      clientId: '1',
      contractId: '1',
      invoiceNumber: 'INV-001',
      periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      periodEnd: new Date().toISOString(),
      client: { 
        id: '1', 
        name: 'Acme Corporation',
        status: 'ACTIVE' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      issueDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      subtotal: '1000.00',
      tax: '100.00', 
      total: '1100.00',
      status: 'SENT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      clientId: '2',
      contractId: '2',
      invoiceNumber: 'INV-002',
      periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      periodEnd: new Date().toISOString(),
      client: { 
        id: '2', 
        name: 'Tech Solutions Inc',
        status: 'ACTIVE' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      issueDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      subtotal: '2500.00',
      tax: '250.00',
      total: '2750.00', 
      status: 'PAID',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      clientId: '3',
      contractId: '3',
      invoiceNumber: 'INV-003',
      periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      periodEnd: new Date().toISOString(),
      client: { 
        id: '3', 
        name: 'StartupCo',
        status: 'ACTIVE' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      issueDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      subtotal: '750.00',
      tax: '75.00',
      total: '825.00', 
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];
  const isLoading = false;
  const error = null;
  const deleteInvoiceMutation = useDeleteInvoice();

  const handleView = (invoice: Invoice) => {
    // TODO: Navigate to invoice detail view
    console.log('View invoice:', invoice.id);
  };

  const handleEdit = (invoice: Invoice) => {
    // TODO: Open invoice edit form
    console.log('Edit invoice:', invoice.id);
  };

  const handleDelete = async (invoiceId: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoiceMutation.mutateAsync(invoiceId);
      } catch (error) {
        console.error('Error deleting invoice:', error);
        alert('Failed to delete invoice. Please try again.');
      }
    }
  };

  const handleAdd = () => {
    // TODO: Open invoice creation form
    console.log('Add new invoice');
  };

  const handleGeneratePdf = async (invoiceId: string) => {
    try {
      const result = await pdfApi.generateInvoicePdf(invoiceId);
      
      // Open PDF in new tab
      const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${result.downloadUrl}`;
      window.open(pdfUrl, '_blank');
      
      alert('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-600 mt-2">Manage and track your invoices</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="text-red-800">
              <h3 className="font-semibold text-lg">Error loading invoices</h3>
              <p className="mt-2 text-sm">
                Unable to connect to the server. Please make sure the backend is running.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Enhanced Header with Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2" style={{background: 'linear-gradient(to right, #2563eb, #9333ea, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Invoices
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Manage and track your invoices
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #3b82f6, #4f46e5)'}}>
                      <span className="text-white font-bold text-sm">{invoices?.length || 0}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-semibold">Total Invoices</p>
                      <p className="text-xs text-gray-500">All created</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #10b981, #0d9488)'}}>
                      <span className="text-white font-bold text-sm">{invoices?.filter(i => i.status === 'PAID').length || 0}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-semibold">Paid</p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #f97316, #dc2626)'}}>
                      <span className="text-white font-bold text-sm">{invoices?.filter(i => i.status === 'SENT' || i.status === 'DRAFT').length || 0}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-semibold">Pending</p>
                      <p className="text-xs text-gray-500">Awaiting payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ml-8">
              <button
                onClick={handleAdd}
                className="text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}}
              >
                <span className="mr-2">+</span>
                Create Invoice
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading invoices...</p>
            </div>
          </div>
        ) : (
          <InvoiceList
            invoices={invoices}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onGeneratePdf={handleGeneratePdf}
          />
        )}
      </div>
    </DashboardLayout>
  );
}