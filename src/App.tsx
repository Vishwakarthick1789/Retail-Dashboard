import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { KPIGrid } from './components/KPIGrid';
import { SeasonalTrendChart } from './components/charts/SeasonalTrendChart';
import { RegionalPerformanceChart } from './components/charts/RegionalPerformanceChart';
import { CategoryBreakdownChart } from './components/charts/CategoryBreakdownChart';
import { TransactionTable } from './components/TransactionTable';
import { ThemeProvider } from './components/ThemeContext';
import { MOCK_TRANSACTIONS, Region, Category } from './data/mockData';
import { subYears, addDays, parseISO } from 'date-fns';

function Dashboard() {
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(['North', 'South', 'East', 'West']);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(['Tech', 'Home', 'Fashion']);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');

  // Multi-filter logic
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(t => {
      if (selectedRegions.length > 0 && !selectedRegions.includes(t.region)) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(t.category)) return false;
      if (startDate && t.date < startDate) return false;
      if (endDate && t.date > endDate) return false;
      return true;
    });
  }, [selectedRegions, selectedCategories, startDate, endDate]);

  // Previous year transactions for YoY comparison
  const previousTransactions = useMemo(() => {
    const sDate = startDate ? parseISO(startDate) : new Date();
    const eDate = endDate ? parseISO(endDate) : new Date();
    
    // Shift interval by exactly one year back
    const shiftedStartDate = subYears(sDate, 1).toISOString().split('T')[0];
    const shiftedEndDate = subYears(addDays(eDate, 1), 1).toISOString().split('T')[0]; // +1 day to prevent end of day mismatches usually, but raw string is enough

    return MOCK_TRANSACTIONS.filter(t => {
      if (selectedRegions.length > 0 && !selectedRegions.includes(t.region)) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(t.category)) return false;
      if (t.date < shiftedStartDate) return false;
      if (t.date > shiftedEndDate) return false;
      return true;
    });
  }, [selectedRegions, selectedCategories, startDate, endDate]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <FilterBar 
          selectedRegions={selectedRegions}
          setSelectedRegions={setSelectedRegions}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedRegions.join()}-${selectedCategories.join()}-${startDate}-${endDate}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <KPIGrid transactions={filteredTransactions} previousTransactions={previousTransactions} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <SeasonalTrendChart transactions={filteredTransactions} previousTransactions={previousTransactions} />
              </div>
              <div className="lg:col-span-1">
                <CategoryBreakdownChart transactions={filteredTransactions} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-1">
                <RegionalPerformanceChart transactions={filteredTransactions} />
              </div>
              <div className="lg:col-span-2">
                <TransactionTable transactions={filteredTransactions} />
              </div>
            </div>
            
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
