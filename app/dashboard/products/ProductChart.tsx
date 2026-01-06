"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  category: string;
  count: number;
};

export default function ProductChart({ data }: { data: ChartData[] }) {
  return (
    <div className="w-full h-80 border rounded p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">
        Products by Category
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#000000ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
