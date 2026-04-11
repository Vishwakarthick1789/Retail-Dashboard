import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../../data/mockData';
import { format, parseISO } from 'date-fns';

interface Props {
  transactions: Transaction[];
  previousTransactions: Transaction[];
}

export const SeasonalTrendChart: React.FC<Props> = ({ transactions, previousTransactions }) => {
  const chartData = useMemo(() => {
    // Generate monthly aggregation
    const dataMap = new Map<string, { month: string, currentSales: number, prevSales: number }>();

    transactions.forEach(t => {
      // Group by just the month name (e.g. Jan, Feb) for seasonal alignment
      const date = parseISO(t.date);
      const monthStr = format(date, 'MMM');
      
      if (!dataMap.has(monthStr)) {
        dataMap.set(monthStr, { month: monthStr, currentSales: 0, prevSales: 0 });
      }
      dataMap.get(monthStr)!.currentSales += t.sales;
    });

    previousTransactions.forEach(t => {
      const date = parseISO(t.date);
      const monthStr = format(date, 'MMM');
      if (!dataMap.has(monthStr)) {
        dataMap.set(monthStr, { month: monthStr, currentSales: 0, prevSales: 0 });
      }
      dataMap.get(monthStr)!.prevSales += t.sales;
    });

    // Ensure chronological order
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return Array.from(dataMap.values()).sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
  }, [transactions, previousTransactions]);

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground">Seasonal Trend Analysis</h3>
        <p className="text-sm text-muted-foreground">Current Year vs Previous Year Revenue</p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--surface-light))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              labelStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" name="Current Year" dataKey="currentSales" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" name="Previous Year" dataKey="prevSales" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
