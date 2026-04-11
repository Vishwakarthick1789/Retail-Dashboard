import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction } from '../../data/mockData';

interface Props {
  transactions: Transaction[];
}

export const CategoryBreakdownChart: React.FC<Props> = ({ transactions }) => {
  const chartData = useMemo(() => {
    const dataMap = new Map<string, { name: string, value: number }>();
    
    transactions.forEach(t => {
      if (!dataMap.has(t.category)) {
        dataMap.set(t.category, { name: t.category, value: 0 });
      }
      dataMap.get(t.category)!.value += t.sales;
    });

    return Array.from(dataMap.values());
  }, [transactions]);

  const COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899'];

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground">Category Breakdown</h3>
        <p className="text-sm text-muted-foreground">Revenue Distribution</p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--surface-light))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: any) => `$${value.toLocaleString()}`}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
