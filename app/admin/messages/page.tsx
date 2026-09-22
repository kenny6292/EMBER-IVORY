import Link from "next/link";

export default function AdminMessages() {
  return (
    <main className="min-h-screen bg-[#eee8dc] px-5 py-10 md:pl-72">
      <Link href="/admin/dashboard" className="text-xs uppercase tracking-[.18em]">
        ← Dashboard
      </Link>
      <p className="mt-10 text-xs uppercase tracking-[.25em] text-[#b9572b]">Inbox</p>
      <h1 className="serif mt-2 text-5xl">Messages</h1>
      <div className="mt-10 border border-black/10 bg-white/50 p-7">
        <h2 className="serif text-2xl">Contact inbox ready</h2>
        <p className="mt-3 text-sm leading-7 text-black/55">
          Contact submissions will be stored and reviewed here after the production database is connected.
        </p>
      </div>
    </main>
  );
}
