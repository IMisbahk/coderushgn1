"use client";

export const dynamic = "force-static";

export default function MainNoticesPage() {
  const notices = [
    { id: 1, title: "Exam Schedule Released", body: "Midterms start Sep 12. Check PDF on portal.", date: "Aug 21, 2025", tag: "Academics" },
    { id: 2, title: "Annual Sports Day", body: "Opening ceremony 9:30 AM @ Main Field.", date: "Aug 23, 2025", tag: "Events" },
    { id: 3, title: "Library Timing Update", body: "Open till 7 PM during exam weeks.", date: "Aug 25, 2025", tag: "Facilities" },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black text-white">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Notices — Main</h1>
        <p className="text-white/60 mt-1">School-wide announcements</p>
      </header>

      <section className="space-y-4">
        {notices.map((n) => (
          <article
            key={n.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.08] transition-colors"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{n.title}</h2>
              <div className="flex items-center gap-2 shrink-0">
                <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{n.tag}</span>
                <time className="text-xs text-white/60">{n.date}</time>
              </div>
            </div>
            <p className="text-white/80 mt-2">{n.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}