import { Navigation } from './Navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      <main 
        className="p-8" 
        style={{ 
          marginLeft: '288px', 
          padding: '2rem',
          minHeight: '100vh'
        }}
      >
        <div 
          className="max-w-7xl mx-auto"
          style={{ maxWidth: '80rem', margin: '0 auto' }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}