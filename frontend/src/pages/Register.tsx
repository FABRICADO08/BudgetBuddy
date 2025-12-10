import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Wallet, ArrowRight } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Registration failed. Email might already be in use.');

      const data = await response.json();
      login(data.accessToken);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGmailRegister = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition z-10"
      >
        ← Back
      </button>

      {/* Card */}
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-5">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Wallet className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">BudgetBuddy</h1>
          </div>
          <p className="text-gray-600 text-sm">Create your account and start managing your finances</p>
        </div>

        {/* Gmail Register */}
        <button
          onClick={handleGmailRegister}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-900 font-semibold py-3 px-4 rounded-xl transition mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M23.745 12.27c0-.79-.053-1.438-.174-2.085H12v3.972h6.523c-.231 1.5-.9 2.871-1.995 3.957v3.015h3.21c1.895-1.736 2.954-4.318 2.954-7.859z"
            />
            <path
              fill="#34A853"
              d="M12 24c2.405 0 4.418-.888 5.891-2.666l-3.21-3.015c-.887.591-2.013.959-2.681.959-2.265 0-4.144-1.543-4.845-3.622H3.62v3.102C5.92 23.116 8.747 24 12 24z"
            />
            <path
              fill="#4285F4"
              d="M7.154 14.656c-.177-.591-.279-1.203-.279-1.856s.102-1.065.279-1.656H3.62V7.042C2.724 8.657 2 10.516 2 12c0 1.484.724 3.343 1.62 4.958l3.534-2.302z"
            />
            <path
              fill="#FBBC04"
              d="M12 5.38c1.662 0 3.143.575 4.322 1.707l3.24-3.24C16.416 1.62 14.415 0 12 0 8.747 0 5.92.884 3.62 2.898l3.534 2.302c.701-2.079 2.58-3.822 4.846-3.822z"
            />
          </svg>
          Sign up with Gmail
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Or with email</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Email Register Form */}
        <form onSubmit={handleEmailRegister} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  placeholder="John"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  placeholder="Doe"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-lg hover:shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
          >
            <ArrowRight className="w-5 h-5" />
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-purple-600 font-semibold hover:text-purple-700 transition"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}