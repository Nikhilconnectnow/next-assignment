'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../components/Card';
import Button from '../components/Button';
import { API_ENDPOINTS } from '../../lib/config';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const router = useRouter();

  async function submit(e){
    e.preventDefault();
    setErr(null);
    try{
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch(e){
      setErr(e.message);
    }
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold">Login</h2>
      <form onSubmit={submit} className="mt-4 max-w-md w-full grid gap-3">
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder='Email'
          type='email'
          required
        />
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder='Password'
          type='password'
          required
        />
        <div className="flex items-center gap-3">
          <Button type='submit' className="flex-1">Login</Button>
        </div>
        {err && <p className="text-red-600 text-sm">{err}</p>}
      </form>
    </Card>
  )
}
