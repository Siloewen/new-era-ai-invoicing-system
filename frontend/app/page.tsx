export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            New Era AI Invoicing System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional automated invoicing for client management
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Client Management</h3>
              <p className="text-gray-600">Manage clients and their contract details</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Automated Billing</h3>
              <p className="text-gray-600">Generate invoices automatically each month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Professional PDFs</h3>
              <p className="text-gray-600">Branded, professional invoice templates</p>
            </div>
          </div>
          
          <div className="mt-12">
            <button className="btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}