import Link from "next/link";

export default function AdminMenu() {
  return (
    <main className="min-h-screen bg-[#eee8dc] px-5 py-10 md:pl-72">
      <Link href="/admin/dashboard" className="text-xs uppercase tracking-[.18em]">← Dashboard</Link>
      <div className="mt-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="text-xs uppercase tracking-[.25em] text-[#b9572b]">Content</p><h1 className="serif mt-2 text-5xl">Menu</h1></div>
        <Link href="/admin/menu/new" className="bg-[#171513] px-5 py-3 text-xs uppercase tracking-[.16em] text-white">Add menu item</Link>
      </div>
      <div className="mt-10 border border-black/10 bg-white/50 p-7">
        <h2 className="serif text-2xl">Database connection pending</h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-black/55">This management surface is ready for live CRUD once the dedicated Supabase project is available. No fake menu records are displayed.</p>
      </div>
    </main>
  );
}
