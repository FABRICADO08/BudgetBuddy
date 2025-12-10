import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, Shield } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="text-white text-2xl font-bold flex items-center gap-2">
          <Wallet className="w-8 h-8" />
          BudgetBuddy
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-between px-8 py-16 max-w-7xl mx-auto w-full">
        {/* Left Side - Text */}
        <div className="flex-1 pr-8">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Take control of your finances
          </h1>
          <p className="text-xl text-white text-opacity-90 mb-8">
            Track spending, manage budgets, and achieve financial goals with intelligent insights and real-time analytics.
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition text-lg"
            >
              Learn More
            </button>
          </div>

          {/* Features */}
          <div className="mt-16 space-y-4">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold text-lg">Smart Analytics</h3>
                <p className="text-white text-opacity-75">Get insights into spending patterns and trends</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold text-lg">Secure & Private</h3>
                <p className="text-white text-opacity-75">Your financial data is encrypted and protected</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Wallet className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold text-lg">Easy Management</h3>
                <p className="text-white text-opacity-75">Simple interface to track all your transactions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full h-96">
            {/* Floating spheres - mimicking the design aesthetic */}
            <div className="absolute top-10 right-20 w-24 h-24 bg-green-400 rounded-full opacity-80 blur-lg"></div>
            <div className="absolute top-32 right-32 w-32 h-32 bg-purple-400 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute bottom-20 left-10 w-28 h-28 bg-blue-400 rounded-full opacity-70 blur-lg"></div>
            <div className="absolute bottom-40 right-10 w-20 h-20 bg-pink-300 rounded-full opacity-75 blur-lg"></div>
            
            {/* Center content card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 w-80 border border-white border-opacity-20">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full mx-auto mb-4"></div>
                <h3 className="text-white text-center font-semibold text-lg">Balance Your Budget</h3>
                <p className="text-white text-opacity-70 text-center text-sm mt-2">
                  Track every transaction and visualize your financial health
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
