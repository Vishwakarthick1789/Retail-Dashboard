import { addMonths, startOfMonth, format } from "date-fns";

export type Region = "North" | "South" | "East" | "West";
export type Category = "Tech" | "Home" | "Fashion";
export type Status = "Completed" | "Pending" | "Cancelled";

export interface Transaction {
  id: string;
  date: string;
  region: Region;
  category: Category;
  sales: number;
  profit: number;
  footfall: number;
  status: Status;
}

export interface ChartDataPoint {
  date: string;
  sales: number;
  profit: number;
  footfall: number;
}

const REGIONS: Region[] = ["North", "South", "East", "West"];
const CATEGORIES: Category[] = ["Tech", "Home", "Fashion"];
const STATUSES: Status[] = ["Completed", "Completed", "Completed", "Pending", "Cancelled"]; // Weighting Completed securely

export const generateMockData = (): Transaction[] => {
  const data: Transaction[] = [];
  const currentDate = new Date();
  const startDate = startOfMonth(addMonths(currentDate, -24));

  for (let i = 0; i < 24; i++) {
    const month = addMonths(startDate, i);
    const dateStr = format(month, 'yyyy-MM-dd');
    
    // Create ~50-100 transactions per month simulating sales
    const numTransactions = Math.floor(Math.random() * 50) + 50;

    for (let j = 0; j < numTransactions; j++) {
      const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      
      // Introduce seasonal spikes (e.g. November/December for Tech/Fashion)
      let seasonMultiplier = 1;
      const monthNum = month.getMonth();
      if (monthNum === 10 || monthNum === 11) seasonMultiplier = 1.8; // Nov/Dec
      if (monthNum === 6 || monthNum === 7) seasonMultiplier = 1.3; // Summer for Home/Fashion

      const baseSales = Math.random() * 500 + 100;
      const sales = Math.round(baseSales * seasonMultiplier * (category === 'Tech' ? 1.5 : 1));
      const profitMargin = (Math.random() * 0.2) + 0.1; // 10-30% margin
      const profit = Math.round(sales * profitMargin);
      const footfall = Math.floor(Math.random() * 200 * seasonMultiplier);

      data.push({
        id: `TRX-${format(month, 'yyMM')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        date: dateStr,
        region,
        category,
        sales,
        profit,
        footfall,
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      });
    }
  }

  return data;
};

export const MOCK_TRANSACTIONS = generateMockData();
