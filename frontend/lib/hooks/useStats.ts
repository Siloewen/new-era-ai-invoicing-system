import { useQuery } from '@tanstack/react-query';
import { useClients } from './useClients';
import { useInvoices } from './useInvoices';

export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  totalInvoices: number;
  pendingInvoices: number;
  paidInvoices: number;
  monthlyRevenue: number;
  overdueInvoices: number;
}

export const useStats = () => {
  const { data: clients = [], isSuccess: clientsSuccess } = useClients();
  const { data: invoices = [], isSuccess: invoicesSuccess } = useInvoices();

  return useQuery({
    queryKey: ['stats'],
    queryFn: (): DashboardStats => {
      const activeClients = clients.filter(c => c.status === 'ACTIVE').length;
      const pendingInvoices = invoices.filter(i => i.status === 'SENT' || i.status === 'DRAFT').length;
      const paidInvoices = invoices.filter(i => i.status === 'PAID').length;
      const overdueInvoices = invoices.filter(i => i.status === 'OVERDUE').length;
      
      // Calculate monthly revenue from paid invoices
      const monthlyRevenue = invoices
        .filter(i => i.status === 'PAID')
        .reduce((sum, invoice) => sum + parseFloat(invoice.total), 0);

      return {
        totalClients: clients.length,
        activeClients,
        totalInvoices: invoices.length,
        pendingInvoices,
        paidInvoices,
        monthlyRevenue,
        overdueInvoices,
      };
    },
    enabled: clientsSuccess && invoicesSuccess, // Only enable when both data sources are available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};