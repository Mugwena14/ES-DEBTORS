import React from 'react';
import { Search, Filter } from 'lucide-react';

const FilterBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-gray-100 shadow-sm">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by ID or Client Name..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 text-sm outline-none focus:border-[#00B4D8] transition-colors font-bold uppercase tracking-tight"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div className="relative min-w-[200px]">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <select
          className="w-full pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 text-sm outline-none focus:border-[#00B4D8] appearance-none font-bold uppercase tracking-tight"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending Only</option>
          <option value="Received">Received Only</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;