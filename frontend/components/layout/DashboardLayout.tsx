import { Navigation } from './Navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff, #eef2ff)'}}>
      <Navigation />
      <main 
        className="p-4" 
        style={{ 
          marginLeft: '288px', 
          padding: '1rem',
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