import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Transaction } from '../../data/mockData';

interface Props {
  transactions: Transaction[];
}

export const RegionalPerformanceChart: React.FC<Props> = ({ transactions }) => {
  const chartData = useMemo(() => {
    const dataMap = new Map<string, { region: string, profit: number }>();
    
    transactions.forEach(t => {
      if (!dataMap.has(t.region)) {
        dataMap.set(t.region, { region: t.region, profit: 0 });
      }
      dataMap.get(t.region)!.profit += t.profit;
    });

    return Array.from(dataMap.values()).sort((a, b) => b.profit - a.profit);
  }, [transactions]);

  // Color palette for regions
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6'];

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground">Regional Performance</h3>
        <p className="text-sm text-muted-foreground">Total Profit per Region</p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
            <YAxis type="category" dataKey="region" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--foreground))', fontWeight: 500}} />
            <Tooltip 
              cursor={{fill: 'hsl(var(--muted-foreground)/0.1)'}}
              contentStyle={{ backgroundColor: 'hsl(var(--surface-light))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar dataKey="profit" radius={[0, 4, 4, 0]} barSize={24}>
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
