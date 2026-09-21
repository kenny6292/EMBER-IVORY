import Link from "next/link";
export default function NewMenuItem(){
  return <main className="min-h-screen bg-[#eee8dc] px-5 py-10 md:pl-72">
    <Link href="/admin/menu" className="text-xs uppercase tracking-[.18em]">← Menu</Link>
    <h1 className="serif mt-10 text-5xl">New menu item</h1>
    <form className="mt-10 grid max-w-2xl gap-5">
      <input required placeholder="Dish name" className="border border-black/10 bg-white/60 px-4 py-4 outline-none"/>
      <textarea required placeholder="Description" rows={5} className="border border-black/10 bg-white/60 px-4 py-4 outline-none"/>
      <input required type="number" min="0" step="0.01" placeholder="Price (NGN)" className="border border-black/10 bg-white/60 px-4 py-4 outline-none"/>
      <input type="url" placeholder="Image URL" className="border border-black/10 bg-white/60 px-4 py-4 outline-none"/>
      <button type="submit" className="bg-[#171513] px-5 py-4 text-xs uppercase tracking-[.16em] text-white">Save menu item</button>
    </form>
    <p className="mt-5 text-sm text-black/45">Saving is disabled until the live database is configured.</p>
  </main>
}
