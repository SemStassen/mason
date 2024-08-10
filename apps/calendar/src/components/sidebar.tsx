import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="fixed top-0 ml-4 flex h-screen flex-shrink-0 flex-col items-center justify-between pb-4 md:flex">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-6">
          <Link href="/">Mason</Link>
        </div>
      </div>
    </aside>
  );
}
