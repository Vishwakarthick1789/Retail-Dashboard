import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Region, Category } from '../data/mockData';

interface FilterBarProps {
  selectedRegions: Region[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<Region[]>>;
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  startDate: string;
  setStartDate: (d: string) => void;
  endDate: string;
  setEndDate: (d: string) => void;
}

const REGIONS: Region[] = ["North", "South", "East", "West"];
const CATEGORIES: Category[] = ["Tech", "Home", "Fashion"];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedRegions, setSelectedRegions,
  selectedCategories, setSelectedCategories,
  startDate, setStartDate,
  endDate, setEndDate
}) => {
  
  const handleRegionToggle = (region: Region) => {
    setSelectedRegions((prev: Region[]) => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories((prev: Category[]) => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border shadow-sm mb-6 flex flex-col xl:flex-row gap-6">
      
      {/* Date Range Picker */}
      <div className="flex-1">
        <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          <Calendar className="w-4 h-4" /> Date Range
        </label>
        <div className="flex items-center gap-2">
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 bg-background-light dark:bg-slate-800 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-brand-500 outline-none"
          />
          <span className="text-muted-foreground">to</span>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 bg-background-light dark:bg-slate-800 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex-1">
        <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          <MapPin className="w-4 h-4" /> Region
        </label>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map(region => (
            <button
              key={region}
              onClick={() => handleRegionToggle(region)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                selectedRegions.includes(region)
                  ? 'bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/30 dark:border-brand-500 dark:text-brand-300'
                  : 'bg-background-light dark:bg-slate-800 border-border text-muted-foreground hover:border-muted-foreground'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex-1">
        <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          <Tag className="w-4 h-4" /> Category
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/30 dark:border-brand-500 dark:text-brand-300'
                  : 'bg-background-light dark:bg-slate-800 border-border text-muted-foreground hover:border-muted-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
