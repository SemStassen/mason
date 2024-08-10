import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Sidebar />
      <div className="ml-[90px]">{children}</div>
    </div>
  );
}
