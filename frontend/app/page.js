'use client';
import Link from 'next/link';
import Button from './components/Button';

export default function Home(){
  return (
    <div className="grid gap-6">
      <section className="card">
        <h2 className="text-xl font-semibold">Welcome</h2>
        <p className="subtle">A colorful interface with subtle motion and gradients.</p>
        <div className="mt-4 flex gap-3">
          <Button href="/signup">Get Started</Button>
          <Button href="/login" variant="outline">Login</Button>
        </div>
      </section>

      <section className="card">
        <h3 className="font-medium">Quick Links</h3>
        <ul className="mt-2 list-disc pl-5 subtle">
          <li><Link href="/signup" className="hover:underline">Signup</Link></li>
          <li><Link href="/login" className="hover:underline">Login</Link></li>
          <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
        </ul>
      </section>
    </div>
  )
}
