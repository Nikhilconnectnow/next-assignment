'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Button from './Button';

export default function Header(){
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      setAuth(!!localStorage.getItem('token'));
    }
  }, [pathname]);

  function logout(){
    if(typeof window !== 'undefined'){
      localStorage.removeItem('token');
      setAuth(false);
      router.push('/login');
    }
  }

  return (
    <header className="site-container flex items-center justify-between mb-6">
      <div className="brand">Next Express</div>
      <nav className="flex items-center gap-3">
        {auth ? (
          <>
            <Link className="text-sm text-red-600 hover:text-red-700 transition-colors" href="/">Home</Link>
            <Link className="text-sm text-red-600 hover:text-red-700 transition-colors" href="/dashboard">Dashboard</Link>
            <Button variant="ghost" onClick={logout} className="ml-2 text-sm text-red-600 border border-red-600 hover:bg-red-50">Logout</Button>
          </>
        ) : (
          <>
            <Link className="text-sm subtle hover:text-primary transition-colors" href="/">Home</Link>
            <Link className="text-sm subtle hover:text-primary transition-colors" href="/signup">Signup</Link>
            <Link className="text-sm subtle hover:text-primary transition-colors" href="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  )
}
