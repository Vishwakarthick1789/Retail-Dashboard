import { Moon, Sun, Download, TrendingUp } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const handleExport = () => {
    // Simulating CSV Export
    const csvContent = "data:text/csv;charset=utf-8,ID,Date,Region,Category,Sales,Profit,Footfall,Status\nTrx1,2026-04-10,North,Tech,150,30,10,Completed";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "retail_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-6 bg-surface-light dark:bg-surface-dark border-b border-border shadow-sm">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <div className="p-2 bg-brand-500 rounded-lg shadow-md">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Retail Growth Intelligence</h1>
          <p className="text-sm text-muted-foreground hidden md:block">Real-time store performance & seasonal analysis</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-background-light dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-border"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>
        
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>
    </header>
  );
};
