import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Admin | WingMann",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="ml-56 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
