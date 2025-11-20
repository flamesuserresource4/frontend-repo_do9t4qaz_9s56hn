import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import MainPanel from './components/MainPanel'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [mode, setMode] = useState('user') // 'user' | 'admin'
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchCategories = async () => {
    const res = await fetch(`${API_BASE}/api/categories`)
    const data = await res.json()
    setCategories(data)
    if (!selectedCategoryId && data.length > 0) {
      setSelectedCategoryId(data[0].id)
    }
  }

  const fetchItems = async (categoryId = null) => {
    const url = categoryId ? `${API_BASE}/api/items?category_id=${categoryId}` : `${API_BASE}/api/items`
    const res = await fetch(url)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        await fetchCategories()
        await fetchItems(selectedCategoryId)
      } catch (e) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    fetchItems(selectedCategoryId)
  }, [selectedCategoryId])

  const addCategory = async (payload) => {
    const res = await fetch(`${API_BASE}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Server error')
    await fetchCategories()
  }

  const addItem = async (payload) => {
    const res = await fetch(`${API_BASE}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Server error')
    await fetchItems(selectedCategoryId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="h-screen flex flex-col">
        <Topbar mode={mode} onChangeMode={setMode} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            categories={categories}
            onAddCategory={addCategory}
            onSelectCategory={setSelectedCategoryId}
            selectedCategoryId={selectedCategoryId}
          />
          <MainPanel
            mode={mode}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onAddItem={addItem}
            items={items}
          />
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 grid place-items-center bg-black/40 text-white">Loading...</div>
      )}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-3 py-2 rounded">{error}</div>
      )}
    </div>
  )
}
