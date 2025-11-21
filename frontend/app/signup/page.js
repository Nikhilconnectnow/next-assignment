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
    <Card>
      <h2 className="text-lg font-semibold">Signup</h2>
      <form onSubmit={submit} className="mt-4 max-w-md grid gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder='Name' required />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' type='email' required />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' type='password' required />
        <Button type='submit'>Signup</Button>
        {err && <p className="text-red-600">{err}</p>}
      </form>
    </Card>
  )
}
