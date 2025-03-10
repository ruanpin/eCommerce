import { Outlet } from 'react-router-dom';
import Header from '@/components/Header'

export default function FrontLayout() {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="bg-gray-800 text-white text-center">Footer</footer>
      </div>
    );
  }