'use client';

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { InvoiceList } from '../../components/invoices/InvoiceList';
import { Invoice } from '../../types';

// Mock data for now - will be replaced with API calls
const mockInvoices: Invoice[] = [
  {
    id: '1',
    clientId: '1',
    contractId: '1',
    invoiceNumber: 'INV-2024-001',
    periodStart: '2024-01-01T00:00:00Z',
    periodEnd: '2024-01-31T23:59:59Z',
    issueDate: '2024-02-01T00:00:00Z',
    dueDate: '2024-02-15T00:00:00Z',
    subtotal: '2000.00',
    tax: '200.00',
    total: '2200.00',
    status: 'SENT',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
    client: {
      id: '1',
      name: 'Acme Corporation',
      contactName: 'John Smith',
      contactEmail: 'john@acme.com',
      billingAddress: '123 Business St, City, ST 12345',
      status: 'ACTIVE',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    lineItems: [
      {
        id: '1',
        invoiceId: '1',
        description: 'AI Service Usage - January 2024',
        quantity: '1000.0000',
        unitPrice: '2.00',
        amount: '2000.00',
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z',
      },
    ],
  },
  {
    id: '2',
    clientId: '2',
    contractId: '2',
    invoiceNumber: 'INV-2024-002',
    periodStart: '2024-01-01T00:00:00Z',
    periodEnd: '2024-01-31T23:59:59Z',
    issueDate: '2024-02-01T00:00:00Z',
    dueDate: '2024-02-15T00:00:00Z',
    subtotal: '1500.00',
    tax: '150.00',
    total: '1650.00',
    status: 'PAID',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-05T14:30:00Z',
    client: {
      id: '2',
      name: 'TechStart Inc',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah@techstart.com',
      billingAddress: '456 Innovation Ave, Tech City, TC 67890',
      status: 'ACTIVE',
      createdAt: '2024-01-20T14:30:00Z',
      updatedAt: '2024-01-20T14:30:00Z',
    },
    lineItems: [
      {
        id: '2',
        invoiceId: '2',
        description: 'AI Service Usage - January 2024',
        quantity: '750.0000',
        unitPrice: '2.00',
        amount: '1500.00',
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z',
      },
    ],
  },
  {
    id: '3',
    clientId: '1',
    contractId: '1',
    invoiceNumber: 'INV-2024-003',
    periodStart: '2024-02-01T00:00:00Z',
    periodEnd: '2024-02-28T23:59:59Z',
    issueDate: '2024-03-01T00:00:00Z',
    dueDate: '2024-03-15T00:00:00Z',
    subtotal: '2500.00',
    tax: '250.00',
    total: '2750.00',
    status: 'DRAFT',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
    client: {
      id: '1',
      name: 'Acme Corporation',
      contactName: 'John Smith',
      contactEmail: 'john@acme.com',
      billingAddress: '123 Business St, City, ST 12345',
      status: 'ACTIVE',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    lineItems: [
      {
        id: '3',
        invoiceId: '3',
        description: 'AI Service Usage - February 2024',
        quantity: '1250.0000',
        unitPrice: '2.00',
        amount: '2500.00',
        createdAt: '2024-03-01T10:00:00Z',
        updatedAt: '2024-03-01T10:00:00Z',
      },
    ],
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);

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
      // TODO: Replace with API call
      setInvoices(invoices.filter(i => i.id !== invoiceId));
    }
  };

  const handleAdd = () => {
    // TODO: Open invoice creation form
    console.log('Add new invoice');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600">Manage and track your invoices</p>
        </div>

        <InvoiceList
          invoices={invoices}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </div>
    </DashboardLayout>
  );
}