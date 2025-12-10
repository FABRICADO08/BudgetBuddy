import { useAuth } from "../context/AuthContext";
import { LogOut, Wallet, Bell, Settings } from 'lucide-react';

const Navbar = () => {
    const { logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 h-16 flex justify-between items-center max-w-7xl">
                <div className="flex items-center gap-2">
                    <div className="bg-amber-400 p-1.5 rounded-lg">
                        <Wallet className="text-slate-900 w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl text-white tracking-wide">
                        Budget<span className="text-amber-400">Buddy</span>
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    <button title="Notifications" className="text-slate-400 hover:text-white transition"><Bell size={20} /></button>
                    <button title="Settings" className="text-slate-400 hover:text-white transition"><Settings size={20} /></button>
                    <div className="h-6 w-px bg-white/10 mx-1"></div>
                    <button 
                        onClick={logout}
                        className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition text-sm font-medium"
                    >
                        <LogOut size={18} /> 
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;