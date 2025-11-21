'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../components/Card';
import Button from '../components/Button';
import { API_ENDPOINTS } from '../../lib/config';

export default function Signup(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const router = useRouter();

  async function submit(e){
    e.preventDefault();
    setErr(null);
    try{
      const res = await fetch(API_ENDPOINTS.SIGNUP, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Signup failed');
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch(e){
      setErr(e.message);
    }
  }

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md">
        <h2 className="text-lg font-semibold">Signup</h2>
        <form onSubmit={submit} className="mt-4 w-full grid gap-3">
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder='Name'
            required
          />
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
            <Button type='submit' className="flex-1">Signup</Button>
          </div>
          {err && <p className="text-red-600 text-sm">{err}</p>}
        </form>
      </Card>
    </div>
  )
}
