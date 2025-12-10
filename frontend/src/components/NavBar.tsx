import { useAuth } from "../context/AuthContext";
import { LogOut, Wallet } from 'lucide-react';

const Navbar = () => {
    const { logout } = useAuth();

    return (
        <nav className="bg-slate-900 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-xl text-green-400">
                    <Wallet /> Budget Buddy
                </div>
                <button 
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition"
                >
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;