import React from 'react';
import { Search, UserPlus } from 'lucide-react';

const SearchHeader = ({ searchTerm, setSearchTerm, onAddClick }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 shadow-sm border-b-4 border-[#00B4D8]">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text"
          placeholder="Search by ID or Name..."
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#00B4D8] font-medium text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button 
        onClick={onAddClick}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#111827] text-[#00B4D8] px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#00B4D8] hover:text-white transition-all"
      >
        <UserPlus size={16} /> Add Client
      </button>
    </div>
  );
};

export default SearchHeader;