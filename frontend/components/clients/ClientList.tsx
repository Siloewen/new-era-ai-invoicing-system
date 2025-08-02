'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Client } from '../../types';

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (clientId: string) => void;
  onAdd: () => void;
}

export function ClientList({ clients, onEdit, onDelete, onAdd }: ClientListProps) {
  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'INACTIVE':
        return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'SUSPENDED':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  if (clients.length === 0) {
    return (
      <div className="card-gradient p-16 text-center">
        <div className="animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float">
            <UserGroupIcon className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No clients yet</h3>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            Start building your client relationships by adding your first client
          </p>
          <button onClick={onAdd} className="btn-primary">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Your First Client
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Modern Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clients.map((client, index) => (
          <div 
            key={client.id} 
            className="card-gradient group cursor-pointer card-hover animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {client.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">
                      {client.name}
                    </h3>
                    {client.contactName && (
                      <p className="text-sm text-gray-600">{client.contactName}</p>
                    )}
                  </div>
                </div>
                
                <span className={`status-badge ${
                  client.status === 'ACTIVE' ? 'status-active' :
                  client.status === 'INACTIVE' ? 'status-inactive' :
                  'status-suspended'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    client.status === 'ACTIVE' ? 'bg-emerald-500' : 
                    client.status === 'SUSPENDED' ? 'bg-red-500' : 
                    'bg-gray-400'
                  }`}></div>
                  {client.status}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span>{client.contactEmail || 'No email provided'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span>{client._count?.contracts ?? 0} contracts</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <span>Since {format(new Date(client.createdAt), 'MMM yyyy')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/30">
                <span className="text-xs text-gray-500 font-medium">
                  Created {format(new Date(client.createdAt), 'MMM d, yyyy')}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(client);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(client.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}