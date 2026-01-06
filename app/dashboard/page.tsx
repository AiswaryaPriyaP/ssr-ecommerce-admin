import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Products Card */}
        <Link
          href="/dashboard/products"
          className="border p-6 rounded-lg hover:bg-gray-50 transition block"
        >
          <h2 className="text-xl font-semibold mb-1">Products</h2>
          <p className="text-gray-600">Manage all products</p>
          <p className="text-sm text-gray-400 mt-2">
            Click to manage products →
          </p>
        </Link>

        {/* Sales & Analytics Card */}
        <Link
          href="/dashboard/analytics"
          className="border p-6 rounded-lg hover:bg-gray-50 transition block"
        >
          <h2 className="text-xl font-semibold mb-1">Sales & Analytics</h2>
          <p className="text-gray-600">View product distribution</p>
          <p className="text-sm text-gray-400 mt-2">
            Click to view charts →
          </p>
        </Link>

        {/* Admins Card (Disabled) */}
        <div className="border p-6 rounded-lg bg-gray-100 cursor-not-allowed">
          <h2 className="text-xl font-semibold text-gray-500">Admins</h2>
          <p className="text-gray-500">Admin management</p>
          <p className="text-sm text-gray-400 mt-2">Coming soon</p>
        </div>

      </div>
    </main>
  );
}
