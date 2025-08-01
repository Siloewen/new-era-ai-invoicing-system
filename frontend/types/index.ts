export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'AGENT' | 'READ_ONLY';
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  contactName?: string;
  contactEmail?: string;
  billingAddress?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: string;
  updatedAt: string;
  contracts?: Contract[];
  _count?: {
    contracts: number;
    invoices: number;
  };
}

export interface Contract {
  id: string;
  clientId: string;
  planName: string;
  flatMonthlyFee: string;
  dataRateType: 'PER_TOKEN' | 'PER_MINUTE' | 'PER_REQUEST' | 'PER_USAGE_UNIT';
  dataRatePrice: string;
  nextInvoiceDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  client?: Client;
  _count?: {
    usageRecords: number;
    invoices: number;
  };
}

export interface Invoice {
  id: string;
  clientId: string;
  contractId: string;
  invoiceNumber: string;
  periodStart: string;
  periodEnd: string;
  issueDate: string;
  dueDate: string;
  subtotal: string;
  tax: string;
  total: string;
  pdfStorageKey?: string;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'VOID' | 'OVERDUE';
  createdAt: string;
  updatedAt: string;
  client?: Client;
  contract?: Contract;
  lineItems?: InvoiceLineItem[];
}

export interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: string;
  unitPrice: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  storageKey: string;
  variablesSchema: Record<string, any>;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    id: string;
    name?: string;
    email: string;
  };
}

export interface CreateClientRequest {
  name: string;
  contactName?: string;
  contactEmail?: string;
  billingAddress?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export interface CreateContractRequest {
  clientId: string;
  planName: string;
  flatMonthlyFee: string;
  dataRateType: 'PER_TOKEN' | 'PER_MINUTE' | 'PER_REQUEST' | 'PER_USAGE_UNIT';
  dataRatePrice: string;
  nextInvoiceDate: string;
  isActive?: boolean;
}

export interface CreateInvoiceRequest {
  clientId: string;
  contractId: string;
  invoiceNumber: string;
  periodStart: string;
  periodEnd: string;
  issueDate: string;
  dueDate: string;
  subtotal: string;
  tax: string;
  total: string;
  status?: 'DRAFT' | 'SENT' | 'PAID' | 'VOID' | 'OVERDUE';
  lineItems: {
    description: string;
    quantity: string;
    unitPrice: string;
    amount: string;
  }[];
}