import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, Wallet, ArrowRight } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Send the 4 fields required by the Java Backend
            const response = await api.post('/auth/register', formData);
            
            // Login immediately with the new token
            login(response.data.accessToken);
            navigate('/dashboard');
        } catch (err: any) {
            console.error(err);
            // Show a specific error if the backend provides one, otherwise generic
            setError('Registration failed. Email might be already taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#0f172a]"></div>
            <div className="absolute top-10 right-10 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md glass-card rounded-3xl p-8 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-2 bg-slate-800/50 p-3 rounded-full border border-white/5">
                        <Wallet className="text-amber-400 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mt-4">Welcome to Budget Buddy</h2>
                    <p className="text-slate-400 text-sm">Create your secure financial vault.</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name Fields (Side by Side) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400 uppercase ml-1">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input
                                    name="firstname"
                                    type="text"
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-white focus:border-amber-400 outline-none transition-all text-sm"
                                    placeholder="John"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400 uppercase ml-1">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input
                                    name="lastname"
                                    type="text"
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-white focus:border-amber-400 outline-none transition-all text-sm"
                                    placeholder="Doe"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-400 uppercase ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3 w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-amber-400 outline-none transition-all"
                                placeholder="name@example.com"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-400 uppercase ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3 w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-amber-400 outline-none transition-all"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button disabled={loading} className="w-full btn-gold py-3 rounded-xl mt-6 flex items-center justify-center gap-2">
                        {loading ? 'Creating Account...' : (
                            <>
                                Create Account <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 text-sm">
                    Already have an account? <Link to="/login" className="text-amber-400 hover:text-amber-300 font-semibold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;