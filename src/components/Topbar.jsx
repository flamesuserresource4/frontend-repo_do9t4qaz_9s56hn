import { useState } from 'react'
import { User, Shield } from 'lucide-react'

export default function Topbar({ mode, onChangeMode }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="h-16 border-b border-white/10 bg-slate-900/70 backdrop-blur flex items-center justify-between px-4 text-white">
      <div className="font-semibold tracking-wide">Catalog Manager</div>
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-white/10"
        >
          {mode === 'admin' ? <Shield className="w-4 h-4 text-amber-300" /> : <User className="w-4 h-4 text-blue-300" />} 
          <span className="text-sm capitalize">{mode}</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-slate-900/95 border border-white/10 rounded-lg shadow-lg overflow-hidden">
            <button onClick={() => { onChangeMode('user'); setOpen(false) }} className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-800 ${mode === 'user' ? 'text-blue-300' : ''}`}>User Panel</button>
            <button onClick={() => { onChangeMode('admin'); setOpen(false) }} className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-800 ${mode === 'admin' ? 'text-amber-300' : ''}`}>Admin Panel</button>
          </div>
        )}
      </div>
    </header>
  )
}
