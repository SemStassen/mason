import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full flex">
      <Sidebar />
      <div className="flex-1 flex overflow-x-hidden">{children}</div>
    </div>
  );
}
