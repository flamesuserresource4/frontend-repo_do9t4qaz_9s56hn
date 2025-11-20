import { Search } from 'lucide-react'

export default function Header() {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img src="/flame-icon.svg" className="w-8 h-8" />
        <h1 className="text-white font-semibold">Catalog Dashboard</h1>
      </div>
      <div className="relative">
        <input className="bg-white/5 text-blue-100 placeholder-blue-300/50 rounded-lg pl-10 pr-4 py-2 text-sm outline-none border border-white/10 focus:border-blue-500/50" placeholder="Search..." />
        <Search className="w-4 h-4 text-blue-300/60 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}
