'use client';

import { format } from 'date-fns';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, DocumentArrowDownIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Invoice } from '../../types';

interface InvoiceListProps {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
  onEdit: (invoice: Invoice) => void;
  onDelete: (invoiceId: string) => void;
  onAdd: () => void;
  onGeneratePdf?: (invoiceId: string) => void;
}

export function InvoiceList({ invoices, onView, onEdit, onDelete, onAdd, onGeneratePdf }: InvoiceListProps) {
  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'SENT':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'PAID':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'OVERDUE':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'VOID':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Invoices</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Manage and track your invoices</p>
          </div>
          <Button onClick={onAdd} size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {invoice.invoiceNumber}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(invoice.issueDate), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {invoice.client?.name || 'Unknown Client'}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      ${parseFloat(invoice.total).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Subtotal: ${parseFloat(invoice.subtotal).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1.5 text-sm font-semibold rounded-full border ${getStatusColor(invoice.status)}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${invoice.status === 'PAID' ? 'bg-emerald-500' : invoice.status === 'SENT' ? 'bg-blue-500' : invoice.status === 'OVERDUE' || invoice.status === 'VOID' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(invoice)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                        title="View Invoice"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      {onGeneratePdf && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onGeneratePdf(invoice.id)}
                          className="hover:bg-green-50 hover:text-green-600"
                          title="Download PDF"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(invoice)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                        title="Edit Invoice"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(invoice.id)}
                        className="hover:bg-red-50 hover:text-red-600"
                        title="Delete Invoice"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {invoices.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first invoice</p>
              <Button onClick={onAdd}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Your First Invoice
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}