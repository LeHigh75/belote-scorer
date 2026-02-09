import { Navigation } from '@/components/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <main className="flex-1 pt-[60px] pb-[72px] px-4 md:pt-0 md:pb-0 md:p-8">
        {children}
      </main>
    </div>
  );
}
