'use client';

import { format } from 'date-fns';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, DocumentArrowDownIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
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

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
        <div>
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(to bottom right, #3b82f6, #4f46e5)'}}>
            <CurrencyDollarIcon className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No invoices yet</h3>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            Get started by creating your first invoice
          </p>
          <button 
            onClick={onAdd} 
            className="text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}}
          >
            <PlusIcon className="h-5 w-5 mr-2 inline" />
            Create Your First Invoice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                      <button
                        onClick={() => onView(invoice)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="View Invoice"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {onGeneratePdf && (
                        <button
                          onClick={() => onGeneratePdf(invoice.id)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Download PDF"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(invoice)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Edit Invoice"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(invoice.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete Invoice"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}