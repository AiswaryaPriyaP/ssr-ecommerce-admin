import { connectDB } from "../../../lib/db";
import Product from "../../../models/Product";
import ProductChart from "./ProductChart";

export const dynamic = "force-dynamic"; // SSR proof

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find()
    .sort({ createdAt: -1 })
    .lean();

  // Build chart data
  const categoryMap: Record<string, number> = {};
  products.forEach((p: any) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });

  const chartData = Object.entries(categoryMap).map(
    ([category, count]) => ({ category, count })
  );

  return (
    <main className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <a
          href="/dashboard/products/new"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Add Product
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Created</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr key={product._id}>
                <td className="border p-2">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-14 w-14 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">₹{product.price}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Section */}
      <ProductChart data={chartData} />
    </main>
  );
}
