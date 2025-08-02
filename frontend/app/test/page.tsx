'use client';

import { useClients } from '../../lib/hooks/useClients';
import { useInvoices } from '../../lib/hooks/useInvoices';

export default function TestPage() {
  const { data: clients, isLoading: clientsLoading, error: clientsError } = useClients();
  const { data: invoices, isLoading: invoicesLoading, error: invoicesError } = useInvoices();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Clients API Test</h2>
          {clientsLoading && <p>Loading clients...</p>}
          {clientsError && <p className="text-red-500">Error: {clientsError.message}</p>}
          {clients && (
            <div>
              <p className="mb-2">Total clients: {clients.length}</p>
              <ul className="space-y-2">
                {clients.map((client) => (
                  <li key={client.id} className="bg-gray-100 p-2 rounded">
                    {client.name} - {client.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Invoices API Test</h2>
          {invoicesLoading && <p>Loading invoices...</p>}
          {invoicesError && <p className="text-red-500">Error: {invoicesError.message}</p>}
          {invoices && (
            <div>
              <p className="mb-2">Total invoices: {invoices.length}</p>
              <ul className="space-y-2">
                {invoices.map((invoice) => (
                  <li key={invoice.id} className="bg-gray-100 p-2 rounded">
                    {invoice.invoiceNumber} - {invoice.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}