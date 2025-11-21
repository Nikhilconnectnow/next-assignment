 'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Dashboard(){
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [busyId, setBusyId] = useState(null);
  const router = useRouter();

  useEffect(()=> {
    const token = localStorage.getItem('token');
    if(!token) { router.push('/login'); return; }
    fetchProfile(token);
    fetchItems(token);
  }, []);

  async function fetchProfile(token){
    const res = await fetch('http://localhost:4000/api/profile', {
      headers: { Authorization: 'Bearer ' + token }
    });
    if(res.ok){
      const data = await res.json();
      setUser(data.user);
    } else {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }

  async function fetchItems(token){
    const res = await fetch('http://localhost:4000/api/items?q=' + encodeURIComponent(q), {
      headers: { Authorization: 'Bearer ' + token }
    });
    if(res.ok){
      const data = await res.json();
      setItems(data.items);
    }
  }

  async function createItem(e){
    e.preventDefault();
    const token = localStorage.getItem('token');
    if(!title) return;
    const res = await fetch('http://localhost:4000/api/items', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ title })
    });
    if(res.ok){
      setTitle('');
      fetchItems(token);
    }
  }

  function startEdit(it){
    setEditingId(it._id);
    setEditTitle(it.title || '');
  }

  function cancelEdit(){
    setEditingId(null);
    setEditTitle('');
  }

  async function saveEdit(id){
    if(!editTitle) return;
    const token = localStorage.getItem('token');
    setBusyId(id);
    try{
      const res = await fetch('http://localhost:4000/api/items/' + id, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ title: editTitle })
      });
      if(res.ok){
        const data = await res.json();
        setItems(prev => prev.map(it => it._id === id ? data.item : it));
        cancelEdit();
      } else {
        console.error('Update failed');
      }
    } finally{
      setBusyId(null);
    }
  }

  async function deleteItem(id){
    if(!confirm('Delete this item?')) return;
    const token = localStorage.getItem('token');
    setBusyId(id);
    try{
      const res = await fetch('http://localhost:4000/api/items/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token }
      });
      if(res.ok){
        setItems(prev => prev.filter(it => it._id !== id));
      } else {
        console.error('Delete failed');
      }
    } finally{
      setBusyId(null);
    }
  }

  function logout(){
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          {user ? <div className="subtle">Hi, {user.name}</div> : <div className="subtle">Loading profile...</div>}
        </div>

        <form onSubmit={createItem} className="mt-4 flex gap-3">
          <input className="flex-1" value={title} onChange={e=>setTitle(e.target.value)} placeholder='New item title' />
          <Button type="submit">Create</Button>
        </form>

        <div className="mt-4 flex gap-3">
          <input className="flex-1" value={q} onChange={e=>setQ(e.target.value)} placeholder='Search...' />
          <button onClick={()=>{ const token = localStorage.getItem('token'); fetchItems(token); }} className="border px-3 py-2 rounded-md">Search</button>
        </div>
      </Card>

      <Card>
        <h3 className="font-medium">Items</h3>
        <ul className="mt-3 space-y-2 list-none p-0">
          {items.map(it => (
            <li key={it._id} className="py-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {editingId === it._id ? (
                    <input className="px-2 py-1 border rounded-md" value={editTitle} onChange={e=>setEditTitle(e.target.value)} />
                  ) : (
                    <div className="font-medium">{it.title}</div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {editingId === it._id ? (
                    <>
                      <button disabled={busyId===it._id} onClick={()=>saveEdit(it._id)} className="border px-3 py-1 rounded-md">{busyId===it._id ? 'Saving...' : 'Save'}</button>
                      <button onClick={cancelEdit} className="border px-3 py-1 rounded-md">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={()=>startEdit(it)} className="border px-3 py-1 rounded-md">Edit</button>
                      <button disabled={busyId===it._id} onClick={()=>deleteItem(it._id)} className="text-sm border px-3 py-1 rounded-md text-red-600">{busyId===it._id ? 'Deleting...' : 'Delete'}</button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
