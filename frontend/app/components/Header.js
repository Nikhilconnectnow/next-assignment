'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function Header(){
  const router = useRouter();
  function logout(){
    if(typeof window !== 'undefined'){
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
  return (
    <header className="site-container flex items-center justify-between mb-6">
      <div className="brand">Next Express</div>
      <nav className="flex items-center gap-3">
        <Link className="text-sm subtle hover:text-primary transition-colors" href="/">Home</Link>
        <Link className="text-sm subtle hover:text-primary transition-colors" href="/signup">Signup</Link>
        <Link className="text-sm subtle hover:text-primary transition-colors" href="/login">Login</Link>
        <Link className="text-sm subtle hover:text-primary transition-colors" href="/dashboard">Dashboard</Link>
        <Button variant="outline" onClick={logout} className="ml-2 text-sm">Logout</Button>
      </nav>
    </header>
  )
}
