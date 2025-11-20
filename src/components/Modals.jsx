import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'

export function AddCategoryModal({ open, onClose, onCreated }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await fetch(`${API}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: description || undefined })
      })
      onCreated?.()
      setName(''); setDescription(''); onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form onSubmit={submit} className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold text-lg">Add Category</h3>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-blue-100 outline-none" required />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description (optional)" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-blue-100 outline-none" rows={3} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 text-blue-200">Cancel</button>
          <button disabled={saving} className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50">{saving?'Saving...':'Save'}</button>
        </div>
      </form>
    </div>
  )
}

export function AddItemModal({ open, onClose, onCreated, categories }) {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [category, setCategory] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await fetch(`${API}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, details: details || undefined, category })
      })
      onCreated?.(); setName(''); setDetails(''); setCategory(''); onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form onSubmit={submit} className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold text-lg">Add Item</h3>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-blue-100 outline-none" required />
        <select value={category} onChange={e=>setCategory(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-blue-100 outline-none">
          <option value="" disabled>Select category</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <textarea value={details} onChange={e=>setDetails(e.target.value)} placeholder="Details (optional)" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-blue-100 outline-none" rows={3} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 text-blue-200">Cancel</button>
          <button disabled={saving} className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:opacity-50">{saving?'Saving...':'Save'}</button>
        </div>
      </form>
    </div>
  )
}
