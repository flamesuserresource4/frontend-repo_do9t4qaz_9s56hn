import { useEffect, useMemo, useState } from 'react'
import { PlusCircle, Search, Boxes } from 'lucide-react'

export default function MainPanel({ mode, categories, selectedCategoryId, onAddItem, items }) {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  const selectedCategory = useMemo(() => categories.find(c => c.id === selectedCategoryId), [categories, selectedCategoryId])

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = items
    if (selectedCategoryId) {
      arr = arr.filter(it => it.category_id === selectedCategoryId)
    }
    if (!q) return arr
    return arr.filter(it => it.name.toLowerCase().includes(q) || (it.note || '').toLowerCase().includes(q))
  }, [items, query, selectedCategoryId])

  const submit = async (e) => {
    e.preventDefault()
    if (!selectedCategoryId) {
      setError('Select a category first')
      return
    }
    if (!name.trim()) return

    try {
      setLoading(true)
      setError('')
      await onAddItem({ name: name.trim(), note: note.trim() || undefined, category_id: selectedCategoryId })
      setName('')
      setNote('')
    } catch (err) {
      setError(err.message || 'Failed to add item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 h-full flex flex-col text-white">
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            placeholder="Search items"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-blue-500/60"
          />
        </div>
        {selectedCategory && (
          <div className="px-3 py-1 rounded-full text-xs border border-blue-500/30 bg-blue-500/10">
            Viewing: {selectedCategory.name}
          </div>
        )}
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center text-blue-200/70">
            <Boxes className="w-7 h-7 mx-auto mb-2" />
            <p>No items yet. {selectedCategory ? 'Add one below.' : 'Select a category to view/add items.'}</p>
          </div>
        )}
        {filteredItems.map((it) => (
          <div key={it.id} className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
            <p className="font-medium">{it.name}</p>
            {it.note && <p className="text-sm text-blue-300/80 mt-1">{it.note}</p>}
            {mode === 'admin' && (
              <p className="text-[11px] text-blue-300/60 mt-3">Category ID: {it.category_id}</p>
            )}
          </div>
        ))}
      </div>

      {mode === 'admin' && (
        <div className="p-4 border-t border-white/10 bg-slate-900/50">
          <form onSubmit={submit} className="max-w-xl grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="md:col-span-1">
              <label className="text-xs text-blue-300/70">Item name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500/60"
                placeholder="e.g. iPhone 15"
              />
            </div>
            <div className="md:col-span-1">
              <label className="text-xs text-blue-300/70">Note</label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500/60"
                placeholder="Optional"
              />
            </div>
            <div className="md:col-span-1 flex gap-2">
              <button disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-600/90 disabled:opacity-60 inline-flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                {loading ? 'Adding...' : 'Add Item'}
              </button>
            </div>
            {error && <p className="text-xs text-red-400 md:col-span-3">{error}</p>}
          </form>
        </div>
      )}
    </div>
  )
}
