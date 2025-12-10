import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Search, Filter } from 'lucide-react';

interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
}

const Dashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [form, setForm] = useState({ description: '', amount: '', date: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await api.get('/transactions');
            setTransactions(res.data.sort((a: any, b: any) => b.id - a.id));
        } catch (err) { console.error("Error fetching data"); }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!form.amount) return;
        setLoading(true);
        try {
            await api.post('/transactions', { ...form, amount: parseFloat(form.amount) });
            setForm({ description: '', amount: '', date: '' });
            fetchTransactions();
        } catch (err) { alert('Error'); } finally { setLoading(false); }
    };

    const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="min-h-screen">
            <Navbar />
            
            <main className="container mx-auto px-6 py-8 max-w-7xl">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Overview</h1>
                        <p className="text-slate-400">Welcome back! Here is your financial summary.</p>
                    </div>
                    <div className="flex gap-3">
                         <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2 text-slate-300 text-sm">
                            <Calendar size={16} />
                            <span>{new Date().toLocaleDateString()}</span>
                         </div>
                    </div>
                </div>

                {/* STATS CARDS (The blue boxes in your image) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Balance Card */}
                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-amber-500/20"></div>
                        <div className="relative z-10">
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Balance</p>
                            <h2 className="text-4xl font-bold text-white mb-1">${totalBalance.toFixed(2)}</h2>
                            <span className="text-amber-400 text-xs font-semibold">+2.5% from last month</span>
                        </div>
                    </div>

                    {/* Income Card */}
                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                <TrendingUp size={24} />
                            </div>
                            <span className="text-slate-400 font-medium">Total Income</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">${income.toFixed(2)}</h2>
                    </div>

                    {/* Expenses Card */}
                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
                                <TrendingDown size={24} />
                            </div>
                            <span className="text-slate-400 font-medium">Total Expenses</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">${Math.abs(expenses).toFixed(2)}</h2>
                    </div>
                </div>

                {/* CONTENT SPLIT: Add Form & List */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* LEFT: Add Transaction Form (Styled like a panel) */}
                    <div className="glass-card p-6 rounded-2xl h-fit">
                        <h3 className="text-lg font-bold text-white mb-6">New Transaction</h3>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="text-xs text-slate-400 uppercase mb-1 block">Description</label>
                                <input 
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-400 outline-none"
                                    placeholder="e.g. Salary, Rent"
                                    value={form.description} 
                                    onChange={e => setForm({...form, description: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-slate-400 uppercase mb-1 block">Amount</label>
                                    <input 
                                        type="number"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-400 outline-none"
                                        placeholder="0.00"
                                        value={form.amount} 
                                        onChange={e => setForm({...form, amount: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 uppercase mb-1 block">Date</label>
                                    <input 
                                        type="date"
                                        id="date"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-300 focus:border-amber-400 outline-none"
                                        placeholder="Select a date"
                                        value={form.date} 
                                        onChange={e => setForm({...form, date: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button disabled={loading} className="w-full btn-gold py-3 rounded-lg mt-2">
                                {loading ? 'Saving...' : 'Add Record'}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: Transaction List (Styled like the 'Students' list) */}
                    <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                            <div className="flex gap-2">
                                <button title="Search transactions" className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><Search size={18}/></button>
                                <button title="Filter transactions" className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><Filter size={18}/></button>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase font-medium">
                                    <tr>
                                        <th className="p-5">Transaction Details</th>
                                        <th className="p-5">Date</th>
                                        <th className="p-5 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {transactions.map(t => (
                                        <tr key={t.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.amount > 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                                        <DollarSign size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{t.description}</p>
                                                        <p className="text-xs text-slate-500">Wallet A</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5 text-slate-400 text-sm">{t.date || 'Today'}</td>
                                            <td className="p-5 text-right">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.amount > 0 ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-slate-300'}`}>
                                                    {t.amount > 0 ? '+' : ''} ${t.amount.toFixed(2)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;