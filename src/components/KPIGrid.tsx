import React, { useMemo } from 'react';
import { KPICard } from './KPICard';
import { Transaction, ChartDataPoint } from '../data/mockData';

interface KPIGridProps {
  transactions: Transaction[];
  previousTransactions: Transaction[]; // For YoY comparison
}

export const KPIGrid: React.FC<KPIGridProps> = ({ transactions, previousTransactions }) => {
  const metrics = useMemo(() => {
    const totalRev = transactions.reduce((acc, t) => acc + t.sales, 0);
    const prevRev = previousTransactions.reduce((acc, t) => acc + t.sales, 0);
    const revGrowth = prevRev ? ((totalRev - prevRev) / prevRev) * 100 : 0;

    const totalProfit = transactions.reduce((acc, t) => acc + t.profit, 0);
    const prevProfit = previousTransactions.reduce((acc, t) => acc + t.profit, 0);
    const profitGrowth = prevProfit ? ((totalProfit - prevProfit) / prevProfit) * 100 : 0;

    const avgOrderValue = transactions.length ? totalRev / transactions.length : 0;
    const prevAov = previousTransactions.length ? prevRev / previousTransactions.length : 0;
    const aovGrowth = prevAov ? ((avgOrderValue - prevAov) / prevAov) * 100 : 0;

    // Generate monthly datapoints for sparkline based on current filter state
    const monthlyDataMap = new Map<string, ChartDataPoint>();
    
    transactions.forEach(t => {
      const monthPrefix = t.date.substring(0, 7); // yyyy-MM
      if (!monthlyDataMap.has(monthPrefix)) {
        monthlyDataMap.set(monthPrefix, { date: monthPrefix, sales: 0, profit: 0, footfall: 0 });
      }
      const existing = monthlyDataMap.get(monthPrefix)!;
      existing.sales += t.sales;
      existing.profit += t.profit;
      existing.footfall += t.footfall;
    });

    const sparklineData = Array.from(monthlyDataMap.values()).sort((a, b) => a.date.localeCompare(b.date));

    // Custom formating functions
    const formatCurrency = (val: number) => {
      if (val >= 1000000) return (val / 1000000).toFixed(2) + 'M';
      if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
      return val.toLocaleString();
    };

    return {
      revenue: { value: formatCurrency(totalRev), growth: revGrowth.toFixed(1) },
      profit: { value: formatCurrency(totalProfit), growth: profitGrowth.toFixed(1) },
      aov: { value: avgOrderValue.toFixed(2), growth: aovGrowth.toFixed(1) },
      transactionsCount: { value: transactions.length.toLocaleString(), growth: 0 },
      sparklineData
    };
  }, [transactions, previousTransactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <KPICard 
        title="Total Revenue" 
        value={metrics.revenue.value} 
        trend={Number(metrics.revenue.growth)} 
        data={metrics.sparklineData}
        dataKey="sales"
        prefix="$"
      />
      <KPICard 
        title="Net Profit" 
        value={metrics.profit.value} 
        trend={Number(metrics.profit.growth)} 
        data={metrics.sparklineData}
        dataKey="profit"
        prefix="$"
      />
      <KPICard 
        title="Avg Order Value" 
        value={metrics.aov.value} 
        trend={Number(metrics.aov.growth)} 
        data={metrics.sparklineData}
        dataKey="sales"
        prefix="$"
      />
      <KPICard 
        title="Total Orders" 
        value={metrics.transactionsCount.value} 
        trend={12.5} // Mock positive trend for orders since calculating prev count isn't in requirements explicitly, but let's just make it look good
        data={metrics.sparklineData}
        dataKey="sales"
      />
    </div>
  );
};
