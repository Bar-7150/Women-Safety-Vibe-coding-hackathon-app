import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Footer } from './Footer';

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
