export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4">
          <a
            href="/dashboard"
            className="block hover:text-gray-300 transition"
          >
            Dashboard
          </a>

          <a
            href="/dashboard/products"
            className="block hover:text-gray-300 transition"
          >
            Products
          </a>
        <a
             href="/dashboard/analytics"
             className="block text-white hover:text-gray-300"
        >
             Analytics
            </a>

          <a
            href="/dashboard/products/new"
            className="block hover:text-gray-300 transition"
          >
            Add Product
          </a>

          <hr className="border-gray-700 my-6" />

          <a
            href="/login"
            className="block text-red-400 hover:text-red-300 transition"
          >
            Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 bg-gray-50">
        {children}
      </section>
    </div>
  );
}
