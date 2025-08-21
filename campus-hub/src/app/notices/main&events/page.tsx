"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Sidebar } from "@/components/ui/Sidebar"

export default function MainPage() {
  const [message, setMessage] = useState("")

  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar
        channels={[
          { name: "Main", href: "/notices/main" },
          { name: "Events", href: "/notices/events" },
          { name: "Teachers", href: "/notices/teachers" },
          { name: "Schedule-Map", href: "/schedule-map" },
          { name: "Lost & Found", href: "/lost-found" },
          { name: "Counselling", href: "/counselling" },
          { name: "Messages", href: "/messages" },
          { name: "Societies", href: "/societies" },
          { name: "Menu", href: "/menu" },
        ]}
        profile={{
          name: "Misbah",
          role: "Student",
        }}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 bg-neutral-950 text-white">
        {/* Channel header */}
        <div className="flex items-center px-4 py-3 border-b border-neutral-800">
          <h1 className="text-lg font-semibold">#notice</h1>
        </div>

        {/* Empty feed */}
        <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-400">
          <div className="text-4xl mb-3">💬</div>
          <h2 className="text-xl font-medium">Welcome to #notice!</h2>
          <p className="text-sm text-neutral-500 mt-1">
            This is the start of the channel. Share ideas, ask questions, or just say hello!
          </p>
        </div>

        {/* Message input */}
        <div className="p-4 border-t border-neutral-800">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!message.trim()) return
              console.log("Send:", message)
              setMessage("")
            }}
            className="flex items-center gap-2 bg-neutral-900 rounded-md px-3 py-2"
          >
            <Input
              type="text"
              placeholder="Message #notice"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-neutral-500"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="text-neutral-400 hover:text-white"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}