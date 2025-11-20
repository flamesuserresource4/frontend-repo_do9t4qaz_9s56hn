import { useState } from 'react'
import { Plus, PackageOpen, Layers } from 'lucide-react'

export default function Sidebar({ categories, onAddCategory, onSelectCategory, selectedCategoryId }) {
  const [openForm, setOpenForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    try {
      setLoading(true)
      setError('')
      await onAddCategory({ name: name.trim(), description: description.trim() || undefined })
      setName('')
      setDescription('')
      setOpenForm(false)
    } catch (err) {
      setError(err.message || 'Failed to add category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className="w-80 shrink-0 h-full bg-slate-900/70 backdrop-blur border-r border-white/10 text-white flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-blue-300">
          <Layers className="w-5 h-5" />
          <span className="font-semibold tracking-wide">Categories</span>
        </div>
        <button
          onClick={() => setOpenForm((v) => !v)}
          className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600/90 hover:bg-blue-600 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>

        {openForm && (
          <form onSubmit={submit} className="mt-3 space-y-2">
            <input
              className="w-full bg-slate-800/60 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-blue-500/60"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full bg-slate-800/60 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-blue-500/60"
              placeholder="Short description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <div className="flex gap-2">
              <button disabled={loading} className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-500/90 disabled:opacity-60 text-sm">{loading ? 'Adding...' : 'Add'}</button>
              <button type="button" onClick={() => setOpenForm(false)} className="px-3 py-2 rounded bg-slate-700/70 hover:bg-slate-700 text-sm">Cancel</button>
            </div>
          </form>
        )}
      </div>

      <div className="p-2 overflow-y-auto">
        <ul className="space-y-1">
          {categories.length === 0 && (
            <li className="text-xs text-blue-300/70 px-2 py-3">No categories yet. Add one to get started.</li>
          )}
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800/70 transition ${selectedCategoryId === cat.id ? 'bg-slate-800/90 border border-blue-500/30' : ''}`}
              >
                <PackageOpen className="w-4 h-4 text-blue-300" />
                <div>
                  <p className="text-sm font-medium">{cat.name}</p>
                  {cat.description && <p className="text-xs text-blue-300/70 line-clamp-1">{cat.description}</p>}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
