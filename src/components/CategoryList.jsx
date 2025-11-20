import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'

export default function CategoryList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/categories`)
      const data = await res.json()
      setCategories(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-blue-100 font-semibold">Categories</h2>
        <button onClick={load} className="text-xs px-3 py-1 rounded bg-white/10 text-blue-200 hover:bg-white/20">Refresh</button>
      </div>
      {loading && <div className="text-blue-300">Loading...</div>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(c => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
            <div className="text-white font-medium">{c.name}</div>
            {c.description && <div className="text-blue-300/70 text-sm mt-1">{c.description}</div>}
          </div>
        ))}
        {(!loading && categories.length === 0) && (
          <div className="text-blue-300/70">No categories yet. Add one from the sidebar.</div>
        )}
      </div>
    </div>
  )
}
