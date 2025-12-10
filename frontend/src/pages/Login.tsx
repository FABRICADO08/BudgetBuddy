import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Wallet } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.accessToken);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glow Effects from image */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md glass-card rounded-3xl p-10 relative z-10">
                
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <Wallet className="text-amber-400" />
                        <span className="text-2xl font-bold tracking-wide">Budget Buddy</span>
                    </div>
                    <p className="text-slate-400 text-sm">Streamline your wealth experience.</p>
                </div>

                {error && <div className="text-red-400 text-sm text-center mb-4 bg-red-500/10 p-2 rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
                            <input
                                type="email"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between ml-1">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
                            <span className="text-xs text-amber-400 cursor-pointer hover:underline">Forgot?</span>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
                            <input
                                type="password"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="w-full btn-gold py-3.5 rounded-xl mt-4">
                        {loading ? 'Processing...' : 'Login'}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 text-sm">
                    No account? <Link to="/register" className="text-amber-400 hover:text-amber-300 font-semibold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;