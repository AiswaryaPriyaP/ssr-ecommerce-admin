import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductChart from "@/dashboard/products/ProductChart";

export const dynamic = "force-dynamic"; // SSR proof

export default async function AnalyticsPage() {
  await connectDB();

  const products = await Product.find().lean();

  // Group by category
  const categoryMap: Record<string, number> = {};
  products.forEach((p: any) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });

  const chartData = Object.entries(categoryMap).map(
    ([category, count]) => ({
      category,
      count,
    })
  );

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sales & Analytics</h1>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Products by Category
        </h2>

        {chartData.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <ProductChart data={chartData} />
        )}
      </div>
    </main>
  );
}
