import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsApi } from '../api';
import { Client, CreateClientRequest } from '../../types';

// Query keys
const CLIENTS_QUERY_KEY = ['clients'];

// Fetch all clients
export const useClients = () => {
  return useQuery({
    queryKey: CLIENTS_QUERY_KEY,
    queryFn: clientsApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch single client
export const useClient = (id: string) => {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: () => clientsApi.getById(id),
    enabled: !!id,
  });
};

// Create client mutation
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientRequest) => clientsApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch clients list
      queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
    },
  });
};

// Update client mutation
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateClientRequest> }) =>
      clientsApi.update(id, data),
    onSuccess: (updatedClient) => {
      // Update the clients list cache
      queryClient.setQueryData(CLIENTS_QUERY_KEY, (oldData: Client[] | undefined) => {
        if (!oldData) return [updatedClient];
        return oldData.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        );
      });
      // Also update individual client cache
      queryClient.setQueryData(['clients', updatedClient.id], updatedClient);
    },
  });
};

// Delete client mutation
export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove from clients list cache
      queryClient.setQueryData(CLIENTS_QUERY_KEY, (oldData: Client[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((client) => client.id !== deletedId);
      });
      // Remove individual client cache
      queryClient.removeQueries({ queryKey: ['clients', deletedId] });
    },
  });
};