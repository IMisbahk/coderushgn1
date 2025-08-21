import Link from "next/link";

const channels = [
  { name: "counselling", path: "/counselling" },
  { name: "lost-found", path: "/lost-found" },
  { name: "menu", path: "/menu" },
  { name: "messages", path: "/messages" },
  { name: "notices", path: "/notices" },
  { name: "schedule-map", path: "/schedule-map" },
  { name: "societies", path: "/societies" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Campus Portal</h1>
      <div className="flex flex-col space-y-3">
        {channels.map((c) => (
          <Link
            key={c.name}
            href={c.path}
            className="hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            #{c.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
