'use client';

import { useState } from 'react';
import { ModernLayout } from '../../components/layout/ModernLayout';
import { InvoiceList } from '../../components/invoices/InvoiceList';
import { useInvoices, useDeleteInvoice } from '../../lib/hooks/useInvoices';
import { pdfApi } from '../../lib/api';
import { Invoice } from '../../types';

export default function InvoicesPage() {
  // Temporary sample data - replace with API later  
  const invoices = [
    {
      id: '1',
      invoiceNumber: 'INV-001',
      client: { id: '1', name: 'Acme Corporation' },
      issueDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      subtotal: '1000.00',
      tax: '100.00', 
      total: '1100.00',
      status: 'SENT' as const,
    },
    {
      id: '2',
      invoiceNumber: 'INV-002', 
      client: { id: '2', name: 'Tech Solutions Inc' },
      issueDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      subtotal: '2500.00',
      tax: '250.00',
      total: '2750.00', 
      status: 'DRAFT' as const,
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
      <ModernLayout>
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
      </ModernLayout>
    );
  }

  return (
    <ModernLayout>
      <div className="space-y-8">
        {/* Enhanced Header with Actions */}
        <div 
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6"
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '0.75rem', 
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}
        >
          <div 
            className="flex justify-between items-center"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <h1 
                className="text-3xl font-bold text-gray-900"
                style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}
              >
                Invoices
              </h1>
              <p 
                className="text-gray-600 mt-2"
                style={{ color: '#4B5563', marginTop: '0.5rem' }}
              >
                Manage and track your invoices
              </p>
              <div 
                className="flex items-center space-x-6 mt-4"
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem' }}
              >
                <div>
                  <span 
                    className="text-2xl font-bold text-blue-600"
                    style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}
                  >
                    {invoices?.length || 0}
                  </span>
                  <p 
                    className="text-sm text-gray-500"
                    style={{ fontSize: '14px', color: '#6b7280' }}
                  >
                    Total Invoices
                  </p>
                </div>
                <div>
                  <span 
                    className="text-2xl font-bold text-green-600"
                    style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}
                  >
                    {invoices?.filter(i => i.status === 'PAID').length || 0}
                  </span>
                  <p 
                    className="text-sm text-gray-500"
                    style={{ fontSize: '14px', color: '#6b7280' }}
                  >
                    Paid
                  </p>
                </div>
                <div>
                  <span 
                    className="text-2xl font-bold text-orange-600"
                    style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ea580c' }}
                  >
                    {invoices?.filter(i => i.status === 'SENT' || i.status === 'DRAFT').length || 0}
                  </span>
                  <p 
                    className="text-sm text-gray-500"
                    style={{ fontSize: '14px', color: '#6b7280' }}
                  >
                    Pending
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                borderRadius: '0.5rem',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Create Invoice
            </button>
          </div>
        </div>

        {isLoading ? (
          <div 
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-12"
            style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '0.75rem', 
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
              padding: '3rem',
              textAlign: 'center'
            }}
          >
            <div 
              className="flex flex-col items-center"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div 
                className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%',
                  border: '2px solid transparent',
                  borderBottom: '2px solid #2563eb',
                  marginBottom: '1rem'
                }}
              ></div>
              <p 
                className="text-gray-600"
                style={{ color: '#4B5563', fontSize: '16px' }}
              >
                Loading invoices...
              </p>
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
    </ModernLayout>
  );
}