import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesApi } from '../api';
import { Invoice, CreateInvoiceRequest } from '../../types';

// Query keys
const INVOICES_QUERY_KEY = ['invoices'];

// Fetch all invoices
export const useInvoices = () => {
  return useQuery({
    queryKey: INVOICES_QUERY_KEY,
    queryFn: invoicesApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch single invoice
export const useInvoice = (id: string) => {
  return useQuery({
    queryKey: ['invoices', id],
    queryFn: () => invoicesApi.getById(id),
    enabled: !!id,
  });
};

// Create invoice mutation
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvoiceRequest) => invoicesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICES_QUERY_KEY });
    },
  });
};

// Update invoice mutation
export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateInvoiceRequest> }) =>
      invoicesApi.update(id, data),
    onSuccess: (updatedInvoice) => {
      queryClient.setQueryData(INVOICES_QUERY_KEY, (oldData: Invoice[] | undefined) => {
        if (!oldData) return [updatedInvoice];
        return oldData.map((invoice) =>
          invoice.id === updatedInvoice.id ? updatedInvoice : invoice
        );
      });
      queryClient.setQueryData(['invoices', updatedInvoice.id], updatedInvoice);
    },
  });
};

// Delete invoice mutation
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoicesApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(INVOICES_QUERY_KEY, (oldData: Invoice[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((invoice) => invoice.id !== deletedId);
      });
      queryClient.removeQueries({ queryKey: ['invoices', deletedId] });
    },
  });
};