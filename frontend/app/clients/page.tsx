'use client';

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ClientList } from '../../components/clients/ClientList';
import { ClientForm } from '../../components/clients/ClientForm';
import { useClients, useCreateClient, useUpdateClient, useDeleteClient } from '../../lib/hooks/useClients';
import { Client, CreateClientRequest } from '../../types';

export default function ClientsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>();

  // Temporary sample data - replace with API later
  const clients = [
    {
      id: '1',
      name: 'Acme Corporation',
      contactName: 'John Smith',
      contactEmail: 'john@acme.com',
      billingAddress: '123 Business Ave\nNew York, NY 10001',
      status: 'ACTIVE' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2', 
      name: 'Tech Solutions Inc',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah@techsolutions.com',
      billingAddress: '456 Innovation Blvd\nSan Francisco, CA 94105',
      status: 'ACTIVE' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];
  const isLoading = false;
  const error = null;
  const createClientMutation = useCreateClient();
  const updateClientMutation = useUpdateClient();
  const deleteClientMutation = useDeleteClient();

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
      try {
        await deleteClientMutation.mutateAsync(clientId);
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Failed to delete client. Please try again.');
      }
    }
  };

  const handleSave = async (data: CreateClientRequest) => {
    try {
      if (editingClient) {
        await updateClientMutation.mutateAsync({ id: editingClient.id, data });
      } else {
        await createClientMutation.mutateAsync(data);
      }
      setShowForm(false);
      setEditingClient(undefined);
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Failed to save client. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingClient(undefined);
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-6">
            <h1 
              className="text-3xl font-bold text-gray-900"
              style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}
            >
              Clients
            </h1>
            <p 
              className="text-gray-600 mt-2"
              style={{ color: '#4B5563', marginTop: '0.5rem' }}
            >
              Manage your client relationships and information
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="text-red-800">
              <h3 className="font-semibold text-lg">Error loading clients</h3>
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
      <div className="space-y-8 animate-fade-in">
        {/* Modern Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-modern rounded-3xl opacity-50"></div>
          <div className="relative card-gradient p-8">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gradient mb-2">
                  Clients
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  Manage your client relationships and information
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="stat-card stat-card-blue p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{clients?.length || 0}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Total Clients</p>
                        <p className="text-xs text-gray-500">All registered</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="stat-card stat-card-emerald p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{clients?.filter(c => c.status === 'ACTIVE').length || 0}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Active</p>
                        <p className="text-xs text-gray-500">Currently working</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="stat-card stat-card-purple p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{clients?.filter(c => c.status === 'INACTIVE').length || 0}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Inactive</p>
                        <p className="text-xs text-gray-500">On hold</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="ml-8">
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary group"
                >
                  <span className="mr-2">+</span>
                  Add New Client
                </button>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="card-gradient p-12 text-center animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 animate-spin">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Loading clients...</p>
              <p className="text-gray-400 text-sm mt-1">Fetching your client data</p>
            </div>
          </div>
        ) : (
          <div className="animate-slide-up">
            <ClientList
              clients={clients}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        {showForm && (
          <ClientForm
            client={editingClient}
            onSave={handleSave}
            onCancel={handleCancel}
            isSubmitting={createClientMutation.isPending || updateClientMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}