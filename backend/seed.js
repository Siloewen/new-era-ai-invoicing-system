const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create test clients
  const client1 = await prisma.client.create({
    data: {
      name: 'Acme Corporation',
      contactName: 'John Smith',
      contactEmail: 'john@acme.com',
      billingAddress: '123 Business Ave\nNew York, NY 10001',
      status: 'ACTIVE',
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Tech Solutions Inc',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah@techsolutions.com',  
      billingAddress: '456 Innovation Blvd\nSan Francisco, CA 94105',
      status: 'ACTIVE',
    },
  });

  console.log('✅ Sample data created successfully!');
  console.log('Clients:', { client1: client1.name, client2: client2.name });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });