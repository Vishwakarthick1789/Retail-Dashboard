import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ChartDataPoint } from '../data/mockData';

interface KPICardProps {
  title: string;
  value: string;
  trend: number; // percentage
  data: ChartDataPoint[];
  dataKey: keyof ChartDataPoint;
  prefix?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, data, dataKey, prefix = "" }) => {
  const isPositive = trend >= 0;

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border shadow-sm flex flex-col hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-foreground">{prefix}{value}</h3>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
          isPositive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
        }`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      
      <div className="h-12 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={isPositive ? '#10b981' : '#f43f5e'} 
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
