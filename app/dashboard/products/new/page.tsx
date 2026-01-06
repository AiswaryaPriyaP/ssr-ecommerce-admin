"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/lib/productSchema";

export default function NewProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

      const onSubmit = async (data: any) => {
    try {
      // 1. Upload image to Cloudinary
      const imageFormData = new FormData();
      imageFormData.append("file", data.image[0]);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });

      if (!uploadRes.ok) {
        alert("Image upload failed");
        return;
      }

      const uploadData = await uploadRes.json();

      // 2. Save product with image URL
      const productRes = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          stock: data.stock,
          category: data.category,
          imageUrl: uploadData.url,
        }),
      });

      if (!productRes.ok) {
        alert("Failed to add product");
        return;
      }

      alert("Product added successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            {...register("name")}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full border p-2 rounded"
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className="w-full border p-2 rounded"
          />
          {errors.stock && (
            <p className="text-red-600 text-sm">{errors.stock.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            {...register("category")}
            className="w-full border p-2 rounded"
          />
          {errors.category && (
            <p className="text-red-600 text-sm">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
         <label className="block mb-1 font-medium">Product Image</label>
         <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full"
          />
        </div>


        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Save Product
        </button>
      </form>
    </main>
  );
}
