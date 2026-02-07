import { Navigation } from '@/components/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
