import { PrismaClient, Role, ClientStatus, DataRateType, InvoiceStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@neweraai.com' },
    update: {},
    create: {
      email: 'admin@neweraai.com',
      name: 'System Administrator',
      role: Role.ADMIN,
      passwordHash: await bcrypt.hash('admin123', 10),
    },
  });

  // Create agent user
  const agentUser = await prisma.user.upsert({
    where: { email: 'agent@neweraai.com' },
    update: {},
    create: {
      email: 'agent@neweraai.com',
      name: 'Invoice Agent',
      role: Role.AGENT,
      passwordHash: await bcrypt.hash('agent123', 10),
    },
  });

  // Create sample clients
  const client1 = await prisma.client.create({
    data: {
      name: 'Tech Innovations Inc.',
      contactName: 'John Smith',
      contactEmail: 'john@techinnovations.com',
      billingAddress: '123 Innovation Drive, San Francisco, CA 94105',
      status: ClientStatus.ACTIVE,
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Digital Solutions LLC',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah@digitalsolutions.com',
      billingAddress: '456 Digital Ave, New York, NY 10001',
      status: ClientStatus.ACTIVE,
    },
  });

  // Create sample contracts
  const contract1 = await prisma.contract.create({
    data: {
      clientId: client1.id,
      planName: 'Chatbot Maintenance Pro',
      flatMonthlyFee: 2500.00,
      dataRateType: DataRateType.PER_TOKEN,
      dataRatePrice: 0.0015,
      nextInvoiceDate: new Date('2025-09-01'),
      isActive: true,
    },
  });

  const contract2 = await prisma.contract.create({
    data: {
      clientId: client2.id,
      planName: 'AI Assistant Standard',
      flatMonthlyFee: 1800.00,
      dataRateType: DataRateType.PER_MINUTE,
      dataRatePrice: 0.05,
      nextInvoiceDate: new Date('2025-09-01'),
      isActive: true,
    },
  });

  // Create usage records
  await prisma.usageRecord.create({
    data: {
      contractId: contract1.id,
      periodStart: new Date('2025-08-01'),
      periodEnd: new Date('2025-08-31'),
      usageQuantity: 150000,
      unit: 'tokens',
      notes: 'August 2025 usage - high activity month',
    },
  });

  await prisma.usageRecord.create({
    data: {
      contractId: contract2.id,
      periodStart: new Date('2025-08-01'),
      periodEnd: new Date('2025-08-31'),
      usageQuantity: 2400,
      unit: 'minutes',
      notes: 'August 2025 usage - steady activity',
    },
  });

  // Create invoice template
  await prisma.invoiceTemplate.create({
    data: {
      name: 'Standard Monthly Invoice',
      storageKey: 'templates/standard-monthly.docx',
      variablesSchema: {
        client_name: 'string',
        client_address: 'string',
        invoice_number: 'string',
        issue_date: 'date',
        due_date: 'date',
        period_start: 'date',
        period_end: 'date',
        line_items: 'array',
        subtotal: 'number',
        tax: 'number',
        total: 'number',
      },
      createdById: adminUser.id,
    },
  });

  // Create sample invoice
  const invoice = await prisma.invoice.create({
    data: {
      clientId: client1.id,
      contractId: contract1.id,
      invoiceNumber: 'NEAI-2025-08-0001',
      periodStart: new Date('2025-08-01'),
      periodEnd: new Date('2025-08-31'),
      issueDate: new Date('2025-08-31'),
      dueDate: new Date('2025-09-15'),
      subtotal: 2725.00,
      tax: 272.50,
      total: 2997.50,
      status: InvoiceStatus.DRAFT,
      lineItems: {
        create: [
          {
            description: 'Chatbot Maintenance Pro - Monthly Fee',
            quantity: 1,
            unitPrice: 2500.00,
            amount: 2500.00,
          },
          {
            description: 'Token Usage (150,000 tokens × $0.0015)',
            quantity: 150000,
            unitPrice: 0.0015,
            amount: 225.00,
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log({
    users: { admin: adminUser.email, agent: agentUser.email },
    clients: [client1.name, client2.name],
    contracts: 2,
    invoices: 1,
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });