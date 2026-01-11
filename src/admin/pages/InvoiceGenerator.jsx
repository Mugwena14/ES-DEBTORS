import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, FileText, Plus, Trash2, ReceiptText } from 'lucide-react';
import InvoiceTemplate from '../components/InvoiceTemplate';

const InvoiceGenerator = () => {
  const [data, setData] = useState({
    clientName: '',
    clientEmail: '',
    caseRef: '',
    items: [{ description: '', amount: '' }],
    total: 0
  });

  const calculateTotal = (items) => items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const addItem = () => setData({ ...data, items: [...data.items, { description: '', amount: '' }] });
  
  const removeItem = (index) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: newItems, total: calculateTotal(newItems) });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData({ ...data, items: newItems, total: calculateTotal(newItems) });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
              <ReceiptText className="text-[#00B4D8]" size={28} /> Invoice Generator
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mt-1">Create professional billing for clients</p>
          </div>
        </header>

        <div className="bg-white shadow-sm border border-gray-100 rounded-sm p-8">
          {/* CLIENT DETAILS */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Client Full Name</label>
              <input 
                placeholder="e.g. John Doe" 
                className="w-full border-b-2 border-gray-100 p-3 text-sm focus:border-[#00B4D8] outline-none transition-colors font-bold"
                onChange={(e) => setData({...data, clientName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Case Reference</label>
              <input 
                placeholder="e.g. MKH-2026-001" 
                className="w-full border-b-2 border-gray-100 p-3 text-sm focus:border-[#00B4D8] outline-none transition-colors font-bold"
                onChange={(e) => setData({...data, caseRef: e.target.value})}
              />
            </div>
          </section>

          {/* BILLING ITEMS */}
          <section className="space-y-4">
             <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Services & Fees</h3>
                <button 
                  onClick={addItem} 
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00B4D8] hover:text-gray-900 transition-colors"
                >
                  <Plus size={14} /> Add Service
                </button>
             </div>
            
            <div className="space-y-4 pt-4">
              {data.items.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 animate-in slide-in-from-top-2 duration-300">
                  <input 
                    placeholder="Service description (e.g. Debt Review Removal)" 
                    className="flex-1 bg-gray-50 p-4 text-sm font-bold rounded-sm outline-none focus:ring-1 focus:ring-[#00B4D8]"
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                  />
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="absolute left-4 top-4 text-gray-400 text-sm font-bold">R</span>
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        className="w-32 bg-gray-50 p-4 pl-8 text-sm font-bold rounded-sm outline-none focus:ring-1 focus:ring-[#00B4D8]"
                        onChange={(e) => updateItem(index, 'amount', e.target.value)}
                      />
                    </div>
                    <button 
                      onClick={() => removeItem(index)} 
                      className="p-4 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TOTAL & DOWNLOAD */}
          <footer className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100 pt-8">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Amount (Incl. VAT)</p>
              <p className="text-4xl font-black text-gray-900">R {data.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
            
            <PDFDownloadLink 
              document={<InvoiceTemplate data={data} />} 
              fileName={`MKH_Invoice_${data.clientName || 'Draft'}.pdf`}
              className="group flex w-full md:w-auto items-center justify-center gap-3 bg-[#111827] px-10 py-5 text-xs font-black uppercase tracking-widest text-white hover:bg-[#00B4D8] transition-all"
            >
              {({ loading }) => (
                <>
                  <Download size={18} className={loading ? "animate-bounce" : ""}/>
                  {loading ? 'Preparing PDF...' : 'Generate Invoice'}
                </>
              )}
            </PDFDownloadLink>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;