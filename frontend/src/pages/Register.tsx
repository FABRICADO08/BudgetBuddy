import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', formData);
            login(response.data.accessToken);
            navigate('/dashboard');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text" placeholder="First Name"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                    />
                    <input
                        type="text" placeholder="Last Name"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                    />
                    <input
                        type="email" placeholder="Email"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input
                        type="password" placeholder="Password"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;