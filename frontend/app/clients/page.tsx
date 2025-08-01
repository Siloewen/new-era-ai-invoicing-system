'use client';

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ClientList } from '../../components/clients/ClientList';
import { ClientForm } from '../../components/clients/ClientForm';
import { Client, CreateClientRequest } from '../../types';

// Mock data for now - will be replaced with API calls
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    contactName: 'John Smith',
    contactEmail: 'john@acme.com',
    billingAddress: '123 Business St, City, ST 12345',
    status: 'ACTIVE',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    _count: { contracts: 2, invoices: 5 },
  },
  {
    id: '2',
    name: 'TechStart Inc',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah@techstart.com',
    billingAddress: '456 Innovation Ave, Tech City, TC 67890',
    status: 'ACTIVE',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    _count: { contracts: 1, invoices: 2 },
  },
  {
    id: '3',
    name: 'Global Solutions',
    contactName: 'Mike Davis',
    contactEmail: 'mike@globalsolutions.com',
    billingAddress: '789 Corporate Blvd, Business City, BC 54321',
    status: 'INACTIVE',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-25T16:45:00Z',
    _count: { contracts: 0, invoices: 1 },
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    setEditingClient(undefined);
    setShowForm(true);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDelete = async (clientId: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      // TODO: Replace with API call
      setClients(clients.filter(c => c.id !== clientId));
    }
  };

  const handleSave = async (data: CreateClientRequest) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with API call
      if (editingClient) {
        // Update existing client
        const updatedClient: Client = {
          ...editingClient,
          ...data,
          updatedAt: new Date().toISOString(),
        };
        setClients(clients.map(c => c.id === editingClient.id ? updatedClient : c));
      } else {
        // Create new client
        const newClient: Client = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          status: data.status || 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _count: { contracts: 0, invoices: 0 },
        };
        setClients([newClient, ...clients]);
      }
      setShowForm(false);
      setEditingClient(undefined);
    } catch (error) {
      console.error('Error saving client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingClient(undefined);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your client relationships and information</p>
        </div>

        <ClientList
          clients={clients}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (
          <ClientForm
            client={editingClient}
            onSave={handleSave}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </DashboardLayout>
  );
}