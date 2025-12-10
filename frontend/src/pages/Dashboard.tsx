import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';

interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
}

const Dashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [form, setForm] = useState({ description: '', amount: '', date: '' });

    // Fetch Protected Data
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await api.get('/transactions');
            setTransactions(res.data);
        } catch (err) {
            console.error("Failed to fetch transactions");
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/transactions', {
                ...form,
                amount: parseFloat(form.amount)
            });
            setForm({ description: '', amount: '', date: '' });
            fetchTransactions(); // Refresh list
        } catch (err) {
            alert('Failed to add transaction');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8 text-slate-800">My Dashboard</h1>

                {/* Add Transaction Form */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>
                    <form onSubmit={handleAdd} className="flex gap-4">
                        <label htmlFor="description" className="sr-only">Description</label>
                        <input
                            id="description" placeholder="Description" className="border p-2 rounded flex-1"
                            value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                        />
                        <label htmlFor="amount" className="sr-only">Amount</label>
                        <input
                            id="amount" type="number" placeholder="Amount" className="border p-2 rounded w-32"
                            value={form.amount} onChange={e => setForm({...form, amount: e.target.value})}
                        />
                        <label htmlFor="date" className="sr-only">Date</label>
                        <input
                            id="date" type="date" className="border p-2 rounded"
                            value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                        />
                        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add</button>
                    </form>
                </div>

                {/* Transaction List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100 text-left">
                            <tr>
                                <th className="p-4">Description</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id} className="border-t hover:bg-slate-50">
                                    <td className="p-4">{t.description}</td>
                                    <td className="p-4 text-slate-500">{t.date}</td>
                                    <td className={`p-4 text-right font-bold ${t.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        ${t.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;